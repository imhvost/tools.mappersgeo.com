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
		<?php
		foreach ( $mappers_audit as $section ) :
			$quiz          = $section['quiz'] ?? array();
			$initial_score = $section['initial_score'] ?? 0;

			$max_score = array_reduce(
				$quiz,
				fn( $carry, $question ) => $carry + mappers_get_max_question_score( $question ),
				$initial_score
			);
			?>
			<div class="mappers-audit-section">
				<h2 class="mappers-audit-section-title">
					<span><?php echo esc_html( $section['title'] ?? '' ); ?></span>
				</h2>
				<div class="mappers-audit-section-body">
					<div class="mappers-audit-section-chart">
						<?php echo esc_html( $max_score ); ?>
					</div>
					<div class="mappers-audit-section-info">

					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</main>
<?php
get_footer();
