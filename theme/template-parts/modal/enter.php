<?php
/**
 * Modal auth enter
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$google_auth_url = mappers_get_google_auth_url();
?>
<div id="mappers-modal-enter" class="mappers-modal mappers-modal-enter">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<form action="?" class="mappers-login-form mappers-modal-form" data-action="enter">
				<?php get_template_part( 'template-parts/form', 'notifications' ); ?>
				<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Вхід', 'mappers' ); ?></div>
				<div class="mappers-form-inputs">
					<label class="mappers-form-block">
						<span class="mappers-form-block-title"><?php esc_html_e( 'Електронна пошта', 'mappers' ); ?></span>
						<input type="email" class="mappers-input" name="email" placeholder="<?php esc_attr_e( 'Введіть електронну пошта', 'mappers' ); ?>" required>
					</label>
					<label class="mappers-form-block">
						<span class="mappers-form-block-title"><?php esc_html_e( 'Ваш пароль', 'mappers' ); ?></span>
						<span class="mappers-input-block mappers-input-block-password">
							<input type="password" class="mappers-input" name="password" placeholder="<?php esc_attr_e( 'Введіть пароль', 'mappers' ); ?>" required>
							<button type="button" class="mappers-password-toggle" aria-label="<?php esc_attr_e( 'Показати/сховати пароль', 'mappers' ); ?>">
								<svg class="mappers-icon"><use xlink:href="#icon-eye"/></svg>
								<svg class="mappers-icon"><use xlink:href="#icon-eye-slash"/></svg>
							</button>
						</span>
					</label>
					<button type="button" class="mappers-login-form-change-btn mappers-modal-form-forgot-password" data-modal-toggle="mappers-modal-forgot-password">
						<?php esc_html_e( 'Забули пароль?', 'mappers' ); ?>
					</button>
				</div>
				<?php get_template_part( 'template-parts/form', 'rules' ); ?>
				<div class="mappers-form-btns">
					<button type="submit" class="mappers-modal-form-submit mappers-btn"><?php esc_html_e( 'Увійти', 'mappers' ); ?></button>
					<div class="mappers-form-btns-divider"><?php esc_html_e( 'Або', 'mappers' ); ?></div>
					<?php if ( $google_auth_url ) : ?>
					<button
						type="button"
						class="mappers-google-auth-btn mappers-btn mappers-btn-white-border"
						data-url="<?php echo esc_url( $google_auth_url ); ?>"
					>
						<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/google-logo.svg" alt="<?php esc_attr_e( 'Логотип Google', 'mappers' ); ?>">
						<span><?php esc_html_e( 'Увійти за допомогою Google', 'mappers' ); ?></span>
					</button>
					<?php endif; ?>
				</div>
				<div class="mappers-login-form-change">
					<div class="mappers-login-form-change-title"><?php esc_html_e( 'Ще не зареєстровані?', 'mappers' ); ?></div>
					<button type="button" class="mappers-login-form-change-btn" data-modal-toggle="mappers-modal-registration"><?php esc_html_e( 'Зареєструватися', 'mappers' ); ?></button>
				</div>
			</form>
		</div>
	</div>
</div>
