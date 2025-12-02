<?php
/**
 * Modal credits buy
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$packages = $args['packages'] ?? null;
if ( ! $packages ) {
	$packages = get_posts(
		array(
			'post_type'      => 'mappers-package',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'fields'         => 'ids',
		)
	);
}

$mappers_credit_price = (int) carbon_get_theme_option( 'mappers_credit_price' );
$mappers_currency     = carbon_get_theme_option( 'mappers_currency' );
?>
<div id="mappers-modal-credits-buy" class="mappers-modal mappers-modal-credits-buy">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<form action="?" class="mappers-credits-buy-form">
				<input type="hidden" name="package">
				<?php get_template_part( 'template-parts/form', 'notifications' ); ?>
				<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Придбання кредитів', 'mappers' ); ?></div>
				<div class="mappers-credits-buy-form-body">
					<div class="mappers-credits-buy-form-tab mappers-tab-block" data-package="custom">
						<div class="mappers-credits-buy-form-inputs">
							<label class="mappers-form-block">
								<span class="mappers-form-block-title"><?php esc_html_e( 'Сума до сплати', 'mappers' ); ?></span>
								<input
									type="number"
									min="<?php echo esc_attr( $mappers_credit_price ); ?>"
									class="mappers-input mappers-credits-buy-form-amount-input"
									name="amount"
									placeholder="<?php esc_attr_e( 'Сума', 'mappers' ); ?>"
									data-required
									data-price="<?php echo esc_attr( $mappers_credit_price ); ?>"
								>
							</label>
							<?php get_template_part( 'template-parts/credits', 'price' ); ?>
							<div class="mappers-credits-buy-form-total">
								<div class="mappers-credits-buy-form-total-title">
									<?php esc_html_e( 'Ви придбаєте:', 'mappers' ); ?>
								</div>
								<div class="mappers-credits-buy-form-total-body">
									<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
									<div class="mappers-credits-buy-form-total-content mappers-h3">
										<span class="mappers-credits-buy-form-total-count">0</span>
										<span class="mappers-credits-buy-form-total-desc">
											<?php esc_html_e( 'кредитов', 'mappers' ); ?>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<?php
					if ( $packages ) :
						foreach ( $packages as $target_post_id ) :
							$mappers_price = carbon_get_post_meta( $target_post_id, 'mappers_price' );
							?>
							<div class="mappers-credits-buy-form-tab mappers-tab-block" data-package="<?php echo esc_attr( $target_post_id ); ?>">
								<div class="mappers-credits-buy-form-package mappers-h3">
									<div class="mappers-credits-buy-form-package-title">
										<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
										<span><?php echo esc_html( get_the_title( $target_post_id ) ); ?></span>
									</div>
									<div class="mappers-credits-buy-form-package-price">
										<span><?php echo esc_html( $mappers_price ); ?></span>
										<span><?php echo esc_html( $mappers_currency ); ?></span>
									</div>
								</div>
							</div>
							<?php
							endforeach;
						endif;
					?>
				</div>
				<button type="submit" class="mappers-btn"><?php esc_html_e( 'Придбати', 'mappers' ); ?></button>
			</form>
		</div>
	</div>
</div>
