<?php
/**
 * Index page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<?php get_header(); ?>
<?php the_post(); ?>

<?php
get_footer();
