<?php
/**
 * Section header
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$fields = $args['fields'] ?? array();

[
	'mappers_section_label'     => $mappers_section_label,
	'mappers_section_label_tag' => $mappers_section_label_tag,
	'mappers_section_title'     => $mappers_section_title,
	'mappers_section_title_tag' => $mappers_section_title_tag,
	'mappers_section_desc'      => $mappers_section_desc,
	'mappers_section_bg'        => $mappers_section_bg,
] = wp_parse_args(
	$fields,
	array(
		'mappers_section_label'     => '',
		'mappers_section_label_tag' => 'div',
		'mappers_section_title'     => '',
		'mappers_section_title_tag' => 'h2',
		'mappers_section_desc'      => '',
		'mappers_section_bg'        => '',
	)
);

if ( $mappers_section_label || $mappers_section_title || $mappers_section_desc ) :
	?>
<div class="mappers-section-header">
	<?php if ( $mappers_section_label ) : ?>
	<<?php echo $mappers_section_label_tag ? esc_attr( $mappers_section_label_tag ) : 'div'; ?> class="mappers-section-label">
		<?php echo wp_kses_post( $mappers_section_label ); ?>
	</<?php echo $mappers_section_label_tag ? esc_attr( $mappers_section_label_tag ) : 'div'; ?>>
	<?php endif; ?>
	<?php if ( $mappers_section_title ) : ?>
	<<?php echo $mappers_section_title_tag ? esc_attr( $mappers_section_title_tag ) : 'h2'; ?> class="mappers-section-title mappers-h1">
		<?php echo nl2br( wp_kses_post( $mappers_section_title ) ); ?>
	</<?php echo $mappers_section_title_tag ? esc_attr( $mappers_section_title_tag ) : 'h2'; ?>>
	<?php endif; ?>
	<?php if ( $mappers_section_desc ) : ?>
		<div class="mappers-section-desc mappers-content-text">
			<?php
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo apply_filters( 'the_content', $mappers_section_desc );
			?>
		</div>
	<?php endif; ?>
</div>
		<?php
endif;
