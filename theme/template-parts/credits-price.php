<?php
/**
 * Сredits price
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$mappers_credit_price = (int) carbon_get_theme_option( 'mappers_credit_price' );
$mappers_currency     = carbon_get_theme_option( 'mappers_currency' );

?>
<div class="mappers-credits-price">
	<div class="mappers-credits-price-item">
		<span>1</span>
		<svg class="mappers-icon"><use xlink:href="#icon-credits"/></svg>
	</div>
	<div class="mappers-credits-price-divider">=</div>
	<div class="mappers-credits-price-cost">
		<span><?php echo esc_html( $mappers_credit_price ); ?></span>
		<span><?php echo esc_html( $mappers_currency ); ?></span>
	</div>
</div>
