<?php
/**
 * Audits
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$user_id = get_current_user_id();
$audits  = array();


if ( $user_id ) {
	$audits = get_posts(
		array(
			'post_type'      => 'mappers-audit',
			'post_status'    => array( 'draft', 'publish' ),
			'posts_per_page' => 1,
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

if ( $audits ) :
	$query      = $args['query'] ?? null;
	$query_args = $args['query_args'] ?? array();

	if ( ! $query ) {
		$query = new WP_Query( $query_args );
	}

	?>
<script type="application/json" class="mappers-filter-audits-args">
	<?php echo wp_json_encode( $query_args ); ?>
</script>
<div class="mappers-audits-filter">
	<form action="?" class="mappers-audits-search">
		<label class="mappers-form-block">
			<svg class="mappers-icon"><use xlink:href="#icon-search"/></svg>
			<span class="mappers-input-block">
				<input
					type="search"
					class="mappers-input mappers-audits-search-input"
					name="search"
					placeholder="<?php esc_attr_e( 'Пошук', 'mappers' ); ?>"
					value="<?php echo esc_attr( $query_args['s'] ?? '' ); ?>"
				>
			</span>
		</label>
	</form>
</div>
	<?php

	if ( $query->have_posts() ) :
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
			foreach ( $query->posts as $audit_post_id ) :
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
					<td data-title="<?php esc_attr_e( 'Назва', 'mappers' ); ?>">
						<<?php echo $is_self_draft ? 'a href="' . esc_url( get_the_permalink( $audit_page_id ) ) . '?id=' . esc_attr( $mappers_id ) . '"' : 'div'; ?> class="mappers-audits-table-company">
							<?php echo esc_html( $mappers_company ); ?>
						</<?php echo $is_self_draft ? 'a' : 'div'; ?>>
					</td>
					<td data-title="<?php esc_attr_e( 'Адреса', 'mappers' ); ?>">
						<div class="mappers-audits-table-address">
							<?php echo esc_html( $mappers_address ); ?>
						</div>
					</td>
					<td data-title="<?php esc_attr_e( 'Дата', 'mappers' ); ?>">
						<div class="mappers-audits-table-date">
							<?php echo esc_html( get_the_date( 'd.m.Y', $audit_post_id ) ); ?>
						</div>
					</td>
					<td data-title="<?php esc_attr_e( 'Статус', 'mappers' ); ?>">
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
					<td data-title="<?php esc_attr_e( 'Дії', 'mappers' ); ?>">
						<div class="mappers-audits-table-actions">
							<button
								aria-label="<?php esc_attr_e( 'Поділитися', 'mappers' ); ?>"
								class="mappers-audits-table-btn mappers-audits-table-btn-share"
								data-url="<?php echo esc_url( get_the_permalink( $audit_post_id ) ); ?>"
								data-title="<?php esc_attr_e( 'Аудит компанії', 'mappers' ); ?> <?php echo esc_attr( $mappers_company ); ?>"
							>
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
		<?php
		get_template_part(
			'template-parts/pagination',
			'',
			array(
				'current'       => $query_args['paged'] ?? 1,
				'max_num_pages' => $query->max_num_pages,
				'base_url'      => $query_args['base_url'] ?? '',
				'add_args'      => $query_args['add_args'] ?? array(),
			)
		);
		?>
		<div class="mappers-audits-table-share-tooltip">
			<?php
				$sharer = array( 'x', 'facebook', 'linkedin', 'whatsapp', 'viber', 'telegram' );
			foreach ( $sharer as $item ) :
				?>
				<button
					class="mappers-audits-table-share-btn"
					data-sharer="<?php echo esc_attr( $item ); ?>"
					aria-label="<?php esc_attr_e( 'Поділитися в', 'mappers' ); ?> <?php echo esc_attr( $item ); ?>"
				>
					<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/share/<?php echo esc_attr( $item ); ?>.svg" alt="">
				</button>
			<?php endforeach; ?>
			<button
				class="mappers-audits-table-share-btn mappers-audits-table-share-btn-copy"
				aria-label="<?php esc_attr_e( 'Скопіювати посилання', 'mappers' ); ?>"
			>
				<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/share/link.svg" alt="">
			</button>
		</div>
	<?php else : ?>
		<div class="mappers-audits-empty"><?php esc_html_e( 'Нічого не знайдено.', 'mappers' ); ?></div>
	<?php endif; ?>

<?php else : ?>
	<div class="mappers-audits-empty">
		<?php esc_html_e( 'Ви поки що не отримали жодного результату аудиту. Замовте аудит', 'mappers' ); ?>
	</div>
<?php endif; ?>
