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
 * @return int
 */
function mappers_get_max_question_score( $question ) {
	$max_score = 0;

	if ( empty( $question['answers'] ) || empty( $question['input_type'] ) || empty( $question['name'] ) ) {
		return 0;
	}

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
