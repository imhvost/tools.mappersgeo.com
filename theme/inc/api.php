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
			'/mappers-audit-quiz',
			array(
				'methods'             => 'GET',
				'callback'            => 'mappers_get_mappers_audit_quiz',
				'permission_callback' => 'mappers_rest_only_logged_users',
			)
		);

		register_rest_route(
			'mappers/v1',
			'/mappers-audit-quiz-meta',
			array(
				'methods'             => 'GET',
				'callback'            => 'mappers_get_mappers_audit_quiz_meta',
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
 * Get mappers-audit-quiz
 *
 * @return WP_REST_Response
 */
function mappers_get_mappers_audit_quiz() {

	$query = new WP_Query(
		array(
			'post_type'      => 'mappers-audit-quiz',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'ids',
		)
	);

	$data = array();

	foreach ( $query->posts as $post_id ) {
		$data[] = array(
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

	return rest_ensure_response( $data );
}

/**
 * Get mappers-audit-quiz meta
 *
 * @return WP_REST_Response
 */
function mappers_get_mappers_audit_quiz_meta() {

	$data = array(
		'strings' => array(),
		'urls'    => array(),
	);

	$audit_page_id = mappers_get_page_id_by_template( 'page-audit.php' );
	if ( $audit_page_id ) {
		$data['strings']['start_label']       = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_start_label' ) );
		$data['strings']['start_title']       = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_start_title' ) );
		$data['strings']['start_desc']        = wp_kses_post( carbon_get_post_meta( $audit_page_id, 'mappers_start_desc' ) );
		$data['strings']['start_btn']         = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_start_btn' ) );
		$data['strings']['intro']             = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_intro' ) );
		$data['strings']['questions']         = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_questions' ) );
		$data['strings']['go_to_questions']   = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_go_to_questions' ) );
		$data['strings']['next_section']      = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_next_section' ) );
		$data['strings']['finish_label']      = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_label' ) );
		$data['strings']['finish_title']      = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_title' ) );
		$data['strings']['finish_desc']       = wp_kses_post( carbon_get_post_meta( $audit_page_id, 'mappers_finish_desc' ) );
		$data['strings']['finish_btn_list']   = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_btn_list' ) );
		$data['strings']['finish_btn_result'] = esc_html( carbon_get_post_meta( $audit_page_id, 'mappers_finish_btn_result' ) );
	}

	$audits_page_id = mappers_get_page_id_by_template( 'page-audits.php' );
	if ( $audits_page_id ) {
		$data['urls']['audits'] = esc_url( get_the_permalink( $audits_page_id ) );
	}

	return rest_ensure_response( $data );
}
