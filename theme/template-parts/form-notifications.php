<?php
/**
 * Form notifications
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$text = $args['text'] ?? '';
?>
<div class="mappers-form-notifications mappers-tab-block">
	<div class="mappers-form-notifications-text mappers-button-text"><?php echo esc_html( $text ); ?></div>
	<button type="button" class="mappers-form-notifications-close" aria-label="<?php esc_attr_e( 'Закрити', 'mappers' ); ?>">
		<svg class="mappers-icon"><use xlink:href="#icon-close"/></svg>
	</button>
</div>
