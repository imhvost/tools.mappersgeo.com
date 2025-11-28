<?php
/**
 * Modal auth forgot password
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$back_btn = $args['back_btn'] ?? false;
?>
<div id="mappers-modal-forgot-password" class="mappers-modal mappers-modal-forgot-password">
	<div tabindex="-1" class="mappers-modal-wrapp">
		<div role="dialog" aria-modal="true" class="mappers-modal-body">
			<button type="button" class="mappers-modal-close-btn" data-modal-close aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
			<form action="?" class="mappers-login-form mappers-modal-form" data-action="forgot_password">
				<?php get_template_part( 'template-parts/form', 'notifications' ); ?>
				<?php if ( $back_btn ) : ?>
					<button type="button" class="mappers-login-form-change-btn mappers-modal-form-back" data-modal-toggle="mappers-modal-enter" aria-label="<?php esc_html_e( 'Назад', 'mappers' ); ?>">
						<svg class="mappers-icon"><use xlink:href="#icon-arrow-left"/></svg>
					</button>
				<?php endif; ?>
				<div class="mappers-modal-head">
					<div class="mappers-modal-title mappers-h2"><?php esc_html_e( 'Відновлення пароля', 'mappers' ); ?></div>
					<div class="mappers-modal-form-desc">
						<?php esc_html_e( 'Вкажіть email, який використовувався при реєстрації, і ми надішлемо на нього листа для зміни пароля.', 'mappers' ); ?>
					</div>
				</div>
				<label class="mappers-form-block">
					<span class="mappers-form-block-title"><?php esc_html_e( 'Електронна пошта', 'mappers' ); ?></span>
					<input type="email" class="mappers-input" name="email" placeholder="<?php esc_attr_e( 'Введіть електронну пошта', 'mappers' ); ?>" required>
				</label>
				<button type="submit" class="mappers-modal-form-submit mappers-btn"><?php esc_html_e( 'Надіслати', 'mappers' ); ?></button>
			</form>
		</div>
	</div>
</div>
