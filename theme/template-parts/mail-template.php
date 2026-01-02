<?php
/**
 * Mail template
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$subject      = $args['subject'] ?? '';
$target_title = $args['title'] ?? '';
$text         = $args['text'] ?? '';

add_filter(
	'safe_style_css',
	function ( $styles ) {
		$styles[] = 'display';
		$styles[] = 'border-radius';
		$styles[] = 'background-color';
		$styles[] = 'text-align';
		$styles[] = 'padding';
		$styles[] = 'color';
		$styles[] = 'font-family';
		$styles[] = 'font-size';
		$styles[] = 'font-weight';
		$styles[] = 'line-height';
		$styles[] = 'text-decoration';
		$styles[] = 'width';
		return $styles;
	}
);

$allowed_tags = array(
	'a'      => array(
		'href'   => true,
		'target' => true,
		'style'  => true,
	),
	'b'      => array(),
	'i'      => array(),
	'strong' => array(),
	'em'     => array(),
	'br'     => array(),
	'tr'     => array(),
	'td'     => array(
		'style' => true,
	),
);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php bloginfo( 'name' ); ?> – <?php esc_html_e( 'Лист', 'mappers' ); ?></title>
		<?php /* phpcs:disable */ ?>
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
		<?php /* phpcs:enable */ ?>
	</head>
	<body style="<?php echo esc_attr( mappers_get_email_font_styles() ); ?> color: #1E1E1D; margin:0; " bgcolor="#ffffff">
		<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
			<?php if ( has_custom_logo() ) : ?>
			<tr>
				<td style="padding: 24px 0; background-color: #CC2531;">
					<table align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
						<td style="padding:0 24px;">
							<?php echo wp_kses_post( get_custom_logo() ); ?>
						</td>
					</table>
				</td>
			</tr>
			<?php endif; ?>
			<tr>
				<td style="padding: 64px 0 48px; background-color: #F7F7F7;">
					<table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
						<tr>
							<td width="24" style="font-size: 0;">&nbsp;</td>
							<td width="552">
								<table width="552" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
									<?php if ( $subject ) : ?>
									<tr>
										<td style="<?php echo esc_attr( mappers_get_email_font_styles( 28, 1.2, 600 ) ); ?> color: #1E1E1D; padding-bottom: 20px; border-bottom: solid 1px #D1D1D3;">
											<?php echo wp_kses( nl2br( $subject ), $allowed_tags ); ?>
										</td>
									</tr>
									<tr><td height="20" style="font-size: 0;">&nbsp;</td></tr>
									<?php endif; ?>
									<?php if ( $target_title ) : ?>
									<tr>
										<td style="<?php echo esc_attr( mappers_get_email_font_styles( 20, 1.2, 600 ) ); ?> color: #2B2A29; padding-bottom: 16px;">
											<?php echo wp_kses( nl2br( $target_title ), $allowed_tags ); ?>
										</td>
									</tr>
									<?php endif; ?>
									<?php
									if ( $text ) {
										echo wp_kses( $text, $allowed_tags );
									}
									?>
								</table>
							</td>
							<td width="24" style="font-size: 0;">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
