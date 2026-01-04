<?php
/**
 * Social link
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$social_link = $args['social_link'] ?? null;

if ( $social_link ) :
	?>
<a
	href="<?php echo esc_attr( $social_link['link'] ); ?>"
	aria-label="<?php echo esc_attr( $social_link['name'] ); ?>"
	target="_blank"
	class="mappers-social-link mappers-content-custom-link"
>
	<svg class="mappers-icon"><use xlink:href="#icon-<?php echo esc_attr( $social_link['name'] ); ?>"/></svg>
</a>
<?php endif; ?>
