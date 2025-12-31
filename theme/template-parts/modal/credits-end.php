<?php
/**
 * Modal credits end
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$credits_page_id = mappers_get_page_id_by_template( 'page-credits.php' );
?>
<div id="mappers-modal-credits-end" class="mappers-modal mappers-modal-credits-end">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Не вистачає кредитів на вашому рахунку', 'mappers' ); ?></div>
			<?php if ( $credits_page_id ) : ?>
				<a href="<?php echo esc_url( get_the_permalink( $credits_page_id ) ); ?>" class="mappers-btn mappers-modal-credits-end-btn">
					<span><?php esc_html_e( 'Купити кредити', 'mappers' ); ?></span>
					<svg class="mappers-icon"><use xlink:href="#icon-credits" /></svg>
				</a>
			<?php endif; ?>
		</div>
	</div>
</div>
