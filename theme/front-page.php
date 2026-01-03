<?php
/**
 * Home page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Home
	Template Post Type: page
*/

$credits       = new Mappers_Credits( get_current_user_id() );
$credits_total = $credits->get_credits();

$credits_page_id = mappers_get_page_id_by_template( 'page-credits.php' );
$audits_page_id  = mappers_get_page_id_by_template( 'page-audits.php' );

?>
<?php get_header(); ?>
<main class="mappers-main">
	<div class="mappers-container">
		<div class="mappers-home-head">
			<h1 class="mappers-home-title mappers-h1">
				<?php the_title(); ?>
			</h1>
			<div class="mappers-home-credits">
				<div class="mappers-home-credits-title">
					<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
					<span>
						<?php esc_html_e( 'У вас', 'mappers' ); ?>
						<span><?php echo esc_html( $credits_total ); ?></span>
						<?php echo esc_html( mappers_plural( $credits_total, array( __( 'кредит', 'mappers' ), __( 'кредити', 'mappers' ), __( 'кредитів', 'mappers' ) ) ) ); ?>
					</span>
				</div>
				<?php if ( $credits_page_id ) : ?>
				<a href="<?php echo esc_url( get_the_permalink( $credits_page_id ) ); ?>" class="mappers-home-credits-link">
					<?php esc_html_e( 'Поповнити', 'mappers' ); ?>
				</a>
				<?php endif; ?>
			</div>
		</div>
		<?php
		if ( $audits_page_id ) :
			$mappers_icon        = carbon_get_post_meta( $audits_page_id, 'mappers_icon' );
			$mappers_audit_types = carbon_get_post_meta( $audits_page_id, 'mappers_audit_types' );

			$min_cost = null;
			if ( $mappers_audit_types ) {
				$prices   = array_column( $mappers_audit_types, 'price' );
				$min_cost = ! empty( $prices ) ? min( $prices ) : 0;
			}

			$excerpt = mappers_get_excerpt( $audits_page_id );
			?>
			<div class="mappers-tools-list">
				<a href="<?php echo esc_url( get_the_permalink( $audits_page_id ) ); ?>" class="mappers-tools-item">
					<div class="mappers-tools-item-head">
						<div class="mappers-tools-item-title">
							<?php if ( $mappers_icon ) : ?>
								<div class="mappers-tools-item-icon mappers-contain-img">
									<?php echo wp_get_attachment_image( $mappers_icon, 'full' ); ?>
								</div>
							<?php endif; ?>
							<div class="mappers-tools-item-title-text mappers-h3">
								<?php echo esc_html( get_the_title( $audits_page_id ) ); ?>
							</div>
						</div>
						<div class="mappers-tools-item-price">
							<div class="mappers-tools-item-price-title">
								<?php echo $min_cost ? esc_html__( 'від', 'mappers' ) . ' ' . esc_html( $min_cost ) : esc_html__( 'FREE', 'mappers' ); ?>
							</div>
							<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
						</div>
					</div>
					<?php if ( $mappers_audit_types ) : ?>
						<div class="mappers-tools-item-tags">
							<?php foreach ( $mappers_audit_types as $item ) : ?>
								<div class="mappers-tools-item-tag">
									<?php echo esc_html( $item['title'] ); ?>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
					<?php if ( $excerpt ) : ?>
						<div class="mappers-tools-item-excerpt">
							<?php echo esc_html( $excerpt ); ?>
						</div>
					<?php endif; ?>
					<div class="mappers-tools-item-foot">
						<div class="mappers-tools-item-read-more">
							<?php esc_html_e( 'Дізнатись більше', 'mappers' ); ?>
						</div>
						<div class="mappers-tools-item-arrow">
							<svg class="mappers-icon"><use xlink:href="#icon-arrow-link"/></svg>
						</div>
					</div>
				</a>
			</div>
		<?php endif; ?>
	</div>
</main>
<?php the_post(); ?>
<?php
get_footer();
