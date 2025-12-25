<?php
/**
 * Utils functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Retrieves the ID of the first page using the specified page template.
 *
 * @param string $template The filename of the page template (e.g. 'templates/custom-template.php').
 * @return int|null The page ID if found, or 0 if not found.
 */
function mappers_get_page_id_by_template( $template ) {
	$args  = array(
		'post_type'   => 'page',
		'fields'      => 'ids',
		'numberposts' => 1,
		'meta_key'    => '_wp_page_template',
		'meta_value'  => $template,
	);
	$pages = get_posts( $args );
	if ( $pages ) {
		return $pages[0];
	}
	return null;
}

/**
 * Converts new lines into HTML tags.
 *
 * Wraps each line in the given HTML tag (e.g., <p>, <div>).
 * Also inserts <br> tags between lines that are not already wrapped in tags.
 *
 * @param string $tag The HTML tag to wrap lines with (without angle brackets, e.g., 'p', 'div').
 * @param string $str The input string with possible line breaks.
 * @return string The formatted HTML string with tags and line breaks.
 */
function mappers_nl2tag( $tag, $str ) {
	return "<$tag>" . preg_replace(
		array( '/([\n]{1,})/i', '/([^>])\n([^<])/i' ),
		array( "</$tag>\n<$tag>", '$1<br>$2' ),
		trim( $str )
	) . "</$tag>";
}

/**
 * Returns a permalink if the given input is a post ID or post object.
 * If not, returns the value as a URL (escaped).
 *
 * @param int|string $link Post ID or URL.
 * @return string Permalink or escaped URL.
 */
function mappers_get_btn_link( $link ) {
	$permalink = get_the_permalink( $link );
	return $permalink ? $permalink : esc_url( $link );
}

/**
 * Adds support for SVG tags to the list of allowed HTML tags for wp_kses.
 *
 * This function extends the allowed tags array to include basic SVG elements
 * and attributes needed for safe inline SVG rendering.
 *
 * @param array|null $allowed_tags The existing array of allowed HTML tags.
 * @return array The modified array including SVG-related tags and attributes.
 */
function mappers_allow_svg_in_kses( $allowed_tags = null ) {
	if ( empty( $allowed_tags ) ) {
		$allowed_tags = wp_kses_allowed_html( 'post' );
	}
	$svg_tags = array(
		'svg'  => array(
			'xmlns'       => true,
			'width'       => true,
			'height'      => true,
			'viewbox'     => true,
			'fill'        => true,
			'stroke'      => true,
			'aria-hidden' => true,
			'role'        => true,
			'focusable'   => true,
			'class'       => true,
		),
		'path' => array(
			'd'      => true,
			'fill'   => true,
			'stroke' => true,
			'id'     => true,
		),
		'g'    => array(
			'fill'   => true,
			'stroke' => true,
			'id'     => true,
		),
		'use'  => array(
			'xlink:href' => true,
		),
	);

	return array_merge_recursive( $allowed_tags, $svg_tags );
}

/**
 * Рендерить inline SVG або <img>, незалежно від MIME на сервері.
 *
 * @param int|string $attachment_id Attachment ID.
 * @return string
 */
function mappers_render_image_or_svg( $attachment_id ) {
	if ( ! $attachment_id ) {
		return '';
	}

	$cache_key = 'mappers_svg_render_' . $attachment_id;
	$cached    = wp_cache_get( $cache_key, 'mappers_svg' );

	if ( false !== $cached ) {
		return $cached;
	}

	$url = wp_get_attachment_url( $attachment_id );
	if ( ! $url ) {
		return '';
	}

	$path     = get_attached_file( $attachment_id );
	$url_path = (string) parse_url( $url, PHP_URL_PATH );

	$is_svg = false;
	if ( preg_match( '/\.svgz?$/i', $url_path ) ) {
		$is_svg = true;
	} elseif ( $path && preg_match( '/\.svgz?$/i', $path ) ) {
		$is_svg = true;
	}

	if ( $is_svg ) {
		$svg = '';

		if ( $path && is_readable( $path ) ) {
			$svg = @file_get_contents( $path );
		}

		if ( '' === $svg && $url ) {
			$response = wp_remote_get( $url );
			if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
				$svg = (string) wp_remote_retrieve_body( $response );
			}
		}

		if ( '' !== $svg ) {
			$output = wp_kses( $svg, mappers_allow_svg_in_kses() );
			wp_cache_set( $cache_key, $output, 'mappers_svg' );
			return $output;
		}

		$output = wp_get_attachment_image( $attachment_id, 'full' );
		wp_cache_set( $cache_key, $output, 'mappers_svg' );
		return $output;
	}

	$output = wp_get_attachment_image( $attachment_id, 'full' );
	wp_cache_set( $cache_key, $output, 'mappers_svg' );
	return $output;
}


/**
 * Forces WordPress to display the 404 page and terminates script execution.
 *
 * @return void
 */
function mappers_force_404(): void {
	global $wp_query;

	$wp_query->set_404();
	status_header( 404 );

	$template = get_404_template();
	if ( $template ) {
		load_template( $template );
	} else {
		nocache_headers();
		status_header( 404 );
		echo '<h1>404</h1>';
	}

	exit();
}

/**
 * Retrieves ids from a Carbon Fields association field.
 *
 * @param array $field The association field.
 * @return array The ids array.
 */
function mappers_get_association_ids( $field ) {
	if ( is_array( $field ) ) {
		return array_map( 'intval', wp_list_pluck( $field, 'id' ) );
	}
	return array();
}

/**
 * Retrieves id from a Carbon Fields association field.
 *
 * @param array $field The association field.
 * @return int|null The associated ID, or null if not found.
 */
function mappers_get_association_id( $field ) {
	$ids = mappers_get_association_ids( $field );
	return isset( $ids[0] ) ? (int) $ids[0] : null;
}

/**
 * Retrieves the first associated post ID from a Carbon Fields association field.
 *
 * @param int    $post_id The post ID.
 * @param string $field_key The meta field key.
 * @return int|null The associated ID, or null if not found.
 */
function mappers_get_post_association_id( $post_id, $field_key ) {
	$field = carbon_get_post_meta( $post_id, $field_key );
	return mappers_get_association_id( $field );
}

/**
 * Extracts the YouTube video ID from a given YouTube URL.
 *
 * @param string $url YouTube video URL.
 * @return string|null YouTube video ID or null if not found.
 */
function mappers_get_youtube_video_id_from_url( $url ) {
	preg_match(
		'/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/',
		$url,
		$matches
	);
	if ( ! isset( $matches[1] ) ) {
		return null;
	}
	return $matches[1];
}

/**
 * Returns the URL of a YouTube video thumbnail.
 *
 * @param string $video_id YouTube video ID.
 * @param string $size     Thumbnail size (e.g. 'default', 'hqdefault', 'mqdefault', 'sddefault', 'maxresdefault').
 * @return string Thumbnail image URL.
 */
function mappers_get_youtube_thumbnail( $video_id, $size = 'maxresdefault' ) {
	return 'https://img.youtube.com/vi/' . $video_id . '/' . $size . '.jpg';
}


/**
 * Returns the post excerpt or generates one from the content if none is set.
 *
 * @param int|null $post_id Post ID.
 * @param int      $words Number of words Default is 20.
 * @param string   $more Suffix to append if the content is truncated. Default is '...'.
 * @return string The post excerpt or a truncated portion of the content.
 */
function mappers_get_excerpt( $post_id = null, $words = 20, $more = '...' ) {
	if ( has_excerpt( $post_id ) ) {
		return get_the_excerpt( $post_id );
	}

	$mappers_desc = $post_id ? carbon_get_post_meta( $post_id, 'mappers_desc' ) : carbon_get_the_post_meta( 'mappers_desc' );
	if ( $mappers_desc ?? null ) {
		return $mappers_desc;
	}

	$content = get_the_content( null, null, $post_id );
	$content = strip_shortcodes( $content );
	$content = wp_strip_all_tags( apply_filters( 'the_content', $content ) );

	return wp_trim_words( $content, $words, $more );
}

/**
 * Deep sanitize
 *
 * @param string|array $value String or array.
 *
 * @return string|array sanitized string or array.
 */
function mappers_sanitize_deep( $value ) {
	if ( is_array( $value ) ) {
		return array_map( 'mappers_sanitize_deep', $value );
	}

	if ( is_string( $value ) ) {
		$value   = trim( $value );
		$allowed = '/[^a-zA-Z0-9_\-\=\<\>\!\s]/';
		return preg_replace( $allowed, '', $value );
	}
	return $value;
}

/**
 * Wraps each word in the given text with a <span> tag, preserving spaces and delimiters.
 *
 * @param string $text Input text.
 *
 * @return string Text where each word is wrapped in a <span>.
 */
function mappers_wrap_words_in_span( $text ) {
	$words = preg_split( '/(\s+)/u', $text, -1, PREG_SPLIT_DELIM_CAPTURE );

	foreach ( $words as &$word ) {
		if ( trim( $word ) !== '' ) {
			$word = '<span>' . esc_html( $word ) . '</span>';
		}
	}

	return implode( '', $words );
}

/**
 * Check text fields.
 *
 * @param array   $fields Text fields array of $_POST or $_GET keys.
 * @param boolean $is_all_required All fields are required.
 * @param string  $array_type 'POST' (default) 'GET' | 'SERVER'.
 * @param boolean $check_ajax_referer is use check_ajax_referer.
 *
 * @return array|void Fields array or wp_send_json_error.
 */
function mappers_check_text_fields( $fields = array(), $is_all_required = true, $array_type = 'POST', $check_ajax_referer = true ) {

	if ( 'POST' === $array_type && $check_ajax_referer ) {
		check_ajax_referer( 'mappers_ajaxnonce', 'nonce' );
	}

	if ( ! is_array( $fields ) ) {
		return array();
	}

	$array_type = strtoupper( $array_type );
	$source     = match ( $array_type ) {
		'GET'     => $_GET,
		'SERVER'  => $_SERVER,
		'COOKIE'  => $_COOKIE,
		'REQUEST' => $_REQUEST,
		default   => $_POST,
	};

	$output = array();

	foreach ( $fields as $item ) {
		$value = isset( $source[ $item ] ) ? sanitize_text_field( wp_unslash( $source[ $item ] ) ) : '';

		if ( $is_all_required && ! $value && 'POST' === $array_type ) {
				wp_send_json_error( array( 'message' => esc_html__( "Відсутні обов'язкові поля.", 'mappers' ) ) );
		}

		$output[ $item ] = $value;
	}

	return $output;
}

/**
 * Plural
 *
 * Returns the correct plural form based on the given number.
 * Supports different rules for English and Slavic languages.
 *
 * @param int   $number Number to determine plural form.
 * @param array $forms  Array of already translated plural forms.
 *
 * @return string Correct plural form.
 */
function mappers_plural( $number, $forms ) {
	$locale = determine_locale(); // Gets the current WordPress locale.

	switch ( substr( $locale, 0, 2 ) ) {
		case 'uk':
			$mod10  = $number % 10;
			$mod100 = $number % 100;

			if ( 1 === $mod10 && 11 !== $mod100 ) {
				return $forms[0]; // singular.
			} elseif ( $mod10 >= 2 && $mod10 <= 4 && ( $mod100 < 10 || $mod100 >= 20 ) ) {
				return $forms[1]; // few.
			} else {
				return $forms[2]; // many.
			}

		case 'en':
		default:
			return ( 1 === $number ) ? $forms[0] : $forms[1];
	}
}

/**
 * Lighten a HEX color.
 *
 * @param string $hex   HEX color.
 * @param int    $percent Percentage to lighten (0-100).
 * @return string
 */
function mappers_lighten_color( string $hex, int $percent ): string {
	$rgb = mappers_hex_to_rgb( $hex );

	foreach ( $rgb as &$value ) {
		$value = (int) min( 255, $value + ( 255 - $value ) * ( $percent / 100 ) );
	}

	return mappers_rgb_to_hex( $rgb );
}

/**
 * Darken a HEX color.
 *
 * @param string $hex   HEX color.
 * @param int    $percent Percentage to darken (0-100).
 * @return string
 */
function mappers_darken_color( string $hex, int $percent ): string {
	$rgb = mappers_hex_to_rgb( $hex );

	foreach ( $rgb as &$value ) {
		$value = (int) max( 0, $value * ( 1 - $percent / 100 ) );
	}

	return mappers_rgb_to_hex( $rgb );
}

/**
 * Convert HEX to RGB.
 *
 * @param string $hex HEX color.
 * @return array{0:int,1:int,2:int}
 */
function mappers_hex_to_rgb( string $hex ): array {
	$hex = ltrim( $hex, '#' );

	if ( strlen( $hex ) === 3 ) {
		$hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
	}

	return array(
		hexdec( substr( $hex, 0, 2 ) ),
		hexdec( substr( $hex, 2, 2 ) ),
		hexdec( substr( $hex, 4, 2 ) ),
	);
}

/**
 * Convert RGB array to HEX color.
 *
 * @param array $rgb Array with RGB values.
 * @return string
 */
function mappers_rgb_to_hex( array $rgb ): string {
	return sprintf( '#%02x%02x%02x', $rgb[0], $rgb[1], $rgb[2] );
}

/**
 * Recursively sanitize data for REST API response
 *
 * @param mixed $data Raw data.
 *
 * @return mixed
 */
function mappers_sanitize_api_data( $data ) {
	if ( is_array( $data ) ) {
		foreach ( $data as $key => $value ) {
			if ( '_type' === $key ) {
				unset( $data[ $key ] );
				continue;
			}

			$data[ $key ] = mappers_sanitize_api_data( $value );
		}

		return $data;
	}

	if ( is_string( $data ) ) {
		if ( 'true' === $data || 'false' === $data ) {
			return 'true' === $data;
		}

		if ( preg_match( '/^-?\d+$/', $data ) ) {
			return (int) $data;
		}

		if ( is_numeric( $data ) ) {
			return (float) $data;
		}
		return wp_kses_post( $data );
	}

	return $data;
}
