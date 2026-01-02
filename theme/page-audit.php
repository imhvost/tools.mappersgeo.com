<?php
/**
 * Audit page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Audit
	Template Post Type: page
*/

$fields = mappers_check_text_fields(
	array( 'id' ),
	false,
	'GET',
	false
);

if ( ! $fields['id'] ) {
	mappers_force_404();
}

$audits = get_posts(
	array(
		'post_type'      => 'mappers-audit',
		'post_status'    => array( 'draft', 'publish' ),
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'meta_query'     => array(
			array(
				'key'   => '_mappers_id',
				'value' => $fields['id'],
			),
		),
	)
);

if ( ! $audits ) {
	mappers_force_404();
}

?>
<?php get_header(); ?>
<main id='app' class="mappers-main"></main>
<?php
get_footer();
