<?php
/**
 * Header
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$mappers_logo       = carbon_get_theme_option( 'mappers_logo' );
$mappers_header_tel = carbon_get_theme_option( 'mappers_header_tel' );

$credits = new Mappers_Credits( get_current_user_id() );

$fields = mappers_check_text_fields(
	array( 'print' ),
	false,
	'GET',
	false
);

$html_class = array();

if ( $fields['print'] ) {
	$html_class[] = 'mappers-print';
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="<?php echo esc_attr( implode( ' ', $html_class ) ); ?>">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<link rel="preload" href="<?php echo esc_url( get_template_directory_uri() ); ?>/fonts/Montserrat-VariableFont_wght.woff2" as="font" type="font/woff2" crossorigin>
	<?php wp_site_icon(); ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php get_template_part( 'template-parts/sprite' ); ?>
<header class="mappers-header">
	<div class="mappers-container">
		<?php get_template_part( 'template-parts/logo', '', array( 'logo' => $mappers_logo ) ); ?>
		<nav id="mappers-header-nav" class="mappers-modal mappers-header-nav">
			<div tabindex="-1" class="mappers-modal-wrapp">
				<div role="dialog" aria-modal="true" class="mappers-modal-body">
					<?php
					if ( has_nav_menu( 'mappers_header' ) ) {
						wp_nav_menu(
							array(
								'theme_location' => 'mappers_header',
								'container'      => false,
								'menu_class'     => 'mappers-header-menu',
								'link_before'    => '<span>',
								'link_after'     => '</span><svg class="mappers-icon"><use xlink:href="#icon-chevron-down"/></svg>',
							)
						);
					}

					?>
					<div class="mappers-header-btns">
						<?php
							$credits_page_id = mappers_get_page_id_by_template( 'page-credits.php' );
						if ( $credits_page_id ) :

							?>
							<a href="<?php echo esc_url( get_the_permalink( $credits_page_id ) ); ?>" class="mappers-header-btn-with-icon">
								<i>
									<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
								</i>
								<span>
									<?php echo esc_html( $credits->get_credits() ); ?>
								</span>
							</a>
						<?php endif; ?>
						<div class="mappers-header-cabinet">
							<?php if ( is_user_logged_in() ) : ?>
								<?php
									$profile_page_id = mappers_get_page_id_by_template( 'page-profile.php' );
								if ( $profile_page_id ) :
									?>
									<a href="<?php echo esc_url( get_the_permalink( $profile_page_id ) ); ?>" class="mappers-header-btn-cabinet mappers-btn">
										<svg class="mappers-icon"><use xlink:href="#icon-cabinet"/></svg>
										<span>
										<?php echo esc_html_e( 'Профіль', 'mappers' ); ?>
										</span>
									</a>
									
								<?php endif; ?>
								<a href="<?php echo esc_url( wp_logout_url( home_url( '/' ) ) ); ?>" class="mappers-header-logout" aria-label="<?php esc_attr_e( 'Вийти з профілю', 'mappers' ); ?>">
									<svg class="mappers-icon"><use xlink:href="#icon-logout"/></svg>
								</a>
							<?php else : ?>
								<button type="button" class="mappers-header-btn-cabinet mappers-btn" data-modal-open="mappers-modal-registration">
									<svg class="mappers-icon"><use xlink:href="#icon-cabinet"/></svg>
									<span>
										<?php echo esc_html_e( 'Профіль', 'mappers' ); ?>
									</span>
								</button>
							<?php endif; ?>
						</div>
				</div>
			</div>
		</nav>
		<?php if ( has_nav_menu( 'mappers_header' ) ) : ?>
			<button type="button" class="mappers-header-nav-toggle mappers-visible-tablet" aria-label="<?php esc_attr_e( 'Меню', 'mappers' ); ?>">
				<svg class="mappers-icon"><use xlink:href="#icon-menu"/></svg>
				<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
			</button>
		<?php endif; ?>
	</div>
</header>
