<?php
/**
 * Profile functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Ajax profile form
 *
 * @return void
 */
function mappers_profile_form() {
	$fields = mappers_check_text_fields(
		array(
			'mappers_name',
			'user_email',
			'mappers_tel',
			'mappers_website',
			'mappers_telegram',
			'mappers_facebook',
		),
		false
	);

	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Відсутній користувач.', 'mappers' ) ) );
	}

	$email = mappers_get_user_email( $user_id );
	if ( $email !== $fields['user_email'] ) {
		$result = wp_update_user(
			array(
				'ID'         => $user_id,
				'user_email' => $fields['user_email'],
			)
		);
		if ( is_wp_error( $result ) ) {
			wp_send_json_error( array( 'message' => esc_html__( 'Не вдалося змінити email: ', 'mappers' ) ) . ' ' . $result->get_error_message() );
		}
	}

	carbon_set_user_meta( $user_id, 'mappers_name', $fields['mappers_name'] );
	carbon_set_user_meta( $user_id, 'mappers_tel', $fields['mappers_tel'] );
	carbon_set_user_meta( $user_id, 'mappers_website', $fields['mappers_website'] );
	carbon_set_user_meta( $user_id, 'mappers_telegram', $fields['mappers_telegram'] );
	carbon_set_user_meta( $user_id, 'mappers_facebook', $fields['mappers_facebook'] );

	wp_send_json_success();
}

add_action( 'wp_ajax_nopriv_mappers_profile_form', 'mappers_profile_form' );
add_action( 'wp_ajax_mappers_profile_form', 'mappers_profile_form' );

/**
 * Ajax password change function
 *
 * @return void
 */
function mappers_auth_password_change() {

	$fields = mappers_check_text_fields(
		array(
			'password',
			'old_password',
		)
	);

	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Користувач відсутній', 'mappers' ) ) );
	}

	$user = get_userdata( $user_id );
	if ( ! $user ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Користувач не знайдений', 'mappers' ) ) );
	}

	if ( ! wp_check_password( $fields['old_password'], $user->user_pass, $user_id ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Старий пароль невірний', 'mappers' ) ) );
	}

	wp_set_password( $fields['password'], $user_id );

	wp_set_current_user( $user_id );
	wp_set_auth_cookie( $user_id );

	wp_send_json_success( array( 'message' => esc_html__( 'Пароль успішно змінено.', 'mappers' ) ) );
}

add_action( 'wp_ajax_nopriv_mappers_auth_password_change', 'mappers_auth_password_change' );
add_action( 'wp_ajax_mappers_auth_password_change', 'mappers_auth_password_change' );

/**
 * Ajax answerer article request function
 *
 * @return void
 */
function mappers_profile_delete() {
	check_ajax_referer( 'mappers_ajaxnonce', 'nonce' );

	$user_id = get_current_user_id();

	if ( ! $user_id ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Недостатньо прав.', 'mappers' ) ) );
	}

	require_once ABSPATH . 'wp-admin/includes/user.php';
	$is_deleted = wp_delete_user( $user_id );

	if ( ! $is_deleted ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Пимилка видалення користувача.', 'mappers' ) ) );
	}

	wp_send_json_success(
		array( 'redirect' => esc_url( home_url( '/' ) ) )
	);
}

add_action( 'wp_ajax_nopriv_mappers_profile_delete', 'mappers_profile_delete' );
add_action( 'wp_ajax_mappers_profile_delete', 'mappers_profile_delete' );
