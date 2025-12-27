<?php
/**
 * Single audit
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$user_id      = get_current_user_id();
$mappers_user = mappers_get_post_association_id( $post->ID, 'mappers_user' );

if ( ( ! $user_id || $mappers_user !== $user_id ) && ! mappers_is_editor_or_admin() ) {
	mappers_force_404();
}

$mappers_audit = carbon_get_the_post_meta( 'mappers_audit' );
if ( ! $mappers_audit ) {
	mappers_force_404();
}

$mappers_audit = json_decode( $mappers_audit, true );

if ( json_last_error() !== JSON_ERROR_NONE ) {
	mappers_force_404();
}

$audit_sections = mappers_get_audit_sections();

if ( ! $audit_sections ) {
	mappers_force_404();
}

$not_used_questions = array();

foreach ( $audit_sections as $audit_section ) {
	foreach ( $audit_section['quiz'] as $question ) {
		if ( 'radio' === $question['input_type'] ) {
			$has_not = array_find( $question['answers'], fn( $item ) => 'not' === $item['val'] );
			if ( $has_not ) {
				if ( ! isset( $not_used_questions[ $audit_section['name'] ] ) ) {
					$not_used_questions[ $audit_section['name'] ] = array();
				}
				$not_used_questions[ $audit_section['name'] ][] = $question['name'];
			}
		}
	}
}

foreach ( $audit_sections as $index => $audit_section ) {
	$initial_score = $audit_section['initial_score'] ? (int) $audit_section['initial_score'] : 0;
	$not_used_quiz = $not_used_questions[ $audit_section['name'] ] ?? null;

	$mappers_audit_section = array_find( $mappers_audit, fn( $item ) => $item['name'] === $audit_section['name'] );
	$mappers_audit_quiz    = $mappers_audit_section ? $mappers_audit_section['quiz'] : null;

	$max_score = array_reduce(
		$audit_section['quiz'],
		function ( $carry, $question ) use ( $mappers_audit_quiz, $not_used_quiz, $audit_section, $mappers_audit_section ) {
			if ( $mappers_audit_quiz ) {
				if ( $not_used_quiz ) {
					if ( $question['condition'] ) {
						$parsed_condition = mappers_parse_condition( $question['condition'] );
						if ( $parsed_condition && ! empty( $parsed_condition['field_path'] ) ) {
							$condition_question_name = end( $parsed_condition['field_path'] );
							$condition_question      = array_find(
								$audit_section['quiz'],
								fn( $item ) => $item['name'] === $condition_question_name
							);

							$has_not = in_array( $condition_question['name'], $not_used_quiz, true );
							if ( $has_not ) {
								$condition_audit_question = array_find(
									$mappers_audit_quiz,
									fn( $item ) => $item['name'] === $condition_question['name']
								);

								$val = $condition_audit_question['val'] ?? null;
								if ( 'not' === $val ) {
										// echo '1' . $mappers_audit_section['name'] . ':' . $question['name'] . ' - ' . $val . '<br>';
										return $carry;
								}
							}
						}
					}

					$has_not = in_array( $question['name'], $not_used_quiz, true );
					if ( $has_not ) {
						$mappers_audit_question = array_find(
							$mappers_audit_quiz,
							fn( $item ) => $item['name'] === $question['name']
						);

						$val = $mappers_audit_question['val'] ?? null;

						if ( 'not' === $val ) {
							// echo '2' . $mappers_audit_section['name'] . ':' . $question['name'] . ' - ' . $val . '<br>';
							return $carry;
						}
					}
				}
				if ( 'custom' === $question['input_type'] ) {
					if ( 'catalogs_count' === $question['name'] ) {
						$mappers_audit_question = array_find(
							$mappers_audit_quiz,
							fn( $item ) => $item['name'] === $question['name']
						);
						if ( $mappers_audit_question ) {
							foreach ( $mappers_audit_question['answers'] as $answer ) {
								if ( 'yes' === $answer['val'] ) {
									if ( ! empty( $answer['sub_questions'] ) ) {
										$max_score = $answer['sub_questions'][0]['val'] ?? 0;
										// var_dump( $max_score );
										$carry += $max_score;
										return $carry;
									}
								}
							}
						}
					}
				}
			}

			$carry += mappers_get_max_question_score( $question );
			return $carry;
		},
		$initial_score
	);

	$audit_score = 0;
	if ( $mappers_audit_quiz ) {
		$audit_score = array_reduce(
			$mappers_audit_quiz,
			function ( $carry, $question ) {
				$carry += mappers_get_audit_score( $question );
				return $carry;
			},
			$initial_score
		);
	}

	$audit_sections[ $index ]['max_score']   = $max_score;
	$audit_sections[ $index ]['audit_score'] = $audit_score;
}

$mappers_company = carbon_get_the_post_meta( 'mappers_company' );
$mappers_address = carbon_get_the_post_meta( 'mappers_address' );
$user_name       = mappers_get_user_name( $user_id );

?>
<?php get_header(); ?>
<?php the_post(); ?>
<div class="mappers-audit-hero">
<pre style="font-size:10px;">
<?php
// print_r( $audit_sections );
?>
</pre>
	<div class="mappers-container">
		<div class="mappers-audit-date">
			<span><?php esc_html_e( 'від', 'mappers' ); ?></span>
			<span><?php echo get_the_date( 'd.m.Y' ); ?></span>
		</div>
		<h1 class="mappers-audit-title">
			<span><?php echo esc_html( 'Аудит для компанії', 'mappers' ); ?></span>
			<?php if ( $mappers_company ) : ?>
				<span class="mappers-audit-company">
					<?php echo esc_html( $mappers_company ); ?>
				</span>
			<?php endif; ?>
		</h1>
		<div class="mappers-audit-hello">
			<div class="mappers-audit-hello-icon">
				<svg class="mappers-icon"><use xlink:href="#icon-email"/></svg>
			</div>
			<div class="mappers-audit-hello-body">
				<p><?php esc_html_e( 'Вітаю,', 'mappers' ); ?> <?php echo esc_html( $user_name ); ?>!</p>
				<p>
					<?php esc_html_e( 'Ми отримали вашу заявку на аудит картки вашої компанії', 'mappers' ); ?>
					<span><?php echo esc_html( $mappers_company ); ?></span>
					<?php esc_html_e( 'яка знаходиться за адресою:', 'mappers' ); ?>
					<span><?php echo esc_html( $mappers_address ); ?></span>
					<?php esc_html_e( 'та з задоволенням його робимо.', 'mappers' ); ?>
				</p>
			</div>
		</div>
	</div>
</div>
<main class="mappers-audit-main">
	<div class="mappers-container">
		<?php
		foreach ( $audit_sections as $audit_section ) :
			$mappers_audit_section = array_find( $mappers_audit, fn( $item ) => $item['name'] === $audit_section['name'] );
			$mappers_audit_quiz    = $mappers_audit_section ? $mappers_audit_section['quiz'] : null;
			?>
			<div class="mappers-audit-section">
				<h2 class="mappers-audit-section-title">
					<span><?php echo esc_html( $audit_section['title'] ?? '' ); ?></span>
				</h2>
				<div class="mappers-audit-section-body">
					<div class="mappers-audit-section-chart">
						<div class="mappers-audit-section-chart-points">
							<span><?php echo esc_html( $audit_section['max_score'] ); ?></span>
							<span><?php echo esc_html( $audit_section['audit_score'] ); ?></span>
						</div>
						
					</div>
					<div class="mappers-audit-section-info">
						<?php if ( $audit_section['introduction'] ) : ?>
							<div class="mappers-audit-section-intro mappers-content-text">
								<?php
									// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									echo apply_filters( 'the_content', $audit_section['introduction'] );
								?>
							</div>
						<?php endif; ?>
						<?php if ( $mappers_audit_quiz ) : ?>
							<div class="mappers-audit-section-list">
								<?php
								foreach ( $mappers_audit_quiz as $question ) {
									mappers_the_audit_result( $question );
								}
								?>
							</div>
						<?php endif; ?>
					</div>
				</div>
			</div>
			<?php endforeach; ?>
	</div>
</main>
			<?php
			get_footer();
