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
<main class="mappers-page-main">
	<div class="mappers-container">
		<h1 class="mappers-page-title mappers-h1">
			<?php the_title(); ?>
		</h1>
	</div>
	<div class="mappers-page-content mappers-content-text">
		<?php the_content(); ?>
	</div>
</main>
<?php
get_footer();
