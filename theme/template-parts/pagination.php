<?php
/**
 * Pagination
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

	$current       = $args['current'] ?? 1;
	$max_num_pages = $args['max_num_pages'] ?? 1;
	$base_url      = $args['base_url'] ?? '';
	$add_args      = $args['add_args'] ?? array();

if ( ! $base_url ) {
	$base_url = get_the_permalink();
}

$pagination = paginate_links(
	array(
		'base'      => trailingslashit( $base_url ) . 'page/%#%/',
		'prev_next' => true,
		'end_size'  => 1,
		'mid_size'  => 1,
		'current'   => $current,
		'total'     => $max_num_pages,
		'type'      => 'list',
		'prev_text' => '<svg class="mappers-icon"><use xlink:href="#icon-arrow-left"/></svg><div>' . __( 'Назад', 'mappers' ) . '</div>',
		'next_text' => '<div>' . __( 'Вперед', 'mappers' ) . '</div><svg class="mappers-icon"><use xlink:href="#icon-arrow-right"/></svg>',
		'add_args'  => $add_args,
	)
);

if ( $pagination ) {
	echo wp_kses(
		str_replace( '/page/1/', '/', $pagination ),
		mappers_allow_svg_in_kses()
	);
}
