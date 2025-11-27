<?php
/**
 * Slider Nav
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="mappers-slider-nav">
	<button class="mappers-slider-arrow mappers-slider-arrow-prev mappers-btn" aria-label="<?php esc_attr_e( 'Prev', 'mappers' ); ?>">
		<svg class="mappers-icon"><use xlink:href="#icon-arrow-left"/></svg>
	</button>
	<button class="mappers-slider-arrow mappers-slider-arrow-next mappers-btn" aria-label="<?php esc_attr_e( 'Next', 'mappers' ); ?>">
		<svg class="mappers-icon"><use xlink:href="#icon-arrow-right"/></svg>
	</button>
</div>
