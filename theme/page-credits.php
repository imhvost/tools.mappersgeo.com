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

$user_id              = get_current_user_id();
$mappers_credits      = (int) carbon_get_user_meta( $user_id, 'mappers_credits' );
$mappers_credit_price = (int) carbon_get_theme_option( 'mappers_credit_price' );
$mappers_currency     = carbon_get_theme_option( 'mappers_currency' );
$mappers_packages     = carbon_get_the_post_meta( 'mappers_packages' );
?>
<?php get_header(); ?>
<?php the_post(); ?>
<main class="mappers-page-main">
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
				<div class="mappers-credits-my-price">
					<div class="mappers-credits-my-price-item">
						<span>1</span>
						<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
					</div>
					<div class="mappers-credits-my-price-divider">=</div>
					<div class="mappers-credits-my-price-cost">
						<span><?php echo esc_html( $mappers_credit_price ); ?></span>
						<span><?php echo esc_html( $mappers_currency ); ?></span>
					</div>
				</div>
				<button
					class="mappers-credits-my-btn mappers-btn"
					data-modal-open="<?php echo $user_id ? 'mappers-modal-credits-buy' : 'mappers-modal-registration'; ?>"
					data-package="custom"
				>
					<?php esc_html_e( 'Поповнити', 'mappers' ); ?>
				</button>
			</div>
			<?php if ( $mappers_packages ) : ?>
				<div class="mappers-credits-packages">
					<div class="mappers-credits-packages-title">
						<?php esc_html_e( 'Вартість кредитів', 'mappers' ); ?>
					</div>
					<div class="mappers-credits-packages-list">
						<?php foreach ( $mappers_packages as $item ) : ?>
							<a
								href="#" class="mappers-credits-package"
								data-modal-open="<?php echo $user_id ? 'mappers-modal-credits-buy' : 'mappers-modal-registration'; ?>"
								data-package="<?php echo esc_attr( $item['credits'] ); ?>-<?php echo esc_attr( $item['price'] ); ?>"
								<?php
								if ( $item['color'] ) :
									?>
								style="
									--bg-color: <?php echo esc_attr( $item['color'] ); ?>;
									--icon-color: <?php echo esc_attr( mappers_darken_color( $item['color'], 30 ) ); ?>;
									--border-color: <?php echo esc_attr( mappers_lighten_color( $item['color'], 30 ) ); ?>;
									--gradient-start: <?php echo esc_attr( mappers_lighten_color( $item['color'], 20 ) ); ?>;
									--gradient-end: <?php echo esc_attr( mappers_darken_color( $item['color'], 20 ) ); ?>;
								"
								<?php endif; ?>
							>
								<div class="mappers-credits-package-icon">
									<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
								</div>
								<div class="mappers-credits-package-body">
									<div class="mappers-credits-package-title">
										<?php echo esc_html( $item['title'] ); ?>
									</div>
									<div class="mappers-credits-package-price">
										<span><?php echo esc_html( $item['price'] ); ?></span>
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
</main>
<?php
get_footer();
