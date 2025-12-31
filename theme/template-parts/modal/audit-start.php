<?php
/**
 * Modal audit start
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$google_map_info = $args['google_map_info'] ?? '';
?>
<div id="mappers-modal-audit-start" class="mappers-modal mappers-modal-audit-start">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<form action="?" class="mappers-audit-start-form mappers-modal-form">
				<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Заповніть інформацію про вашу компанію', 'mappers' ); ?></div>
				<div class="mappers-audit-start-form-inputs">
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
				</div>
				<?php if ( $google_map_info ) : ?>
					<div class="mappers-audit-start-form-google-map-info">
						<div class="mappers-audit-start-form-google-map-info-title">
							<?php esc_html_e( 'Де взяти посилання на профіль в Google Map', 'mappers' ); ?>
						</div>
						<div class="mappers-audit-start-form-google-map-info-img">
							<?php echo wp_get_attachment_image( $google_map_info, 'full' ); ?>
						</div>
					</div>
				<?php endif; ?>
				<button type="submit" class="mappers-audit-start-submit mappers-btn"></button>
			</form>
		</div>
	</div>
</div>
