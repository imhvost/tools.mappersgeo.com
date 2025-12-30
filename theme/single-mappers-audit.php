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

$not_used_questions = array();

foreach ( $mappers_audit as $audit_section ) {
	$audit_quiz = $audit_section['quiz'] ?? array();
	foreach ( $audit_quiz as $question ) {
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

foreach ( $mappers_audit as $index => $audit_section ) {
	$initial_score = $audit_section['initial_score'] ? (int) $audit_section['initial_score'] : 0;
	$not_used_quiz = $not_used_questions[ $audit_section['name'] ] ?? null;

	$audit_quiz = $audit_section['quiz'] ?? array();

	$max_score = array_reduce(
		$audit_quiz,
		function ( $carry, $question ) use ( $not_used_quiz, $audit_quiz ) {
			if ( $not_used_quiz ) {
				if ( $question['condition'] ) {
					$parsed_condition = mappers_parse_condition( $question['condition'] );
					if ( $parsed_condition && ! empty( $parsed_condition['field_path'] ) ) {
						$condition_question_name = end( $parsed_condition['field_path'] );
						$condition_question      = array_find(
							$audit_quiz,
							fn( $item ) => $item['name'] === $condition_question_name
						);

						$has_not = in_array( $condition_question['name'], $not_used_quiz, true );
						if ( $has_not ) {
							$condition_audit_question = array_find(
								$audit_quiz,
								fn( $item ) => $item['name'] === $condition_question['name']
							);

							$val = $condition_audit_question['val'] ?? null;
							if ( 'not' === $val ) {
								return $carry;
							}
						}
					}
				}

				$has_not = in_array( $question['name'], $not_used_quiz, true );
				if ( $has_not ) {
					$audit_question = array_find(
						$audit_quiz,
						fn( $item ) => $item['name'] === $question['name']
					);

					$val = $audit_question['val'] ?? null;

					if ( 'not' === $val ) {
						return $carry;
					}
				}
			}
			if ( 'custom' === $question['input_type'] ) {
				if ( 'catalogs_count' === $question['name'] ) {
					$audit_question = array_find(
						$audit_quiz,
						fn( $item ) => $item['name'] === $question['name']
					);
					if ( $audit_question ) {
						foreach ( $audit_question['answers'] as $answer ) {
							if ( 'yes' === $answer['val'] ) {
								if ( ! empty( $answer['sub_questions'] ) ) {
									$max_score = $answer['sub_questions'][0]['val'] ?? 0;
									$carry    += $max_score;
									return $carry;
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

	if ( mappers_check_section_condition( $audit_section, $mappers_audit ) ) {
		$mappers_audit[ $index ]['check_condition'] = true;

		$audit_score = $initial_score;

		foreach ( $audit_quiz as $i => $question ) {
			if ( mappers_check_question_condition( $question, $audit_section['name'], $mappers_audit ) ) {
				$audit_score += mappers_get_audit_score( $question );

				$mappers_audit[ $index ]['quiz'][ $i ]['check_condition'] = true;
			} else {
				$mappers_audit[ $index ]['quiz'][ $i ]['check_condition'] = false;
			}
		}
	} else {
		$mappers_audit[ $index ]['check_condition'] = false;
	}

	$mappers_audit[ $index ]['max_score']   = $max_score;
	$mappers_audit[ $index ]['audit_score'] = $audit_score;
}

$mappers_company = carbon_get_the_post_meta( 'mappers_company' );
$mappers_address = carbon_get_the_post_meta( 'mappers_address' );
$user_name       = mappers_get_user_name( $user_id );

?>
<?php get_header(); ?>
<?php the_post(); ?>
<div class="mappers-audit-hero"> 
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
		<?php foreach ( $mappers_audit as $audit_section ) : ?>
			<div class="mappers-audit-section">
				<h2 class="mappers-audit-section-title">
					<span><?php echo esc_html( $audit_section['title'] ?? '' ); ?></span>
				</h2>
				<div class="mappers-audit-section-body">
					<?php if ( $audit_section['max_score'] ) : ?>
						<div class="mappers-audit-section-chart">
							<svg viewBox="0 0 264 264" style="--max: <?php echo esc_attr( $audit_section['max_score'] ); ?>; --val: <?php echo esc_attr( $audit_section['audit_score'] ); ?>;">
								<defs>
									<linearGradient id="mappers-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
										<stop offset="0%" stop-color="#7AD3FF"/>
										<stop offset="100%" stop-color="#4FBAF0"/>
									</linearGradient>
								</defs>
								<circle cx="132" cy="132" r="114" stroke="url(#mappers-gradient)"/>
							</svg>
							<div class="mappers-audit-section-chart-score">
								<div class="audit-section-chart-percent">
									<?php echo esc_html( round( ( $audit_section['audit_score'] / $audit_section['max_score'] ) * 100 ) ); ?>%
								</div>
								<div class="mappers-audit-section-chart-points">
									<span><?php echo esc_html( $audit_section['max_score'] ); ?></span>
									<span><?php echo esc_html( $audit_section['audit_score'] ); ?></span>
								</div>
							</div>
						</div>
					<?php endif; ?>
					<div class="mappers-audit-section-info">
						<?php if ( $audit_section['report'] ?? null ) : ?>
							<div class="mappers-audit-section-report mappers-content-text">
								<?php
									// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									echo apply_filters( 'the_content', $audit_section['report'] );
								?>
							</div>
						<?php endif; ?>
						<?php
						if ( $audit_section['check_condition'] ) :
							if ( $audit_section['quiz'] ?? null ) :
								?>
								<div class="mappers-audit-section-list">
									<?php
									if ( ! empty( $audit_section['condition'] ) && ! empty( $audit_section['condition_ok'] ) ) {
										get_template_part(
											'template-parts/audit',
											'result',
											array(
												'report' => $audit_section['condition_ok'],
												'color'  => 'green',
												'icon'   => 'like',
											)
										);
									}
									?>
									<?php
									foreach ( $audit_section['quiz'] as $question ) {
										mappers_the_audit_result( $question );
									}
									?>
								</div>
							<?php endif; ?>
							<?php
							elseif ( ! empty( $audit_section['condition_alert'] ) ) :
									get_template_part(
										'template-parts/audit',
										'result',
										array(
											'report' => $audit_section['condition_alert'],
											'color'  => 'red',
											'icon'   => 'dislike',
										)
									);
							endif;
							?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</main>
<?php
	$mappers_expert         = mappers_get_post_association_id( $post->ID, 'mappers_expert' );
	$expert_name            = mappers_get_user_name( $mappers_expert );
	$mappers_expert_comment = carbon_get_the_post_meta( 'mappers_expert_comment' );
if ( $expert_name && $mappers_expert_comment ) :
	$mappers_img         = carbon_get_user_meta( $mappers_expert, 'mappers_img' );
	$mappers_expert_link = carbon_get_user_meta( $mappers_expert, 'mappers_expert_link' );
	?>
	<div class="mappers-audit-expert">
		<div class="mappers-container">
			<?php if ( $mappers_img ) : ?>
				<<?php echo $mappers_expert_link ? 'a href="' . esc_url( $mappers_expert_link ) . '" target="_blank"' : 'div'; ?> class="mappers-audit-expert-img mappers-cover-img">
					<?php echo wp_get_attachment_image( $mappers_img, 'full' ); ?>
				</<?php echo $mappers_expert_link ? 'a' : 'div'; ?>>
			<?php endif; ?>
			<div class="mappers-audit-expert-body">
				<div class="mappers-audit-expert-head">
					<div class="mappers-audit-expert-title">
						<?php esc_html_e( 'Коментар експерта', 'mappers' ); ?>
					</div>
					<<?php echo $mappers_expert_link ? 'a href="' . esc_url( $mappers_expert_link ) . '" target="_blank"' : 'div'; ?> class="mappers-audit-expert-name">
						<?php echo esc_html( $expert_name ); ?>
					</<?php echo $mappers_expert_link ? 'a' : 'div'; ?>>
				</div>
				<div class="mappers-audit-expert-comment mappers-content-text">
					<?php
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						echo apply_filters( 'the_content', $mappers_expert_comment );
					?>
				</div>
			</div>
		</div>
	</div>
<?php endif; ?>
<?php
get_footer();
