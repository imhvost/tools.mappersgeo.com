<?php
/**
 * REST API functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register REST API endpoint for mappers-audit-quiz CPT
 *
 * @return void
 */
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'mappers/v1',
			'/audit-quiz',
			array(
				'methods'             => 'GET',
				'callback'            => 'mappers_get_audit_quiz',
				'permission_callback' => 'mappers_rest_only_logged_users',
				'args'                => array(
					'id' => array(
						'default'           => 0,
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);

		register_rest_route(
			'mappers/v1',
			'/audit-quiz',
			array(
				'methods'             => 'POST',
				'callback'            => 'mappers_save_audit_quiz',
				'permission_callback' => 'mappers_rest_only_logged_users',
			)
		);

		register_rest_route(
			'mappers/v1',
			'/audit-quiz-meta',
			array(
				'methods'             => 'GET',
				'callback'            => 'mappers_get_audit_quiz_meta',
				'permission_callback' => 'mappers_rest_only_logged_users',
			)
		);
	}
);

/**
 * Check REST API access for logged-in users.
 *
 * @return bool
 */
function mappers_rest_only_logged_users() {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		return true;
	}
	return is_user_logged_in();
}

/**
 * Get mappers-audit
 *
 * @param WP_REST_Request $request REST request.
 *
 * @return WP_REST_Response
 */
function mappers_get_audit_quiz( WP_REST_Request $request ) {
	$id = $request->get_param( 'id' );

	$data = array();

	if ( $id ) {
		$posts   = get_posts(
			array(
				'post_type'      => 'mappers-audit',
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_query'     => array(
					array(
						'key'   => '_mappers_id',
						'value' => $id,
					),
				),
			)
		);
		$post_id = $posts ? $posts[0] : null;

		if ( $post_id ) {
			$audit_json = carbon_get_post_meta( $post_id, 'mappers_audit' );
			$audit      = array();

			if ( ! empty( $audit_json ) ) {
				$audit = json_decode( $audit_json, true );
			}

			if ( json_last_error() !== JSON_ERROR_NONE ) {
				$audit = array();
			}

			$data[] = array(
				'id'    => carbon_get_post_meta( $post_id, 'mappers_id' ),
				'audit' => $audit,
				'url'   => esc_url( get_the_permalink( $post_id ) ),
			);
			return rest_ensure_response( $data );
		}
	}

	$audit = mappers_get_audit_sections();

	$data[] = array(
		'id'    => 0,
		'audit' => $audit,
	);

	return rest_ensure_response( $data );
}

/**
 * Get audit sections
 *
 * @return array
 */
function mappers_get_audit_sections() {
	$query = new WP_Query(
		array(
			'post_type'      => 'mappers-audit-quiz',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'ids',
		)
	);

	$sections = array();

	foreach ( $query->posts as $post_id ) {
		$sections[] = array(
			'id'              => $post_id,
			'title'           => esc_html( get_the_title( $post_id ) ),
			'name'            => esc_attr( carbon_get_post_meta( $post_id, 'mappers_name' ) ),
			'introduction'    => wp_kses_post( carbon_get_post_meta( $post_id, 'mappers_introduction' ) ),
			'quiz'            => mappers_sanitize_api_data( carbon_get_post_meta( $post_id, 'mappers_quiz' ) ),
			'condition'       => esc_attr( carbon_get_post_meta( $post_id, 'mappers_condition' ) ),
			'condition_alert' => esc_html( carbon_get_post_meta( $post_id, 'mappers_condition_alert' ) ),
			'condition_ok'    => esc_html( carbon_get_post_meta( $post_id, 'mappers_condition_ok' ) ),
			'initial_score'   => (int) carbon_get_post_meta( $post_id, 'mappers_initial_score' ),
		);
	}

	return $sections;
}

/**
 * Save or update mappers-audit-quiz post
 *
 * @param WP_REST_Request $request REST request.
 *
 * @return WP_REST_Response
 */
function mappers_save_audit_quiz( WP_REST_Request $request ) {
	$params = $request->get_json_params();

	$id    = empty( $params['id'] ) ? 0 : $params['id'];
	$audit = $params['audit'] ?? array();

	$audit = wp_json_encode( $audit, JSON_UNESCAPED_UNICODE );

	$mappers_id = null;
	if ( $id ) {
		$posts   = get_posts(
			array(
				'post_type'      => 'mappers-audit',
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_query'     => array(
					array(
						'key'   => '_mappers_id',
						'value' => $id,
					),
				),
			)
		);
		$post_id = $posts ? $posts[0] : null;
		if ( $post_id ) {
			carbon_set_post_meta( $post_id, 'mappers_audit', $audit );
			$mappers_id = carbon_get_post_meta( $post_id, 'mappers_id' );
		}
	} else {
		$slug      = wp_unique_post_slug(
			wp_generate_uuid4(),
			0,
			'publish',
			'post',
			0
		);
		$post_data = array(
			'post_type'   => 'mappers-audit',
			'post_title'  => $slug,
			'post_status' => 'publish',
			'post_name'   => $slug,
		);
		$post_id   = wp_insert_post( $post_data );
		if ( ! is_wp_error( $post_id ) ) {
			carbon_set_post_meta( $post_id, 'mappers_audit', $audit );
			carbon_set_post_meta( $post_id, 'mappers_id', $slug );
			$mappers_id = $slug;
		}
	}

	if ( ! $mappers_id ) {
		return rest_ensure_response(
			array(
				'success' => false,
			)
		);
	}

	return rest_ensure_response(
		array(
			'success' => true,
			'id'      => $mappers_id,
			'url'     => esc_url( get_the_permalink( $post_id ) ),
		)
	);
}

/**
 * Get mappers-audit-quiz meta
 *
 * @return WP_REST_Response
 */
function mappers_get_audit_quiz_meta() {

	$data = array(
		'strings' => array(),
		'urls'    => array(),
	);

	$audit_page_id = mappers_get_page_id_by_template( 'page-audit.php' );
	if ( $audit_page_id ) {
		$data['version'] = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_version' ) );

		$data['strings']['start_label']       = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_start_label' ) );
		$data['strings']['start_title']       = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_start_title' ) );
		$data['strings']['start_desc']        = wp_kses_post( carbon_get_post_meta( $audit_page_id, 'mappers_start_desc' ) );
		$data['strings']['start_btn']         = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_start_btn' ) );
		$data['strings']['intro']             = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_intro' ) );
		$data['strings']['questions']         = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_questions' ) );
		$data['strings']['intro_label']       = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_intro_label' ) );
		$data['strings']['go_to_questions']   = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_go_to_questions' ) );
		$data['strings']['do']                = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_do' ) );
		$data['strings']['desc_info']         = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_desc_info' ) );
		$data['strings']['next_question']     = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_next_question' ) );
		$data['strings']['next_section']      = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_next_section' ) );
		$data['strings']['end']               = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_end' ) );
		$data['strings']['finish_label']      = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_label' ) );
		$data['strings']['finish_title']      = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_title' ) );
		$data['strings']['finish_desc']       = wp_kses_post( carbon_get_post_meta( $audit_page_id, 'mappers_finish_desc' ) );
		$data['strings']['finish_btn_list']   = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_btn_list' ) );
		$data['strings']['finish_btn_result'] = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_btn_result' ) );
	}

	$audit_page_id = mappers_get_page_id_by_template( 'page-audit.php' );
	if ( $audit_page_id ) {
		$data['urls']['audit_page'] = esc_url( get_the_permalink( $audit_page_id ) );
	}

	return rest_ensure_response( $data );
}
