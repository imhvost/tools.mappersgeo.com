<?php
/**
 * Logo
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$logo = get_theme_mod( 'custom_logo' );
?>
<?php
if ( $logo ) :

	?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="mappers-logo" aria-label="<?php esc_attr_e( 'Додому', 'mappers' ); ?>">
	<?php echo wp_get_attachment_image( $logo, 'full' ); ?>
</a>
<?php endif; ?>
