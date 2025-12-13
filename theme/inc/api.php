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
			'lac/v1',
			'/mappers-audit-quiz',
			array(
				'methods'             => 'GET',
				'callback'            => 'lac_get_mappers_audit_quiz',
				'permission_callback' => '__return_true',
				'args'                => array(
					'per_page' => array(
						'default'           => 10,
						'sanitize_callback' => 'absint',
					),
					'page'     => array(
						'default'           => 1,
						'sanitize_callback' => 'absint',
					),
				),
			)
		);
	}
);

/**
 * Get mappers-audit-quiz posts
 *
 * @param WP_REST_Request $request REST request.
 *
 * @return WP_REST_Response
 */
function lac_get_mappers_audit_quiz( WP_REST_Request $request ) {

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
			'quiz'            => carbon_get_post_meta( $post_id, 'mappers_quiz' ),
			'condition'       => esc_attr( carbon_get_post_meta( $post_id, 'mappers_condition' ) ),
			'condition_alert' => esc_html( carbon_get_post_meta( $post_id, 'mappers_condition_alert' ) ),
			'condition_ok'    => esc_html( carbon_get_post_meta( $post_id, 'mappers_condition_ok' ) ),
			'initial_score'   => (int) carbon_get_post_meta( $post_id, 'mappers_initial_score' ),
		);
	}

	return rest_ensure_response( $data );
}
