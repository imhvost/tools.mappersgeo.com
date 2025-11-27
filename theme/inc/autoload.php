<?php
/**
 * Autoloaders functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load walkers
 */
$walkers_dir = get_template_directory() . '/inc/walkers/';
foreach ( glob( $walkers_dir . '*.php' ) as $item ) {
	require_once $item;
}

/**
 * Autoloader for Mappers_* classes
 */
spl_autoload_register(
	function ( $classname ) {
		if ( strpos( $classname, 'Mappers_' ) !== 0 ) {
				return;
		}

		$path = get_template_directory() . '/inc/classes/class-' . strtolower( str_replace( '_', '-', $classname ) ) . '.php';

		if ( file_exists( $path ) ) {
			require_once $path;
		}
	}
);
