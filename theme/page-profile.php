<?php
/**
 * Profile page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Profile
	Template Post Type: page
*/

$user_id = get_current_user_id();

$profile_tab = get_query_var( 'profile_tab' );

if ( $profile_tab && ! in_array( $profile_tab, array( 'password', 'delete' ), true ) && ! $show_form ) {
	mappers_force_404();
}

?>
<?php get_header(); ?>
<?php the_post(); ?>
<main class="mappers-page-main">
	<div class="mappers-container">
		<div class="mappers-profile-head mappers-page-title">
			<h1 class="mappers-profile-title mappers-h1">
				<?php the_title(); ?>
			</h1>
			<?php if ( $user_id ) : ?>
			<a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" class="mappers-btn mappers-btn-white-border mappers-profile-logout">
				<span><?php esc_html_e( 'Вийти', 'mappers' ); ?></span>
				<svg class="mappers-icon"><use xlink:href="#icon-logout"/></svg>
			</a>
			<?php endif; ?>
		</div>
		<?php if ( $user_id ) : ?>
			<div class="mappers-profile">
				<?php
					$nav = array(
						array(
							'href'  => '',
							'title' => 'Особисті дані',
							'icon'  => 'profile-info',
						),
						array(
							'href'  => 'Coming soon',
							'title' => __( 'Віджети', 'mappers' ),
							'icon'  => 'widget',
						),
						array(
							'href'  => 'password',
							'title' => __( 'Зміна пароля', 'mappers' ),
							'icon'  => 'profile-password',
						),
						array(
							'href'  => 'delete',
							'title' => __( 'Видалити профіль', 'mappers' ),
							'icon'  => 'trash',
						),
					);
					?>
				<nav class="mappers-profile-nav">
					<ul class="mappers-profile-menu">
						<?php foreach ( $nav as $item ) : ?>
							<li class="<?php echo $item['href'] === $profile_tab ? 'mappers-active' : ''; ?>">
								<?php if ( 'Coming soon' === $item['href'] ) : ?>
									<div class="mappers-profile-menu-link">
										<svg class="mappers-icon"><use xlink:href="#icon-<?php echo esc_attr( $item['icon'] ); ?>"/></svg>
										<span><?php echo esc_html( $item['title'] ); ?></span>
										<i>Coming soon</i>
									</div>
								<?php else : ?>
									<a href="<?php echo esc_url( get_the_permalink() . $item['href'] ); ?>" class="mappers-profile-menu-link">
										<svg class="mappers-icon"><use xlink:href="#icon-<?php echo esc_attr( $item['icon'] ); ?>"/></svg>
										<span><?php echo esc_html( $item['title'] ); ?></span>
									</a>
								<?php endif; ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</nav>
				<div class="mappers-profile-body">
					<?php if ( 'delete' === $profile_tab ) : ?>
						<div class="mappers-profile-delete">
							<div class="mappers-profile-delete-title mappers-h2">
								<?php esc_html_e( 'Видалити профіль', 'mappers' ); ?>
							</div>
							<div class="mappers-profile-delete-desc">
								<?php esc_html_e( 'Ви хочете видалити свій профіль?', 'mappers' ); ?>
								<?php esc_html_e( 'Видалення профілю призведе до видалення всіх даних, пов’язаних із вашим профілем.', 'mappers' ); ?>
							</div>
							<button type="button" class="mappers-profile-delete-btn mappers-btn mappers-btn-gray" data-modal-open="mappers-modal-profile-delete">
								<?php esc_attr_e( 'Я хочу видалити свій профіль', 'mappers' ); ?>
							</button>
						</div>
						<?php get_template_part( 'template-parts/modal/profile', 'delete' ); ?>
						<?php elseif ( 'password' === $profile_tab ) : ?>
							<form action="?" class="mappers-new-password-form">
								<?php get_template_part( 'template-parts/form', 'notifications' ); ?>
								<div class="mappers-form-inputs">
									<label class="mappers-form-block">
										<span class="mappers-form-block-title"><?php esc_html_e( 'Старий пароль', 'mappers' ); ?></span>
										<span class="mappers-input-block mappers-input-block-password">
											<input type="password" class="mappers-input" name="old_password" placeholder="<?php esc_attr_e( 'Введіть старий пароль', 'mappers' ); ?>" required>
											<button type="button" class="mappers-password-toggle" aria-label="<?php esc_attr_e( 'Показати/сховати пароль', 'mappers' ); ?>">
												<svg class="mappers-icon"><use xlink:href="#icon-eye"/></svg>
												<svg class="mappers-icon"><use xlink:href="#icon-eye-slash"/></svg>
											</button>
										</span>
									</label>
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
								</div>
								<button type="submit" class="las-new-password-form-submit mappers-btn">
									<?php esc_attr_e( 'Змінити пароль', 'mappers' ); ?>
								</button>
							</form>
							<?php
							else :
								$mappers_name     = carbon_get_user_meta( $user_id, 'mappers_name' );
								$mappers_tel      = carbon_get_user_meta( $user_id, 'mappers_tel' );
								$mappers_website  = carbon_get_user_meta( $user_id, 'mappers_website' );
								$mappers_telegram = carbon_get_user_meta( $user_id, 'mappers_telegram' );
								$mappers_facebook = carbon_get_user_meta( $user_id, 'mappers_facebook' );
								?>
							<form action="?" class="mappers-profile-form">
								<label class="mappers-form-block">
									<span class="mappers-form-block-title"><?php esc_html_e( "Ім'я та прізвище", 'mappers' ); ?></span>
									<input
										type="text"
										class="mappers-input"
										name="mappers_name"
										placeholder="<?php esc_attr_e( "Введіть ім'я та прізвище", 'mappers' ); ?>"
										value="<?php echo esc_attr( $mappers_name ); ?>"
										required
									>
								</label>
								<label class="mappers-form-block">
									<span class="mappers-form-block-title"><?php esc_html_e( 'Електронна пошта', 'mappers' ); ?></span>
									<input
										type="email"
										class="mappers-input"
										name="user_email"
										placeholder="<?php esc_attr_e( 'Введіть електронну пошта', 'mappers' ); ?>"
										value="<?php echo esc_attr( mappers_get_user_email( $user_id ) ); ?>"
										required
									>
								</label>
								<label class="mappers-form-block">
									<span class="mappers-form-block-title"><?php esc_html_e( 'Телефон', 'mappers' ); ?></span>
									<input
										type="tel"
										class="mappers-input"
										name="mappers_tel"
										placeholder="<?php esc_attr_e( 'Номер телефону', 'mappers' ); ?>"
										value="<?php echo esc_attr( $mappers_tel ); ?>"
										required
									>
								</label>
								<label class="mappers-form-block">
									<span class="mappers-form-block-title"><?php esc_html_e( 'Веб-сайт', 'mappers' ); ?></span>
									<input
										type="url"
										class="mappers-input"
										name="mappers_website"
										placeholder="<?php esc_attr_e( 'Введіть веб-сайт', 'mappers' ); ?>"
										value="<?php echo esc_attr( $mappers_website ); ?>"
									>
								</label>
								<label class="mappers-form-block">
									<span class="mappers-form-block-title"><?php esc_html_e( 'Telegram', 'mappers' ); ?></span>
									<input
										type="url"
										class="mappers-input"
										name="mappers_telegram"
										placeholder="<?php esc_attr_e( 'Введіть telegram', 'mappers' ); ?>"
										value="<?php echo esc_attr( $mappers_telegram ); ?>"
									>
								</label>
								<label class="mappers-form-block">
									<span class="mappers-form-block-title"><?php esc_html_e( 'Facebook', 'mappers' ); ?></span>
									<input
										type="url"
										class="mappers-input"
										name="mappers_facebook"
										placeholder="<?php esc_attr_e( 'Введіть facebook', 'mappers' ); ?>"
										value="<?php echo esc_attr( $mappers_facebook ); ?>"
									>
								</label>
								<button type="submit" class="mappers-modal-form-submit mappers-btn"><?php esc_html_e( 'Зберегти зміни', 'mappers' ); ?></button>
							</form>
					<?php endif; ?>
				</div>
			</div>
		<?php else : ?>
			<div class="mappers-profile-auth-btn">
				<button
					class="mappers-btn"
					data-modal-open="mappers-modal-registration"
				>
					<?php esc_html_e( 'Реєстрація / Авторизація', 'mappers' ); ?>
				</button>
			</div>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
