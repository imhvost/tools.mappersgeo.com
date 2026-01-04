<?php
/**
 * Footer
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$mappers_footer_logo = carbon_get_theme_option( 'mappers_footer_logo' );
$mappers_offices     = carbon_get_theme_option( 'mappers_offices' );
$mappers_tels        = carbon_get_theme_option( 'mappers_tels' );
$mappers_tels        = preg_split( '/\r\n|\r|\n/', $mappers_tels );
$mappers_emails      = carbon_get_theme_option( 'mappers_emails' );
$mappers_emails      = preg_split( '/\r\n|\r|\n/', $mappers_emails );
$mappers_viber       = carbon_get_theme_option( 'mappers_viber' );
$mappers_telegram    = carbon_get_theme_option( 'mappers_telegram' );
$mappers_whatsapp    = carbon_get_theme_option( 'mappers_whatsapp' );
$mappers_youtube     = carbon_get_theme_option( 'mappers_youtube' );
$mappers_linkedin    = carbon_get_theme_option( 'mappers_linkedin' );
$mappers_facebook    = carbon_get_theme_option( 'mappers_facebook' );
$mappers_instagram   = carbon_get_theme_option( 'mappers_instagram' );
$mappers_tiktok      = carbon_get_theme_option( 'mappers_tiktok' );
$mappers_trustpilot  = carbon_get_theme_option( 'mappers_trustpilot' );
$mappers_copyright   = carbon_get_theme_option( 'mappers_copyright' );

?>
<footer class="mappers-footer">
	<div class="mappers-container">
		<div class="mappers-footer-body">
			<?php if ( $mappers_offices ) : ?>
				<div class="mappers-footer-cell mappers-footer-cell-offices">
					<div class="mappers-footer-cell-title">
						<?php esc_html_e( 'Наші Офіси', 'mappers' ); ?>
					</div>
					<div class="mappers-footer-offices">
						<?php foreach ( $mappers_offices as $item ) : ?>
							<div class="mappers-footer-office">
								<svg class="mappers-icon"><use xlink:href="#icon-location"/></svg>
								<div class="mappers-footer-office-text">
									<?php echo wp_kses_post( nl2br( $item['office'] ) ); ?>
								</div>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
			<?php if ( $mappers_tels || $mappers_emails || $mappers_viber || $mappers_telegram || $mappers_whatsapp ) : ?>
				<div class="mappers-footer-cell mappers-footer-cell-contacts">
					<div class="mappers-footer-cell-title">
						<?php esc_html_e( 'Контакти', 'mappers' ); ?>
					</div>
					<?php if ( $mappers_tels || $mappers_emails ) : ?>
						<div class="mappers-footer-contacts">
							<?php
							if ( $mappers_tels ) :
								foreach ( $mappers_tels as $item ) :
									?>
								<a href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $item ) ); ?>" class="mappers-footer-contact-link">
									<svg class="mappers-icon"><use xlink:href="#icon-phone"/></svg>
									<span><?php echo esc_html( $item ); ?></span>
								</a>
									<?php
									endforeach;
								endif;
							?>
							<?php
							if ( $mappers_emails ) :
								foreach ( $mappers_emails as $item ) :
									?>
								<a href="mailto:<?php echo esc_attr( $item ); ?>" class="mappers-footer-contact-link" target="_blank">
									<svg class="mappers-icon"><use xlink:href="#icon-mail"/></svg>
									<span><?php echo esc_html( $item ); ?></span>
								</a>
									<?php
									endforeach;
								endif;
							?>
						</div>
					<?php endif; ?>
					<?php if ( $mappers_viber || $mappers_telegram || $mappers_whatsapp ) : ?>
						<div class="mappers-social-links">
							<?php
							$social_links = array(
								'viber'    => $mappers_viber,
								'telegram' => $mappers_telegram,
								'whatsapp' => $mappers_whatsapp,
							);
							foreach ( $social_links as $key => $item ) {
								if ( $item ) {
									get_template_part(
										'template-parts/social',
										'link',
										array(
											'social_link' => array(
												'link' => $item,
												'name' => $key,
											),
										)
									);
								}
							}
							?>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>
			<?php if ( $mappers_youtube || $mappers_linkedin || $mappers_facebook || $mappers_instagram || $mappers_tiktok || $mappers_trustpilot ) : ?>
				<div class="mappers-footer-cell mappers-footer-cell-social">
					<div class="mappers-footer-cell-title">
						<?php esc_html_e( 'Слідкуйте за Mappers GEO!', 'mappers' ); ?>
					</div>
					<?php if ( $mappers_youtube || $mappers_linkedin || $mappers_facebook || $mappers_instagram || $mappers_tiktok ) : ?>
						<div class="mappers-social-links">
							<?php
							$social_links = array(
								'youtube'   => $mappers_youtube,
								'linkedin'  => $mappers_linkedin,
								'facebook'  => $mappers_facebook,
								'instagram' => $mappers_instagram,
								'tiktok'    => $mappers_tiktok,
							);
							foreach ( $social_links as $key => $item ) {
								if ( $item ) {
									get_template_part(
										'template-parts/social',
										'link',
										array(
											'social_link' => array(
												'link' => $item,
												'name' => $key,
											),
										)
									);
								}
							}
							?>
						</div>
					<?php endif; ?>
					<?php if ( $mappers_trustpilot ) : ?>
						<div class="mappers-trustpilot">
							<?php
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
								echo $mappers_trustpilot;
							?>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
		<div class="mappers-foot">
			<div class="mappers-foot-logo">
				<?php get_template_part( 'template-parts/logo', '', array( 'logo' => $mappers_footer_logo ) ); ?>
				<?php if ( $mappers_copyright ) : ?>
					<div class="mappers-foot-copyright">
						<?php echo esc_html( str_replace( '{Y}', gmdate( 'Y' ), $mappers_copyright ) ); ?>
					</div>
				<?php endif; ?>
			</div>
			<?php
			if ( has_nav_menu( 'mappers_footer' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'mappers_footer',
						'container'      => false,
						'menu_class'     => 'mappers-footer-menu',
					)
				);
			}
			?>
		</div>
	</div>
</footer>
<?php
	$fields = mappers_check_text_fields(
		array( 'modal' ),
		false,
		'GET'
	);

	$allowed_modals = array(
		'password-recovery' => false,
	);

	if ( $fields['modal'] ) {
		if ( in_array( $fields['modal'], array_keys( $allowed_modals ), true ) ) {
			$is_need_auth = $allowed_modals[ $fields['modal'] ];
			if ( $is_need_auth ) {
				if ( is_user_logged_in() ) {
					get_template_part( 'template-parts/modal/' . $fields['modal'] );
				}
			} else {
				get_template_part( 'template-parts/modal/' . $fields['modal'] );
			}
		}
	}

	if ( ! is_user_logged_in() || is_super_admin() ) {
		get_template_part( 'template-parts/modal/registration' );
		get_template_part( 'template-parts/modal/enter' );
		get_template_part( 'template-parts/modal/forgot', 'password', array( 'back_btn' => true ) );
	}

	?>
<?php wp_footer(); ?>
</body>
</html>
