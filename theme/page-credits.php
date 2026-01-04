<?php
/**
 * Credits page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Credits
	Template Post Type: page
*/

$user_id          = get_current_user_id();
$mappers_credits  = (int) carbon_get_user_meta( $user_id, 'mappers_credits' );
$mappers_currency = carbon_get_theme_option( 'mappers_currency' );

$packages = get_posts(
	array(
		'post_type'      => 'mappers-package',
		'posts_per_page' => -1,
		'post_status'    => 'publish',
		'fields'         => 'ids',
	)
);
?>
<?php get_header(); ?>
<?php the_post(); ?>
<main class="mappers-main">
	<div class="mappers-container">
		<h1 class="mappers-page-title mappers-h1">
			<?php the_title(); ?>
		</h1>
		<div class="mappers-credits-body">
			<div class="mappers-credits-my">
				<div class="mappers-credits-my-title">
					<?php esc_html_e( 'Кредити на вашому рахунку', 'mappers' ); ?>
				</div>
				<div class="mappers-credits-my-count">
					<span><?php echo esc_html( $mappers_credits ); ?></span>
					<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
				</div>
				<?php get_template_part( 'template-parts/credits', 'price' ); ?>
				<button
					class="mappers-credits-buy-btn mappers-credits-my-btn mappers-btn"
					<?php echo $user_id ? '' : 'data-modal-open="mappers-modal-registration"'; ?>
					data-package="custom"
				>
					<?php esc_html_e( 'Поповнити', 'mappers' ); ?>
				</button>
			</div>
			<?php if ( $packages ) : ?>
				<div class="mappers-credits-packages">
					<div class="mappers-credits-packages-title">
					<?php esc_html_e( 'Вартість кредитів', 'mappers' ); ?>
					</div>
					<div class="mappers-credits-packages-list">
						<?php
						foreach ( $packages as $target_post_id ) :
							$mappers_credits = carbon_get_post_meta( $target_post_id, 'mappers_credits' );
							$mappers_price   = carbon_get_post_meta( $target_post_id, 'mappers_price' );
							$mappers_color   = carbon_get_post_meta( $target_post_id, 'mappers_color' );
							?>
							<a
								href="#" class="mappers-credits-buy-btn mappers-credits-package"
								<?php echo $user_id ? '' : 'data-modal-open="mappers-modal-registration"'; ?>
								data-package="<?php echo esc_attr( $target_post_id ); ?>"
							<?php
							if ( $mappers_color ) :
								?>
								style="
									--bg-color: <?php echo esc_attr( $mappers_color ); ?>;
									--icon-color: <?php echo esc_attr( mappers_darken_color( $mappers_color, 30 ) ); ?>;
									--border-color: <?php echo esc_attr( mappers_lighten_color( $mappers_color, 30 ) ); ?>;
									--gradient-start: <?php echo esc_attr( mappers_lighten_color( $mappers_color, 20 ) ); ?>;
									--gradient-end: <?php echo esc_attr( mappers_darken_color( $mappers_color, 20 ) ); ?>;
								"
								<?php endif; ?>
							>
								<div class="mappers-credits-package-icon">
									<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
								</div>
								<div class="mappers-credits-package-body">
									<div class="mappers-credits-package-title">
										<?php echo esc_html( $mappers_credits ); ?>
									</div>
									<div class="mappers-credits-package-price">
										<span><?php echo esc_html( $mappers_price ); ?></span>
										<span><?php echo esc_html( $mappers_currency ); ?></span>
									</div>
								</div>
							</a>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</div>
	<?php
		$page_content = get_the_content( null, false, $post->ID );
	if ( $page_content ) :
		?>
	<div class="mappers-page-content home-page-content content-text">
		<?php
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo apply_filters( 'the_content', $page_content );
		?>
	</div>
	<?php endif; ?>
</main>
<?php
get_template_part( 'template-parts/modal/credits', 'buy', array( 'packages' => $packages ) );
get_footer();
