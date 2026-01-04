<?php
/**
 * Block faq
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Carbon_Fields\Block;
use Carbon_Fields\Field;

add_action(
	'carbon_fields_register_fields',
	function () {
		$block_name  = 'faq';
		$block_title = __( 'FAQ', 'mappers' );
		Block::make( 'mappers-' . $block_name, $block_title )
		->add_fields(
			array_merge(
				mappers_get_section_fields(),
				array(
					Field::make( 'block_preview', 'preview', __( 'Попередній перегляд', 'mappers' ) )
						->set_html( '<img src="' . get_template_directory_uri() . '/img/blocks/' . $block_name . '.webp" alt="">' ),
					Field::make( 'complex', 'faq', __( 'FAQ', 'mappers' ) )
						->set_collapsed( true )
						->set_layout( 'tabbed-vertical' )
						->add_fields(
							array(
								Field::make( 'textarea', 'question', __( 'Запитання', 'mappers' ) )
									->set_rows( 3 ),
								Field::make( 'rich_text', 'answer', __( 'Відповідь', 'mappers' ) ),
							)
						)
						->set_header_template( '<%= question %>' ),
				)
			)
		)
		->set_keywords( array( $block_title ) )
		->set_category( 'theme_blocks', __( 'Блоки теми', 'mappers' ) )
		->set_description( $block_title )
		->set_mode( 'both' )
		->set_render_callback(
			function ( $fields, $attributes ) use ( $block_name ) {
				if ( mappers_render_block_preview_in_admin( $fields, $block_name ) ) {
					return;
				}
				if(!$fields['faq']){
					return;
				}
				$ld = array(
					'@context'   => 'https://schema.org',
					'@type'      => 'FAQPage',
					'mainEntity' => array(),
				);
?>
				<div
					class="mappers-section mappers-section-<?php echo esc_attr( $block_name ); ?> <?php echo $attributes['className'] ?? null ? esc_attr( $attributes['className'] ) : ''; ?>"	
					<?php echo $fields['mappers_section_bg'] ? 'style="background-color: ' . esc_attr( $fields['mappers_section_bg'] ) . '";' : ''; ?>
				>
					<div class="mappers-container">
						<?php get_template_part('template-parts/section', 'header', array('fields' => $fields)); ?>
						<div class="mappers-accordion">
							<?php
							foreach ( $fields['faq'] as $key => $item ) :
								$ld['mainEntity'][ $key ] = array(
									'@type'          => 'Question',
									'name'           => $item['question'],
									'url'            => get_the_permalink() . '#faq-' . $key,
									'acceptedAnswer' => array(
										'@type' => 'Answer',
										'text'  => wp_strip_all_tags( apply_filters( 'the_content', $item['answer'] ) ),
									),
								);
								?>
								<div
									id="faq-<?php echo esc_attr( $key ); ?>"
									class="mappers-accordion-item <?php echo 0 === $key ? 'mappers-active' : ''; ?>"
								>
									<button class="mappers-accordion-item-toggle mappers-h3">
										<span>
											<?php echo wp_kses_post( nl2br( $item['question'] ) ); ?>
										</span>
										<i>
											<svg class="mappers-icon"><use xlink:href="#icon-chevron-down"/></svg>
										</i>
									</button>
									<div class="mappers-accordion-item-main">
										<div class="mappers-accordion-item-body">
											<div class="mappers-accordion-item-content mappers-content-text">
												<?php
													// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
													echo apply_filters( 'the_content', $item['answer'] );
												?>
											</div>
										</div>
									</div>
								</div>
							<?php endforeach; ?>
						</div>
						<script type='application/ld+json'>
							<?php
							echo wp_json_encode(
								$ld,
								JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
							);
							?>
						</script>
					</div>
				</div>
<?php
			}
		);
	}
);
