<?php
/**
 * Rewrite rules
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'init',
	function () {
		$profile_page_id   = mappers_get_page_id_by_template( 'page-profile.php' );
		$profile_page_name = $profile_page_id ? get_page_uri( $profile_page_id ) : 'profile';

		if ( $profile_page_id ) {
			add_rewrite_rule(
				'^' . $profile_page_name . '/([^/]+)/?$',
				'index.php?page_id=' . $profile_page_id . '&profile_tab=$matches[1]',
				'top'
			);
		}
	}
);

add_filter(
	'query_vars',
	function ( $vars ) {
		$vars[] = 'profile_tab';
		return $vars;
	}
);
