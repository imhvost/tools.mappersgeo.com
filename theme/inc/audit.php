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
		if ( 'photos_content' === $question['name'] ) {
			foreach ( $question['answers'] as $answer ) {
				if ( ! empty( $answer['sub_questions'] ) ) {
					foreach ( $answer['sub_questions'] as $sub_question ) {
						$max_score += mappers_get_max_question_score( $sub_question );
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
 * Get audit score for question.
 *
 * @param array $question Question data.
 *
 * @return int
 */
function mappers_get_audit_score( $question ) {
	$score = 0;

	$val = $question['val'] ?? null;
	if ( ! $val ) {
		return $score;
	}

	$answers = $question['answers'] ?? array();
	$answer  = array_find( $answers, fn( $item ) => $item['val'] === $val );

	if ( 'custom' === $question['input_type'] ) {
		if ( 'photos_content' === $question['name'] ) {
			$answer_yes = array_find( $answers, fn( $item ) => 'yes' === $item['val'] );
			$answer_no  = array_find( $answers, fn( $item ) => 'no' === $item['val'] );
			if ( $answer_yes && ! empty( $answer_yes['sub_questions'] ) ) {
				foreach ( $answer_yes['sub_questions'] as $sub_question ) {
					$score += mappers_get_audit_score( $sub_question );
				}
			}
			if ( ! $score ) {
				$score = $answer_no['points'] ?? 0;
			}
		}
		if ( 'catalogs_count' === $question['name'] ) {
			$answer_yes = array_find( $answers, fn( $item ) => 'yes' === $item['val'] );
			if ( $answer_yes && ! empty( $answer_yes['sub_questions'] ) ) {
				$score = $answer_yes['sub_questions'][1]['val'] ?? 0;
			}
		}
	} elseif ( $answer ) {
		$score = $answer['points'] ?? 0;
		if ( ! empty( $answer['sub_questions'] ) ) {
			foreach ( $answer['sub_questions'] as $sub_question ) {
				$score += mappers_get_audit_score( $sub_question );
			}
		}
	}

	$score = (int) $score;
	if ( $score < 0 ) {
		$score = 0;
	}

	return $score;
}

/**
 * Render result for question.
 *
 * @param array $question Question data.
 * @param bool  $is_sub_question Is sub question.
 */
function mappers_the_audit_result( $question, $is_sub_question = false ) {

	if ( ! $is_sub_question && ! ( $question['check_condition'] ?? null ) ) {
		return;
	}

	$val = $question['val'] ?? null;

	if ( 'checkbox' === $question['input_type'] && ! $val ) {
		$val = 'no';
	}

	$answers = $question['answers'] ?? array();
	$answer  = array_find( $answers, fn( $item ) => $item['val'] === $val );

	$report = '';
	$color  = '';
	$icon   = '';

	if ( 'custom' === $question['input_type'] ) {
		if ( 'photos_content' === $question['name'] ) {
			$yes_answer    = $answers[0] ?? array();
			$no_answer     = $answers[1] ?? array();
			$sub_questions = $yes_answer['sub_questions'] ?? array();

			$alerts = array();
			foreach ( $sub_questions as $sub_question ) {
				$sub_val = $sub_question['val'] ?? null;
				if ( ! $sub_val || 'no' === $sub_val ) {
					$sub_answers   = $sub_question['answers'] ?? array();
					$sub_no_answer = $sub_answers[1] ?? array();
					$alerts[]      = $sub_no_answer['report'] ?? '';
				}
			}
			if ( $alerts ) {
				$report = $no_answer['report'] ?? '';
				$color  = 'red';
				$icon   = 'dislike';
			} else {
				$report = $yes_answer['report'] ?? '';
				$color  = 'green';
				$icon   = 'like';
			}

			get_template_part(
				'template-parts/audit',
				'result',
				array(
					'report' => $report,
					'color'  => $color,
					'icon'   => $icon,
				)
			);

			if ( $alerts ) {
					echo '<div class="mappers-audit-section-list-sub">';
				foreach ( $alerts as $alert ) {
					get_template_part(
						'template-parts/audit',
						'result',
						array(
							'report' => $alert,
							'color'  => 'red',
							'icon'   => 'close',
						)
					);
				}
				echo '</div>';
			}

			return;
		}
		if ( 'catalogs_count' === $question['name'] ) {
			$answer_yes = array_find( $answers, fn( $item ) => 'yes' === $item['val'] ) ?? array();
			$answer_no  = array_find( $answers, fn( $item ) => 'no' === $item['val'] ) ?? array();
			$total      = 0;
			$actually   = 0;
			if ( $answer_yes && ! empty( $answer_yes['sub_questions'] ) ) {
				$total    = $answer_yes['sub_questions'][0]['val'] ?? 0;
				$actually = $answer_yes['sub_questions'][1]['val'] ?? 0;
			}
			if ( $actually && $actually === $total ) {
				$report = $answer_yes['report'] ?? '';
				$color  = 'green';
				$icon   = 'like';
			} else {
				$report = $answer_no['report'] ?? '';
				$color  = 'red';
				$icon   = 'dislike';
			}
		}
	} else {
		if ( 'radio' === $question['input_type'] ) {
			if ( 'not' === $val ) {
				return;
			}
			if ( ! $answer ) {
				return;
			}
		}

		$report = $answer['report'] ?? '';
		$color  = $answer['report_color'] ?? '';

		$points = $answer['points'] ?? 0;

		$is_ok = (int) $points > 0;

		if ( $is_sub_question ) {
			$icon = $is_ok ? 'check' : 'close';
		} else {
			$icon = $is_ok ? 'like' : 'dislike';
		}

		if ( 'default' === $color ) {
			$color = $is_ok ? 'green' : 'red';
		}
	}

	get_template_part(
		'template-parts/audit',
		'result',
		array(
			'report' => $report,
			'color'  => $color,
			'icon'   => $icon,
		)
	);

	if ( $answer && ( $answer['sub_questions'] ?? null ) ) {
			echo '<div class="mappers-audit-section-list-sub">';
		foreach ( $answer['sub_questions'] as $sub_question ) {
			mappers_the_audit_result( $sub_question, true );
		}
			echo '</div>';
	}
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

/**
 * Ajax start audit
 *
 * @return void
 */
function mappers_audit_start() {
	$fields = mappers_check_text_fields(
		array(
			'company',
			'address',
			'google_map',
			'type',
		)
	);

	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Відсутній користувач.', 'mappers' ) ) );
	}

	$page_audits_id      = mappers_get_page_id_by_template( 'page-audits.php' );
	$mappers_audit_types = carbon_get_post_meta( $page_audits_id, 'mappers_audit_types' );

	if ( ! $mappers_audit_types || ! is_array( $mappers_audit_types ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Відсутній типи аудитів.', 'mappers' ) ) );
	}

	$audit_type = array_find( $mappers_audit_types, fn( $item ) => $fields['type'] === $item['name'] );

	if ( ! $audit_type ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Не знайдено аудит.', 'mappers' ) ) );
	}

	$audit_cost = (int) ( $audit_type['price'] ?? 0 );

	$user_credits = (int) carbon_get_user_meta( $user_id, 'mappers_credits' );

	if ( ! $user_credits || $user_credits < $audit_cost ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Не вистачає кредитів.', 'mappers' ) ) );
	}

	$audit = mappers_get_audit_sections();
	$audit = wp_json_encode( $audit, JSON_UNESCAPED_UNICODE );

	if ( ! $audit ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Помилка кодування аудиту.', 'mappers' ) ) );
	}

	$slug = wp_unique_post_slug(
		wp_generate_uuid4(),
		0,
		'publish',
		'post',
		0
	);

	$post_id = wp_insert_post(
		array(
			'post_type'   => 'mappers-audit',
			'post_title'  => $fields['company'],
			'post_status' => 'draft',
			'post_name'   => $slug,
		)
	);

	if ( is_wp_error( $post_id ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Помилка створення аудиту.', 'mappers' ) ) );
	}

	carbon_set_post_meta( $post_id, 'mappers_id', $slug );
	carbon_set_post_meta( $post_id, 'mappers_type', $fields['type'] );
	carbon_set_post_meta( $post_id, 'mappers_audit', $audit );
	carbon_set_post_meta( $post_id, 'mappers_company', $fields['company'] );
	carbon_set_post_meta( $post_id, 'mappers_address', $fields['address'] );
	carbon_set_post_meta( $post_id, 'mappers_google_map', $fields['google_map'] );
	carbon_set_post_meta(
		$post_id,
		'mappers_user',
		array(
			'value'   => 'user:user:' . $user_id,
			'id'      => $user_id,
			'type'    => 'user',
			'subtype' => 'user',
		)
	);

	$redirect = '';

	$page_audit_id = mappers_get_page_id_by_template( 'page-audit.php' );
	if ( $page_audit_id ) {
		$version = carbon_get_post_meta( $page_audit_id, 'mappers_version' );
		if ( $version ) {
			carbon_set_post_meta( $post_id, 'mappers_version', $version );
		}

		$redirect = get_the_permalink( $page_audit_id ) . '?id=' . $slug;
	}

	if ( 'pro' === $fields['type'] ) {
		$editors_emails = mappers_get_editors_email();
		if ( $editors_emails ) {
			mappers_mail_notification(
				mappers_get_editors_email(),
				array(
					'subject' => esc_html__( 'Нова заявка на аудит', 'mappers' ),
					'text'    => array(
						sprintf(
						/* translators: %s:  */
							esc_html__( 'Посилання на  %s', 'mappers' ),
							'[mappers_mail_link url="' . esc_url( get_edit_post_link( $post_id ) ) . '"]' . esc_html__( 'пост', 'mappers' ) . '[/mappers_mail_link]'
						),
						'[mappers_mail_link url="' . esc_url( $redirect ) . '"]' . esc_html__( 'Почати аудит', 'mappers' ) . '[/mappers_mail_link]',
					),
				)
			);
		}
	}

	$user_credits -= $audit_cost;
	carbon_set_user_meta( $user_id, 'mappers_credits', $user_credits );

	wp_send_json_success(
		array(
			'message'  => esc_html__( 'Аудит створено', 'mappers' ),
			'post_id'  => $post_id,
			'id'       => $slug,
			'redirect' => 'self' === $fields['type'] ? $redirect : '',
		)
	);
}

add_action( 'wp_ajax_nopriv_mappers_audit_start', 'mappers_audit_start' );
add_action( 'wp_ajax_mappers_audit_start', 'mappers_audit_start' );


/**
 * Ajax audits filter
 *
 * @return void
 */
function mappers_audits_filter() {
	check_ajax_referer( 'mappers_ajaxnonce', 'nonce' );

	// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	$args = isset( $_POST['args'] ) ? wp_unslash( $_POST['args'] ) : array();

	ob_start();
	get_template_part(
		'template-parts/audits',
		'',
		array(
			'query_args' => $args,
		)
	);
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo ob_get_clean();

	wp_die();
}

add_action( 'wp_ajax_nopriv_mappers_audits_filter', 'mappers_audits_filter' );
add_action( 'wp_ajax_mappers_audits_filter', 'mappers_audits_filter' );
