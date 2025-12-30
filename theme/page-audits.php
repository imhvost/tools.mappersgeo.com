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

$audits = array();

if ( $user_id ) {
	$audits = get_posts(
		array(
			'post_type'      => 'mappers-audit',
			'post_status'    => array( 'draft', 'publish' ),
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'meta_query'     => array(
				'relation' => 'OR',
				array(
					'key'   => '_mappers_user|||0|id',
					'value' => $user_id,
				),
			),
		)
	);
}


$mappers_audit_types = carbon_get_the_post_meta( 'mappers_audit_types' );
$credits_page_id     = mappers_get_page_id_by_template( 'page-credits.php' );

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
									<?php if ( $user_credits && $user_credits >= (int) $item['price'] ) : ?>
										<?php if ( 'self' === $item['name'] ) : ?>
											data-action="start"
											data-type="self"
											data-btn-text="<?php esc_attr_e( 'Почати аудит', 'mappers' ); ?>"
										<?php endif; ?>
										<?php if ( 'pro' === $item['name'] ) : ?>
											data-action="start"
											data-type="pro"
											data-btn-text="<?php esc_attr_e( 'Почати аудит', 'mappers' ); ?>"
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
		</div>
	</div>
</main>
<?php
if ( $user_id ) {
	get_template_part( 'template-parts/modal/audit', 'start' );
}
?>
<?php
get_footer();
