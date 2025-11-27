<?php
/**
 * Logo
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<?php
	$mappers_logo      = $args['logo'] ?? carbon_get_theme_option( 'mappers_logo' );
	$mappers_logo_desc = carbon_get_theme_option( 'mappers_logo_desc' );
if ( $mappers_logo ) :
	?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="mappers-logo" aria-label="<?php esc_attr_e( 'Home', 'mappers' ); ?>">
	<?php echo wp_get_attachment_image( $mappers_logo, 'full' ); ?>
	<?php if ( $mappers_logo_desc ) : ?>
	<span class="mappers-logo-desc">
		<?php echo esc_html( $mappers_logo_desc ); ?>
	</span>
	<?php endif; ?>
</a>
<?php endif; ?>
