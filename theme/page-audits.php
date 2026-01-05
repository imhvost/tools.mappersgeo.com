<?php
/**
 * Audits page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Audits
	Template Post Type: page
*/

$user_id = get_current_user_id();

$user_credits = 0;
if ( $user_id ) {
	$user_credits = (int) carbon_get_user_meta( $user_id, 'mappers_credits' );
}

$current_page = get_query_var( 'paged' ) ? intval( get_query_var( 'paged' ) ) : 1;

$fields = mappers_check_text_fields(
	array( 'search' ),
	false,
	'GET',
);

$args = array(
	'post_type'      => 'mappers-audit',
	'post_status'    => array( 'draft', 'publish' ),
	'posts_per_page' => 16,
	'fields'         => 'ids',
	's'              => $fields['search'],
	'sentence'       => true,
	'paged'          => $current_page,
	'base_url'       => get_the_permalink(),
	'meta_query'     => array(
		array(
			'key'   => '_mappers_user|||0|id',
			'value' => $user_id,
		),
	),
);

$mappers_audit_types = carbon_get_the_post_meta( 'mappers_audit_types' );

?>
<?php get_header(); ?>
<main class="mappers-main">
	<div class="mappers-container">
		<div class="mappers-audits-main mappers-widget">
			<div class="mappers-widget-head">
				<h1 class="mappers-widget-title mappers-h2">
					<?php the_title(); ?>
				</h1>
				<?php if ( $mappers_audit_types ) : ?>
					<div class="mappers-audits-btns">
						<?php foreach ( $mappers_audit_types as $key => $item ) : ?>
							<button
								class="mappers-audits-btn mappers-btn <?php echo 0 === $key % 2 ? 'mappers-btn-border' : ''; ?>"
								<?php if ( $user_id ) : ?>
									<?php if ( $user_credits && $user_credits >= (int) ( $item['price'] ?? 0 ) ) : ?>
										<?php if ( 'self' === $item['name'] ) : ?>
											data-action="start"
											data-type="self"
											data-btn-text="<?php esc_attr_e( 'Почати аудит', 'mappers' ); ?>"
										<?php endif; ?>
										<?php if ( 'pro' === $item['name'] ) : ?>
											data-action="start"
											data-type="pro"
											data-btn-text="<?php esc_attr_e( 'Замовити', 'mappers' ); ?> <?php echo esc_attr( $item['title'] ); ?>"
										<?php endif; ?>
									<?php else : ?>
										data-action="credits"
									<?php endif; ?>
								<?php else : ?>
									data-action="registration"
								<?php endif; ?>
							>
								<?php if ( $item['price'] ) : ?>
									<span class="mappers-audits-btn-cost">
										<span><?php echo esc_html( $item['price'] ); ?></span>
										<svg class="mappers-icon"><use xlink:href="#icon-credits" /></svg>
									</span>
								<?php endif; ?>
								<span>
									<?php esc_html_e( 'Замовити', 'mappers' ); ?>
									<?php echo esc_html( $item['title'] ); ?>
								</span>
							</button>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>
			<div class="mappers-audits">
				<?php get_template_part( 'template-parts/audits', '', array( 'query_args' => $args ) ); ?>
			</div>
		</div>
		<?php
			$childs = get_posts(
				array(
					'post_type'      => 'page',
					'posts_per_page' => -1,
					'post_parent'    => $post->ID,
					'fields'         => 'ids',
				)
			);
			if ( $childs ) :
				?>
			<div class="mappers-audits-childs">
				<?php
				foreach ( $childs as $item ) :
					$excerpt = mappers_get_excerpt( $item, 100 );
					?>
					<div class="mappers-audits-child mappers-widget">
						<?php if ( has_post_thumbnail( $item ) ) : ?>
							<a href="<?php echo esc_url( get_the_post_thumbnail_url( $item, 'full' ) ); ?>" class="mappers-audits-child-img mappers-cover-img glightbox" data-gallery="mappers-audits-child-<?php echo esc_attr( $item ); ?>">
								<?php echo get_the_post_thumbnail( $item, 'full' ); ?>
								<i>
									<svg class="mappers-icon"><use xlink:href="#icon-zoom"/></svg>
								</i>
							</a>
						<?php endif; ?>
						<div class="mappers-audits-child-body">
							<div class="mappers-widget-title mappers-h2">
								<?php echo esc_html( get_the_title( $item ) ); ?>
							</div>
							<?php if ( $excerpt ) : ?>
								<div class="mappers-widget-desc">
									<?php echo esc_html( $excerpt ); ?>
								</div>
							<?php endif; ?>
							<a href="<?php echo esc_url( get_the_permalink( $item ) ); ?>" class="mappers-widget-link">
								<span><?php echo esc_html_e( 'Дізнатись більше', 'mappers' ); ?></span>
								<svg class="mappers-icon"><use xlink:href="#icon-arrow-link"/></svg>
							</a>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</main>
<?php
if ( $user_id ) {
	get_template_part( 'template-parts/modal/audit', 'start', array( 'google_map_info' => carbon_get_the_post_meta( 'mappers_google_map_info' ) ) );
	get_template_part( 'template-parts/modal/audit', 'sent', );
	get_template_part( 'template-parts/modal/credits', 'end', );
}
?>
<?php
get_footer();
