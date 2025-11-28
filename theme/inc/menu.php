<?php
/**
 * Menu functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'after_setup_theme',
	function () {
		register_nav_menus(
			array(
				'mappers_header' => esc_html__( 'Шапка', 'mappers' ),
				'mappers_rules'  => esc_html__( 'Правила', 'mappers' ),
			)
		);
	}
);
