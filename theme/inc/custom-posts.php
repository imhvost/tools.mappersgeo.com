<?php
/**
 * Post types and taxonomy register
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'carbon_fields_register_fields',
	function () {

		$page_audits = mappers_get_page_id_by_template( 'page-audits.php' );
		register_post_type(
			'mappers-audit',
			array(
				'labels'        => array(
					'name'          => __( 'Аудити', 'mappers' ),
					'singular_name' => __( 'Аудит', 'mappers' ),
					'add_new'       => __( 'Добавить', 'mappers' ),
				),
				'public'        => true,
				'menu_icon'     => 'dashicons-book',
				'menu_position' => 5,
				'rewrite'       => $page_audits ? array(
					'slug'       => get_page_uri( $page_audits ),
					'with_front' => false,
				) : true,
				'supports'      => array( 'title' ),
				'show_in_rest'  => false,
			)
		);

		register_post_type(
			'mappers-audit-quiz',
			array(
				'labels'        => array(
					'name'          => __( 'Аудит квіз', 'mappers' ),
					'singular_name' => __( 'Квіз', 'mappers' ),
					'add_new'       => __( 'Добавить', 'mappers' ),
				),
				'public'        => false,
				'show_ui'       => true,
				'menu_icon'     => 'dashicons-chart-pie',
				'menu_position' => 5,
				'supports'      => array( 'title' ),
				'show_in_rest'  => false,
			)
		);

		register_post_type(
			'mappers-package',
			array(
				'labels'        => array(
					'name'          => __( 'Пакети', 'mappers' ),
					'singular_name' => __( 'Пакет', 'mappers' ),
					'add_new'       => __( 'Добавить', 'mappers' ),
				),
				'public'        => false,
				'show_ui'       => true,
				'menu_icon'     => 'dashicons-products',
				'menu_position' => 5,
				'supports'      => array( 'title' ),
				'show_in_rest'  => false,
			)
		);

		register_post_type(
			'mappers-order',
			array(
				'labels'        => array(
					'name'          => __( 'Замовлення', 'mappers' ),
					'singular_name' => __( 'Замовлення', 'mappers' ),
					'add_new'       => __( 'Добавить', 'mappers' ),
				),
				'public'        => false,
				'show_ui'       => true,
				'menu_icon'     => 'dashicons-cart',
				'menu_position' => 5,
				'supports'      => array( 'title' ),
				'show_in_rest'  => false,
			)
		);
	}
);
