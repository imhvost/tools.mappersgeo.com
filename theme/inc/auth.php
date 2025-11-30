<?php
/**
 * Auth functions
 *
 * @package lac
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Ajax registration function
 *
 * @return void
 */
function mappers_auth_registration() {

	$fields = mappers_check_text_fields(
		array(
			'mappers_name',
			'email',
			'password',
			'mappers_tel',
			'mappers_website',
			'redirect',
		),
		false
	);

	if ( ! $fields['email'] ) {
		wp_send_json_error( array( 'message' => esc_html__( "Відсутні обов'язкові поля.", 'mappers' ) ) );
	}

	if ( ! is_email( $fields['email'] ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Невалідний email.', 'mappers' ) ) );
	}

	if ( email_exists( $fields['email'] ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Користувач з таким email вже існує.', 'mappers' ) ) );
	}

	$user_id = wp_insert_user(
		array(
			'user_login' => mappers_create_unique_user_login( $fields['email'] ),
			'user_pass'  => $fields['password'] ? $fields['password'] : wp_generate_password(),
			'user_email' => $fields['email'],
		)
	);

	if ( is_wp_error( $user_id ) ) {
		wp_send_json_error(
			array(
				'message' => esc_html__( 'Помилка при створенні користувача.', 'mappers' ),
				'error'   => $user_id->get_error_message(),
			)
		);
	}

	if ( $fields['mappers_name'] ) {
		carbon_set_user_meta( $user_id, 'mappers_name', $fields['mappers_name'] );
	}
	if ( $fields['mappers_tel'] ) {
		carbon_set_user_meta( $user_id, 'mappers_tel', $fields['mappers_tel'] );
	}
	if ( $fields['mappers_website'] ) {
		carbon_set_user_meta( $user_id, 'mappers_website', $fields['mappers_website'] );
	}

	wp_set_current_user( $user_id );
	wp_set_auth_cookie( $user_id );

	$profile_page_id = mappers_get_page_id_by_template( 'page-profile.php' );
	$redirect        = $fields['redirect'] ? $fields['redirect'] : get_the_permalink( $profile_page_id );

	wp_send_json_success(
		array(
			'message'  => __( 'Реєстрація успішна.', 'mappers' ),
			'redirect' => $redirect,
		)
	);
}

add_action( 'wp_ajax_nopriv_mappers_auth_registration', 'mappers_auth_registration' );
add_action( 'wp_ajax_mappers_auth_registration', 'mappers_auth_registration' );

/**
 * Ajax enter function
 *
 * @return void
 */
function mappers_auth_enter() {

	$fields = mappers_check_text_fields(
		array(
			'email',
			'password',
			'redirect',
		)
	);

	if ( ! is_email( $fields['email'] ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Невалідний email.', 'mappers' ) ) );
	}

	$user = get_user_by( 'email', $fields['email'] );

	if ( ! $user ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Користувача з таким email не знайдено.', 'mappers' ) ) );
	}

	$credentials = array(
		'user_login'    => $user->user_login,
		'user_password' => $fields['password'],
		'remember'      => true,
	);

	$signon = wp_signon( $credentials, is_ssl() );

	if ( is_wp_error( $signon ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Невірний пароль.', 'mappers' ) ) );
	}

	$profile_page_id = mappers_get_page_id_by_template( 'page-profile.php' );
	$redirect        = $fields['redirect'] ? $fields['redirect'] : get_the_permalink( $profile_page_id );

	wp_send_json_success(
		array(
			'message'  => esc_html__( 'Вхід успішний.', 'mappers' ),
			'redirect' => $redirect,
		)
	);
}

add_action( 'wp_ajax_nopriv_mappers_auth_enter', 'mappers_auth_enter' );
add_action( 'wp_ajax_mappers_auth_enter', 'mappers_auth_enter' );

/**
 * Ajax forgot password function
 *
 * @return void
 */
function mappers_auth_forgot_password() {
	$fields = mappers_check_text_fields(
		array(
			'email',
		)
	);

	if ( ! is_email( $fields['email'] ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Невалідний email.', 'mappers' ) ) );
	}

	$user = get_user_by( 'email', $fields['email'] );

	if ( ! $user ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Користувача з таким email не знайдено.', 'mappers' ) ) );
	}

	$key = get_password_reset_key( $user );

	if ( is_wp_error( $key ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Не вдалося створити посилання для скидання паролю.', 'mappers' ) ) );
	}

	$home_page_id = mappers_get_page_id_by_template( 'front-page.php' );
	if ( ! $home_page_id ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Відсутня головна сторінка.', 'mappers' ) ) );
	}

	$reset_url = add_query_arg(
		array(
			'login' => rawurlencode( $user->user_login ),
			'key'   => rawurlencode( $key ),
			'modal' => 'password-recovery',
		),
		get_the_permalink( $home_page_id )
	);

	$sent = mappers_mail_notification(
		$user->user_email,
		array(
			'subject' => esc_html__( 'Відновлення паролю на сайті', 'mappers' ) . ' ' . carbon_get_theme_option( 'mappers_header_company_name' ),
			'text'    => array(
				sprintf(
					/* translators: %s:  */
					esc_html__( 'Щоб скинути пароль, перейдіть за цим %s', 'mappers' ),
					'[mappers_mail_link url="' . esc_url( $reset_url ) . '"]' . esc_html__( 'посиланням', 'mappers' ) . '[/mappers_mail_link]'
				),
				esc_html__( 'Якщо ви не надсилали запит, просто ігноруйте цей лист.', 'mappers' ),
			),
		)
	);

	if ( ! $sent ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Не вдалося надіслати листа. Спробуйте пізніше.', 'mappers' ) ) );
	}

	wp_send_json_success( array( 'message' => esc_html__( 'Інструкції для скидання паролю надіслано на email.', 'mappers' ) ) );
}

add_action( 'wp_ajax_nopriv_mappers_auth_forgot_password', 'mappers_auth_forgot_password' );
add_action( 'wp_ajax_mappers_auth_forgot_password', 'mappers_auth_forgot_password' );


/**
 * Ajax password recovery function
 *
 * @return void
 */
function mappers_auth_password_recovery() {

	$fields = mappers_check_text_fields(
		array(
			'password',
			'password_repeat',
			'login',
			'key',
		)
	);

	if ( $fields['password'] !== $fields['password_repeat'] ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Паролі не співпадають', 'mappers' ) ) );
	}

	$user = get_user_by( 'login', $fields['login'] );
	if ( ! $user ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Недійсний користувач.', 'mappers' ) ) );
	}

	$valid_key = check_password_reset_key( $fields['key'], $user->user_login );
	if ( is_wp_error( $valid_key ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Недійсний або термін дії ключа скидання закінчився.', 'mappers' ) ) );
	}

	wp_set_password( $fields['password'], $user->ID );

	wp_set_current_user( $user->ID );
	wp_set_auth_cookie( $user->ID );

	$profile_page_id = mappers_get_page_id_by_template( 'page-profile.php' );
	$redirect        = $profile_page_id ? get_the_permalink( $profile_page_id ) : home_url( '/' );

	wp_send_json_success(
		array(
			'message'  => esc_html__( 'Пароль успішно скинуто.', 'mappers' ),
			'redirect' => $redirect,
		)
	);
}

add_action( 'wp_ajax_nopriv_mappers_auth_password_recovery', 'mappers_auth_password_recovery' );
add_action( 'wp_ajax_mappers_auth_password_recovery', 'mappers_auth_password_recovery' );


/* google auth */

add_action(
	'template_redirect',
	function () {
		if ( ! isset( $_GET['google_auth'] ) ) {
			return;
		}

		$fields = mappers_check_text_fields(
			array(
				'code',
				'state',
			),
			false,
			'GET'
		);

		$result = array(
			'success' => false,
			'message' => '',
		);

		$state_data = json_decode( base64_decode( $fields['state'] ), true );

		if ( empty( $state_data['nonce'] ) || ! wp_verify_nonce( $state_data['nonce'], 'mappers_google_auth' ) ) {
			$result['message'] = esc_html__( 'Недійсний стан.', 'mappers' );
			return mappers_google_auth_render_popup_result( $result );
		}

		$redirect = $state_data['redirect'];
		if ( ! $redirect ) {
			$profile_page_id = mappers_get_page_id_by_template( 'page-profile.php' );
			$redirect        = $profile_page_id ? get_the_permalink( $profile_page_id ) : home_url( '/' );
		}

		if ( ! $fields['code'] ) {
			$result['message'] = esc_html__( 'Код авторизації не надано.', 'mappers' );
			return mappers_google_auth_render_popup_result( $result );
		}

		$mappers_google_oauth_client_id     = defined( 'MAPPERS_GOOGLE_OAUTH_CLIENT_ID' ) ? MAPPERS_GOOGLE_OAUTH_CLIENT_ID : '';
		$mappers_google_oauth_client_secret = defined( 'MAPPERS_GOOGLE_OAUTH_CLIENT_SECRET' ) ? MAPPERS_GOOGLE_OAUTH_CLIENT_SECRET : '';
		$redirect_uri                       = home_url( '/?google_auth=1' );

		// 1. Exchange code for token
		$response = wp_remote_post(
			'https://oauth2.googleapis.com/token',
			array(
				'body' => array(
					'code'          => $fields['code'],
					'client_id'     => $mappers_google_oauth_client_id,
					'client_secret' => $mappers_google_oauth_client_secret,
					'redirect_uri'  => $redirect_uri,
					'grant_type'    => 'authorization_code',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			$result['message'] = esc_html__( 'Запит на токен не вдався.', 'mappers' );
			return mappers_google_auth_render_popup_result( $result );
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( $data['error'] ?? null ) {
			$result['message'] = ( $data['error_description'] ?? null ) ? esc_html( $data['error_description'] ) : esc_html__( 'Помилка запиту.', 'mappers' );
			return mappers_google_auth_render_popup_result( $result );
		}

		// Get user info
		$user_info_response = wp_remote_get(
			'https://www.googleapis.com/oauth2/v2/userinfo',
			array(
				'headers' => array(
					'Authorization' => 'Bearer ' . $data['access_token'],
				),
			)
		);

		if ( is_wp_error( $user_info_response ) ) {
			$result['message'] = esc_html__( 'Запит на інформацію про користувача не вдався.', 'mappers' );
			return mappers_google_auth_render_popup_result( $result );
		}

		$user_info = json_decode( wp_remote_retrieve_body( $user_info_response ), true );

		if ( empty( $user_info['email'] || ! is_email( $fields['email'] ) ) ) {
			$result['message'] = esc_html__( 'Невалідний email.', 'mappers' );
			return mappers_google_auth_render_popup_result( $result );
		}

		// Create or get user
		$user = get_user_by( 'email', $user_info['email'] );

		if ( $user ) {
			$result['type'] = 'enter';
			$user_id        = $user->ID;
		} else {
			$first_name = $user_info['given_name'] ?? '';
			$last_name  = $user_info['family_name'] ?? '';
			$full_name  = trim( $first_name . ' ' . $last_name );

			$user_id = wp_insert_user(
				array(
					'user_login' => mappers_create_unique_user_login( $user_info['email'] ),
					'user_email' => $user_info['email'],
					'user_pass'  => wp_generate_password(),
					'first_name' => $first_name,
					'last_name'  => $last_name,
					'role'       => $role ? $role : 'mappers_questioner',
				)
			);

			if ( is_wp_error( $user_id ) ) {
				$result['message'] = esc_html__( 'Не вдалося створити користувача.', 'mappers' );
				return mappers_google_auth_render_popup_result( $result );
			}

			$attachment_id = null;
			if ( ! empty( $user_info['picture'] ) ) {
				$attachment_id = mappers_media_handle_sideload_image( $user_info['picture'] );
			}

			if ( $full_name ) {
				carbon_set_user_meta( $user_id, 'mappers_name', $full_name );
			}

			$result['type'] = 'registration';
		}

		// Log in user
		wp_set_auth_cookie( $user_id );

		$result['success']  = true;
		$result['redirect'] = $redirect;
		$result['message']  = esc_html__( 'Користувача успішно автентифіковано.', 'mappers' );

		return mappers_google_auth_render_popup_result( $result );
	}
);

/**
 * Outputs HTML+JS to send popup result to opener
 *
 * @param array $result Data to send to opener window.
 */
function mappers_google_auth_render_popup_result( $result ) {
	$json = wp_json_encode( $result );
	$html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Google Auth</title></head>
<body>
<script>
	if(window.opener) {
		window.opener.postMessage($json, window.location.origin);
		window.close();
	} else {
		document.body.innerText = "No opener window detected.";
	}
</script>
</body>
</html>
HTML;
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo $html;
	exit;
}

/**
 * Returns the URL for Google authorization.
 *
 * @return string URL for Google authorization.
 */
function mappers_get_google_auth_url() {

	$mappers_google_oauth_client_id = defined( 'MAPPERS_GOOGLE_OAUTH_CLIENT_ID' ) ? MAPPERS_GOOGLE_OAUTH_CLIENT_ID : '';
	if ( ! $mappers_google_oauth_client_id ) {
		return '';
	}

	$client_id    = $mappers_google_oauth_client_id;
	$redirect_uri = rawurlencode( home_url( '/?google_auth=1' ) );
	$scope        = rawurlencode( 'email profile' );
	$state        = wp_create_nonce( 'mappers_google_auth' );

	return "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={$client_id}&redirect_uri={$redirect_uri}&scope={$scope}&state={$state}&access_type=online&prompt=select_account";
}
