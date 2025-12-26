<?php
/**
 * Audit functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_enqueue_scripts',
	function () {
		if ( 'page-audit.php' !== basename( get_page_template() ) ) {
			return;
		}

		if ( file_exists( get_template_directory() . '/audit-quiz/app.js' ) ) {
			wp_enqueue_script(
				'mappers-vue-spa',
				get_template_directory_uri() . '/audit-quiz/app.js',
				array(),
				filemtime( get_template_directory() . '/audit-quiz/app.js' ),
				true
			);
		}

		if ( file_exists( get_template_directory() . '/audit-quiz/app.css' ) ) {
			wp_enqueue_style(
				'mappers-vue-spa',
				get_template_directory_uri() . '/audit-quiz/app.css',
				array(),
				filemtime( get_template_directory() . '/audit-quiz/app.css' ),
			);
		}
	}
);

/**
 * Get max possible score for question.
 *
 * @param array $question Question data.
 *
 * @return int
 */
function mappers_get_max_question_score( $question ) {
	$max_score = 0;

	if ( 'custom' === $question['input_type'] ) {
		if ( 'catalogs_count' === $question['name'] ) {
			foreach ( $question['answers'] as $answer ) {
				if ( 'yes' === $answer['val'] ) {
					if ( ! empty( $answer['sub_questions'] ) ) {
						$max_score = $answer['sub_questions'][0]['val'] ?? 0;
					}
				}
			}
		}
	}

	if ( 'checkbox' === $question['input_type'] ) {
		foreach ( $question['answers'] as $answer ) {
			if ( ! empty( $answer['points'] ) && $answer['points'] > 0 ) {
				$max_score += (int) $answer['points'];
			}

			if ( ! empty( $answer['sub_questions'] ) ) {
				foreach ( $answer['sub_questions'] as $sub_question ) {
					$max_score += mappers_get_max_question_score( $sub_question );
				}
			}
		}
	}

	if ( 'radio' === $question['input_type'] ) {
		$max_answer = null;
		$max_points = 0;

		foreach ( $question['answers'] as $answer ) {
			$points = (int) ( $answer['points'] ?? 0 );

			if ( $points >= $max_points ) {
				$max_points = $points;
				$max_answer = $answer;
			}
		}

		$max_score += $max_points;

		if ( ! empty( $max_answer['sub_questions'] ) ) {
			foreach ( $max_answer['sub_questions'] as $sub_question ) {
				$max_score += mappers_get_max_question_score( $sub_question );
			}
		}
	}

	return $max_score;
}

/**
 * Parse primitive value.
 *
 * @param string $value Raw value.
 * @return string|int|float
 */
function mappers_parse_primitive( string $value ) {
	if ( is_numeric( $value ) ) {
		return $value + 0;
	}

	if (
		( str_starts_with( $value, '\'' ) && str_ends_with( $value, '\'' ) ) ||
		( str_starts_with( $value, '"' ) && str_ends_with( $value, '"' ) )
	) {
		return substr( $value, 1, -1 );
	}

	return $value;
}

/**
 * Parse condition string.
 *
 * @param string $condition Condition string.
 * @return array
 */
function mappers_parse_condition( string $condition ): array {
	$condition = trim( $condition );

	if ( ! preg_match( '/\s+(NOT IN|IN|=|!=|>=|<=|>|<)\s+/', $condition, $matches ) ) {
		return array();
	}

	$operator = $matches[1];

	$parts = explode( $operator, $condition, 2 );
	$left  = trim( $parts[0] ?? '' );
	$right = trim( $parts[1] ?? '' );

	if ( '' === $left || '' === $right ) {
		return array();
	}

	$field      = $left;
	$field_path = explode( '.', $field );

	if ( 'IN' === $operator || 'NOT IN' === $operator ) {
		if ( ! str_starts_with( $right, '[' ) || ! str_ends_with( $right, ']' ) ) {
			return array();
		}

		$raw_values = array_map(
			'trim',
			explode( ',', substr( $right, 1, -1 ) )
		);

		$value = array_map( 'mappers_parse_primitive', $raw_values );
	} else {
		$value = mappers_parse_primitive( $right );
	}

	return array(
		'field'      => $field,
		'field_path' => $field_path,
		'operator'   => $operator,
		'value'      => $value,
	);
}

/**
 * Get condition value from audit.
 *
 * @param array $audit Sections array.
 * @param array $field_path Field path.
 * @return mixed|null
 */
function mappers_get_audit_quiz_condition_value( array $audit, array $field_path ) {
	$section_name  = $field_path[0] ?? null;
	$question_name = $field_path[1] ?? null;

	if ( $section_name && $question_name ) {
		foreach ( $audit as $section ) {
			if ( ( $section['name'] ?? null ) === $section_name ) {
				foreach ( $section['quiz'] ?? array() as $question ) {
					if ( ( $question['name'] ?? null ) === $question_name ) {
						return $question['val'] ?? null;
					}
				}
			}
		}
	}

	return null;
}

/**
 * Evaluate condition value.
 *
 * @param mixed  $left_value Left value.
 * @param string $operator Operator.
 * @param mixed  $right_value Right value.
 * @return bool
 */
function mappers_evaluate_condition_value( $left_value, string $operator, $right_value ): bool {
	switch ( $operator ) {
		case '=':
			return $left_value === $right_value;
		case '!=':
			return $left_value !== $right_value;
		case '>':
			return (float) $left_value > (float) $right_value;
		case '<':
			return (float) $left_value < (float) $right_value;
		case '>=':
			return (float) $left_value >= (float) $right_value;
		case '<=':
			return (float) $left_value <= (float) $right_value;
		case 'IN':
			return is_array( $right_value ) && in_array( $left_value, $right_value, true );
		case 'NOT IN':
			return is_array( $right_value ) && ! in_array( $left_value, $right_value, true );
		default:
			return false;
	}
}

/**
 * Check section condition.
 *
 * @param array $section Section data.
 * @param array $audit Audit data.
 * @return bool
 */
function mappers_check_section_condition( array $section, array $audit ): bool {
	if ( empty( $section['condition'] ) ) {
		return true;
	}

	$parsed = mappers_parse_condition( $section['condition'] );

	$condition_value = mappers_get_audit_quiz_condition_value( $audit, $parsed['field_path'] );

	return mappers_evaluate_condition_value(
		$condition_value,
		$parsed['operator'],
		$parsed['value']
	);
}

/**
 * Check question condition.
 *
 * @param array  $question Question data.
 * @param string $section_name Section name.
 * @param array  $audit Audit data.
 * @return bool
 */
function mappers_check_question_condition( array $question, string $section_name, array $audit ): bool {
	if ( empty( $question['condition'] ) ) {
		return true;
	}

	$parsed = mappers_parse_condition( $question['condition'] );

	if ( count( $parsed['field_path'] ) !== 2 ) {
		array_unshift( $parsed['field_path'], $section_name );
	}

	$condition_value = mappers_get_audit_quiz_condition_value( $audit, $parsed['field_path'] );

	return mappers_evaluate_condition_value(
		$condition_value,
		$parsed['operator'],
		$parsed['value']
	);
}
