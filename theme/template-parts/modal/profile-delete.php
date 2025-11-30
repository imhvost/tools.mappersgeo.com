<?php
/**
 * Modal profile delete
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div id="mappers-modal-profile-delete" class="mappers-modal mappers-modal-profile-delete">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<div class="mappers-modal-profile-delete-tab mappers-tab-block mappers-active">
				<div class="mappers-modal-head">
					<div class="mappers-modal-title mappers-h2">
						<?php esc_html_e( 'Ви впевнені що бажаєте видалити профіль?', 'mappers' ); ?>
					</div>
					<div class="mappers-modal-desc">
						<?php esc_html_e( 'Видалення профілю призведе до видалення всіх даних, пов’язаних із вашим профілем.', 'mappers' ); ?>
					</div>
				</div>
				<div class="mappers-modal-btns">
					<button
						type="button"
						class="mappers-profile-delete-submit mappers-btn mappers-btn-gray"
					>
						<?php esc_html_e( 'Підтверджую', 'mappers' ); ?>
					</button>
					<button type="button" class="mappers-btn" data-modal-close>
						<?php esc_html_e( 'Назад', 'mappers' ); ?>
					</button>
				</div>
			</div>
			<div class="mappers-modal-profile-delete-tab mappers-tab-block">
				<div class="mappers-modal-title mappers-h2">
					<?php esc_html_e( 'Акаунт успішно видалено', 'mappers' ); ?>
				</div>
				<div class="mappers-modal-btns">
					<button type="button" class="mappers-btn" data-modal-close>
						<?php esc_html_e( 'Ок', 'mappers' ); ?>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
