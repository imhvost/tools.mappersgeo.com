<?php
/**
 * Audit functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_enqueue_scripts',
	function () {
		if ( 'page-audit.php' !== basename( get_page_template() ) ) {
			return;
		}

		if ( file_exists( get_template_directory() . '/audit-quiz/app.js' ) ) {
			wp_enqueue_script(
				'mappers-vue-spa',
				get_template_directory_uri() . '/audit-quiz/app.js',
				array(),
				filemtime( get_template_directory() . '/audit-quiz/app.js' ),
				true
			);
		}

		if ( file_exists( get_template_directory() . '/audit-quiz/app.css' ) ) {
			wp_enqueue_style(
				'mappers-vue-spa',
				get_template_directory_uri() . '/audit-quiz/app.css',
				array(),
				filemtime( get_template_directory() . '/audit-quiz/app.css' ),
			);
		}
	}
);
