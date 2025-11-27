<?php
/**
 * Shortcodes
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode(
	'mappers_site_url',
	function () {
		return site_url();
	}
);

add_shortcode(
	'mappers_upload_dir_url',
	function () {
		return wp_get_upload_dir()['url'];
	}
);
