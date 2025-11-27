<?php
/**
 * Profile page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Profile
	Template Post Type: page
*/

?>
<?php get_header(); ?>
<?php the_post(); ?>
<?php
get_footer();
