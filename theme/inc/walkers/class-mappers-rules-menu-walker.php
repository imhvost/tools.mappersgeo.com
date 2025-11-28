<?php
/**
 * Mappers_Rules_Menu_Walker walkers
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Custom walker to output nav menu without <ul> or <li> tags.
 */
class Mappers_Rules_Menu_Walker extends Walker_Nav_Menu {
	/**
	 * Disable opening submenu <ul> tag.
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param int    $depth  Depth of menu item. Used for padding.
	 * @param array  $args   An array of arguments. @see wp_nav_menu().
	 */
	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		// Disable <ul>
	}

	/**
	 * Disable closing submenu </ul> tag.
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param int    $depth  Depth of menu item. Used for padding.
	 * @param array  $args   An array of arguments. @see wp_nav_menu().
	 */
	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		// Disable </ul>
	}

	/**
	 * Start the output for an individual menu item as a plain link.
	 *
	 * @param string  $output Passed by reference. Used to append additional content.
	 * @param WP_Post $item   Menu item data object.
	 * @param int     $depth  Depth of menu item. Used for padding.
	 * @param array   $args   An array of arguments. @see wp_nav_menu().
	 * @param int     $id     Menu item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		$output .= '<a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a>';
		if ( isset( $args->after ) && ! empty( $args->after ) ) {
			$output .= $args->after;
		}
	}

	/**
	 * End the output of a menu item.
	 *
	 * @param string  $output Passed by reference. Used to append additional content.
	 * @param WP_Post $item   Page data object. Not used.
	 * @param int     $depth  Depth of page. Not Used.
	 * @param array   $args   An array of arguments. @see wp_nav_menu().
	 */
	public function end_el( &$output, $item, $depth = 0, $args = array() ) {
		// No closing tag needed
	}
}
