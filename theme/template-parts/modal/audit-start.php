<?php
/**
 * Modal audit start
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div id="mappers-modal-audit-start" class="mappers-modal mappers-modal-audit-start">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<form action="?" class="mappers-audit-start-form mappers-modal-form">
				<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Заповніть інформацію про вашу компанію', 'mappers' ); ?></div>
				<label class="mappers-form-block">
					<span class="mappers-form-block-title"><?php esc_html_e( 'Назва', 'mappers' ); ?></span>
					<span class="mappers-input-block">
						<input type="text" class="mappers-input" name="company" required>
					</span>
				</label>
				<label class="mappers-form-block">
					<span class="mappers-form-block-title"><?php esc_html_e( 'Назва', 'mappers' ); ?></span>
					<span class="mappers-input-block">
						<input type="text" class="mappers-input" name="company" required>
					</span>
				</label>
				<label class="mappers-form-block">
					<span class="mappers-form-block-title"><?php esc_html_e( 'Адреса в Google Map', 'mappers' ); ?></span>
					<span class="mappers-input-block">
						<input type="text" class="mappers-input" name="address" required>
					</span>
				</label>
				<label class="mappers-form-block">
					<span class="mappers-form-block-title"><?php esc_html_e( 'Посилання на профіль в Google Map', 'mappers' ); ?></span>
					<span class="mappers-input-block">
						<input type="url" class="mappers-input" name="google_map" required>
					</span>
				</label>
			</form>
		</div>
	</div>
</div>
