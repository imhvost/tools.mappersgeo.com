<?php
/**
 * Mail functions
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'wp_mail_content_type',
	function () {
		return 'text/html';
	}
);

/**
 * Mail notification
 *
 * @param string|array $to Send to email.
 * @param string|array $mail_data Theme options mail key or array ['subject' => '', 'title' => '', 'text' => ''] .
 * @param array        $shortcodes_data The shortcodes data array ['post_id' => $post_id, 'user_id' => $user_id ].
 *
 * @return boolean Sent email or not.
 */
function mappers_mail_notification( $to, $mail_data, $shortcodes_data = array() ) {
	if ( is_array( $mail_data ) ) {
		$subject = $mail_data['subject'] ?? '';
		$title   = $mail_data['title'] ?? '';
		$text    = $mail_data['text'] ?? '';
	} else {
		$subject = carbon_get_theme_option( $mail_data . '__subject' );
		$title   = carbon_get_theme_option( $mail_data . '__title' );
		$text    = carbon_get_theme_option( $mail_data . '__text' );
	}

	$shortcode_tags = array(
		'mappers_mail_user_profile_link',
		'mappers_mail_user_name',
	);

	if ( is_array( $text ) ) {
		$text = implode( "\n", $text );
	}

	if ( $shortcodes_data ) {
		foreach ( $shortcode_tags as $tag ) {
			if ( isset( $shortcodes_data['post_id'] ) ) {
				$title = str_replace( '[' . $tag, '[' . $tag . ' post_id="' . $shortcodes_data['post_id'] . '" ', $title );
				$text  = str_replace( '[' . $tag, '[' . $tag . ' post_id="' . $shortcodes_data['post_id'] . '" ', $text );
			}
			if ( isset( $shortcodes_data['user_id'] ) ) {
				$title = str_replace( '[' . $tag, '[' . $tag . ' user_id="' . $shortcodes_data['user_id'] . '" ', $title );
				$text  = str_replace( '[' . $tag, '[' . $tag . ' user_id="' . $shortcodes_data['user_id'] . '" ', $text );
			}
		}
	}

	$text = preg_split( '/\r\n|\r|\n/', $text );
	$text = implode(
		'',
		array_map(
			static fn( $line ) => '<tr><td style="' . esc_attr( mappers_get_email_font_styles() ) . ' padding-bottom: 8px; color: #414651;">' . $line . '</td></tr>',
			$text
		)
	);

	ob_start();
	get_template_part(
		'template-parts/mail',
		'template',
		array(
			'subject' => $subject,
			'title'   => do_shortcode( $title ),
			'text'    => do_shortcode( $text ),
		)
	);

	return wp_mail( $to, $subject, ob_get_clean() );
}

add_shortcode(
	'mappers_mail_user_profile_link',
	function ( $atts, $content ) {
		$atts = shortcode_atts(
			array(
				'user_id' => null,
			),
			$atts,
			'mappers_mail_user_profile_link'
		);

		$user_id = absint( $atts['user_id'] );
		if ( ! $user_id ) {
			return '';
		}

		$profile_link = mappers_get_user_profile_link( $user_id );
		if ( ! $profile_link ) {
			return '';
		}

		$title = $content ? esc_html( $content ) : esc_html__( 'Особистий кабінет', 'mappers' );

		return strtr(
			'<a href="%href%" style="%style%; text-decoration: underline!important; color: #1E1E1D!important;" target="_blank">%title%</a>',
			array(
				'%href%'  => esc_url( $profile_link ),
				'%style%' => esc_attr( mappers_get_email_font_styles() ),
				'%title%' => $title,
			)
		);
	}
);

add_shortcode(
	'mappers_mail_link',
	function ( $atts, $content ) {
		$atts = shortcode_atts(
			array(
				'url' => null,
			),
			$atts,
			'mappers_mail_link'
		);

		if ( ! $atts['url'] ) {
			return '';
		}

		$title = $content ? esc_html( $content ) : esc_html( $atts['url'] );

		return strtr(
			'<a href="%href%" style="%style%; text-decoration: underline!important; color: #1E1E1D!important;" target="_blank">%title%</a>',
			array(
				'%href%'  => esc_url( $atts['url'] ),
				'%style%' => esc_attr( mappers_get_email_font_styles() ),
				'%title%' => $title,
			)
		);
	}
);

add_shortcode(
	'mappers_mail_post_link',
	function ( $atts, $content ) {
		$atts = shortcode_atts(
			array(
				'post_id' => null,
			),
			$atts,
			'mappers_mail_post_link'
		);

		$post_id = absint( $atts['post_id'] );
		if ( ! $post_id || 'publish' !== get_post_status( $post_id ) ) {
			return '';
		}

		$title = $content ? esc_html( $content ) : esc_html( get_the_title( $post_id ) );

		return strtr(
			'<a href="%href%" style="%style%; text-decoration: underline!important; color: #1E1E1D!important;" target="_blank">%title%</a>',
			array(
				'%href%'  => esc_url( get_the_permalink( $post_id ) ),
				'%style%' => esc_attr( mappers_get_email_font_styles() ),
				'%title%' => $title,
			)
		);
	}
);

add_shortcode(
	'mappers_mail_user_name',
	function ( $atts ) {
		$atts = shortcode_atts(
			array(
				'user_id' => null,
			),
			$atts,
			'mappers_mail_user_name'
		);

		$user_id = absint( $atts['user_id'] );
		if ( ! $user_id ) {
			return '';
		}

		return mappers_get_user_name( $user_id );
	}
);

/**
 * Returns inline CSS for email text.
 *
 * @param int   $font_size   Font size in pixels. Default 16.
 * @param float $line_height Line height. Default 1.25.
 * @param int   $font_weight Font weight. Default 400.
 *
 * @return string Inline CSS string.
 */
function mappers_get_email_font_styles( $font_size = 16, $line_height = 1.5, $font_weight = 400 ) {
	return 'font-family: Montserrat, Roboto, sans-serif; -webkit-text-size-adjust:none; mso-line-height-rule:exactly; font-size:' . $font_size . 'px; line-height: ' . $line_height . '; font-weight: ' . $font_weight . ';';
}
