<?php
/**
 * Modal audit sent
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div id="mappers-modal-audit-sent" class="mappers-modal mappers-modal-audit-sent">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Дякуємо. Аудит замовлено.', 'mappers' ); ?></div>
			<button class="mappers-modal-audit-sent-btn mappers-btn" data-modal-close>
				<?php esc_html_e( 'Ок', 'mappers' ); ?>
			</button>
		</div>
	</div>
</div>
