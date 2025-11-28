<?php
/**
 * Modal password recovery
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div id="mappers-modal-password-recovery" class="mappers-modal mappers-modal-password-recovery">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<form action="?" class="mappers-password-recovery-form mappers-modal-form" >
				<?php get_template_part( 'template-parts/form', 'notifications' ); ?>
				<div class="mappers-modal-form-title mappers-h2"><?php esc_html_e( 'Відновлення пароля', 'mappers' ); ?></div>
				<div class="mappers-form-inputs">
					<label class="mappers-form-block">
						<span class="mappers-form-block-title"><?php esc_html_e( 'Новий пароль', 'mappers' ); ?></span>
						<span class="mappers-input-block mappers-input-block-password">
							<input type="password" class="mappers-input" name="password" placeholder="<?php esc_attr_e( 'Введіть новий пароль', 'mappers' ); ?>" required>
							<button type="button" class="mappers-password-toggle" aria-label="<?php esc_attr_e( 'Показати/сховати пароль', 'mappers' ); ?>">
								<svg class="mappers-icon"><use xlink:href="#icon-eye"/></svg>
								<svg class="mappers-icon"><use xlink:href="#icon-eye-slash"/></svg>
							</button>
						</span>
					</label>
					<label class="mappers-form-block">
						<span class="mappers-form-block-title"><?php esc_html_e( 'Підтвердження пароля', 'mappers' ); ?></span>
						<span class="mappers-input-block mappers-input-block-password">
							<input type="password" class="mappers-input" name="password_repeat" placeholder="<?php esc_attr_e( 'Введіть підтвердження пароля', 'mappers' ); ?>" required>
							<button type="button" class="mappers-password-toggle" aria-label="<?php esc_attr_e( 'Показати/сховати пароль', 'mappers' ); ?>">
								<svg class="mappers-icon"><use xlink:href="#icon-eye"/></svg>
								<svg class="mappers-icon"><use xlink:href="#icon-eye-slash"/></svg>
							</button>
						</span>
					</label>
				</div>
				<button type="submit" class="mappers-modal-form-submit mappers-btn"><?php esc_html_e( 'Надіслати', 'mappers' ); ?></button>
			</form>
		</div>
	</div>
</div>
