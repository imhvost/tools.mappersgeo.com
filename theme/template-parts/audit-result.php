<?php
/**
 * Audit result
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $args ) :
	[
		'report' => $report,
		'color'  => $color,
		'icon'     => $icon,
	] = wp_parse_args(
		$args,
		array(
			'report' => '',
			'color'  => '',
			'icon'   => '',
		)
	);

	if ( $report ) :
		?>
		<div class="mappers-audit-result <?php echo $color ? 'mappers-audit-result-' . esc_attr( $color ) : ''; ?>">
			<?php if ( $icon ) : ?>
				<div class="mappers-audit-result-icon">
					<svg class="mappers-icon">
						<use xlink:href="#icon-<?php echo esc_attr( $icon ); ?>" />
					</svg>
				</div>
			<?php endif; ?>
			<div class="mappers-audit-result-report">
				<?php echo wp_kses_post( nl2br( $report ) ); ?>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>
