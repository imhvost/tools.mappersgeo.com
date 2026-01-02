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
				array(
					'key'   => '_mappers_user|||0|id',
					'value' => $user_id,
				),
			),
		)
	);
}

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
			<?php
			if ( $audits ) :
				$audit_page_id = mappers_get_page_id_by_template( 'page-audit.php' );
				?>
				<table class="mappers-audits-table">
					<thead>
						<tr>
							<td><?php esc_html_e( 'Назва', 'mappers' ); ?></td>
							<td><?php esc_html_e( 'Адреса', 'mappers' ); ?></td>
							<td><?php esc_html_e( 'Дата', 'mappers' ); ?></td>
							<td><?php esc_html_e( 'Статус', 'mappers' ); ?></td>
							<td><?php esc_html_e( 'Дії', 'mappers' ); ?></td>
						</tr>
					</thead>
					<tbody>
					<?php
					foreach ( $audits as $audit_post_id ) :
						$mappers_id        = carbon_get_post_meta( $audit_post_id, 'mappers_id' );
						$mappers_type      = carbon_get_post_meta( $audit_post_id, 'mappers_type' );
						$mappers_company   = carbon_get_post_meta( $audit_post_id, 'mappers_company' );
						$mappers_address   = carbon_get_post_meta( $audit_post_id, 'mappers_address' );
						$audit_post_status = get_post_status( $audit_post_id );

						$is_self_draft = 'self' === $mappers_type && 'draft' === $audit_post_status;
						?>
						<tr
							data-id="<?php echo esc_attr( $mappers_id ); ?>"
							data-src="<?php echo esc_url( get_the_permalink( $audit_post_id ) ); ?>"
							class="mappers-audits-table-item mappers-audits-table-item-<?php echo esc_attr( $audit_post_status ); ?>"
						>
							<td>
								<<?php echo $is_self_draft ? 'a href="' . esc_url( get_the_permalink( $audit_page_id ) ) . '?id=' . esc_attr( $mappers_id ) . '"' : 'div'; ?> class="mappers-audits-table-company">
									<?php echo esc_html( $mappers_company ); ?>
								</<?php echo $is_self_draft ? 'a' : 'div'; ?>>
							</td>
							<td>
								<div class="mappers-audits-table-address">
									<?php echo esc_html( $mappers_address ); ?>
								</div>
							</td>
							<td>
								<div class="mappers-audits-table-date">
									<?php echo esc_html( get_the_date( 'd.m.Y', $audit_post_id ) ); ?>
								</div>
							</td>
							<td>
								<<?php echo $is_self_draft ? 'a href="' . esc_url( get_the_permalink( $audit_page_id ) ) . '?id=' . esc_attr( $mappers_id ) . '"' : 'div'; ?> class="mappers-audits-table-status">
									<?php
									if ( 'publish' === $audit_post_status ) {
										esc_html_e( 'Звіт готов', 'mappers' );
									} elseif ( $is_self_draft ) {
										esc_html_e( 'Продовжити', 'mappers' );
									} elseif ( 'pro' === $mappers_type ) {
										esc_html_e( 'Готовимо звіт', 'mappers' );
									}
									?>
								</<?php echo $is_self_draft ? 'a' : 'div'; ?>>
							</td>
							<td>
								<div class="mappers-audits-table-actions">
									<button aria-label="<?php esc_attr_e( 'Поділитися', 'mappers' ); ?>" class="mappers-audits-table-btn mappers-audits-table-btn-share">
										<svg class="mappers-icon"><use xlink:href="#icon-share" /></svg>
									</button>
									<button aria-label="<?php esc_attr_e( 'Завантажити', 'mappers' ); ?>" class="mappers-audits-table-btn mappers-audits-table-btn-download">
										<svg class="mappers-icon"><use xlink:href="#icon-download" /></svg>
									</button>
									<button aria-label="<?php esc_attr_e( 'Роздрукувати', 'mappers' ); ?>" class="mappers-audits-table-btn mappers-audits-table-btn-print">
										<svg class="mappers-icon"><use xlink:href="#icon-print" /></svg>
									</button>
									<<?php echo 'publish' === $audit_post_status ? 'a href="' . esc_url( get_the_permalink( $audit_post_id ) ) . '"' : 'div'; ?> aria-label="<?php esc_attr_e( 'Переглянути', 'mappers' ); ?>" class="mappers-audits-table-btn mappers-audits-table-btn-view">
										<svg class="mappers-icon"><use xlink:href="#icon-arrow-link" /></svg>
									</<?php echo 'publish' === $audit_post_status ? 'a' : 'div'; ?>>
								</div>
							</td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			<?php else : ?>
				<div class="mappers-audits-empty">
					<?php esc_html_e( 'Ви поки що не отримали жодного результату аудиту. Замовте аудит', 'mappers' ); ?>
				</div>
			<?php endif; ?>
		</div>
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
