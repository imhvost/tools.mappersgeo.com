<?php
/**
 * Users functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create unique user login from email.
 *
 *  @param string $email Email.
 *
 * @return string Unique login.
 */
function mappers_create_unique_user_login( $email ) {
	$login          = explode( '@', $email )[0];
	$login          = sanitize_user( $login );
	$suffix         = 1;
	$original_login = $login;

	while ( username_exists( $login ) ) {
		$login = $original_login . $suffix;
		++$suffix;
	}
	return $login;
}

/**
 * Returns user name.
 *
 * @param int|null $user_id The user ID.
 * @return string User name or ''.
 */
function mappers_get_user_name( $user_id ) {
	if ( ! $user_id ) {
		return '';
	}
	$user_name = carbon_get_user_meta( $user_id, 'mappers_name' );
	if ( ! $user_name ) {
		$user = get_userdata( $user_id );
		if ( $user ) {
			$user_name = $user->display_name;
		}
	}
	return $user_name;
}

/**
 * Get user email by user ID.
 *
 * @param int $user_id User ID.
 *
 * @return string|null
 */
function mappers_get_user_email( $user_id ) {
	if ( ! $user_id ) {
		return null;
	}
	$user = get_userdata( $user_id );
	if ( ! $user ) {
		return null;
	}

	return $user->user_email ? $user->user_email : null;
}

/**
 * Check if the current user is an Editor or Administrator.
 *
 * @return bool True if the user has 'editor' or 'administrator' role, false otherwise.
 */
function mappers_is_editor_or_admin() {
	if ( ! is_user_logged_in() ) {
		return false;
	}

	$user = wp_get_current_user();

	return in_array( 'administrator', (array) $user->roles, true ) || in_array( 'editor', (array) $user->roles, true );
}
