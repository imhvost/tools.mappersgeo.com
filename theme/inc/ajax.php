<?php
/**
 * Ajax functions
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Ajax create order
 *
 * @return void
 */
function mappers_create_order() {
	$fields = mappers_check_text_fields(
		array(
			'amount',
			'package',
			'currency',
		),
		false
	);

	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Відсутній користувач.', 'mappers' ) ) );
	}

	$currency = $fields['currency'] ? $fields['currency'] : 'UAH';

	$order_id = time() . '-' . wp_generate_uuid4();

	$post_id = wp_insert_post(
		array(
			'post_type'   => 'mappers-order',
			'post_status' => 'publish',
			'post_title'  => $order_id,
		)
	);

	if ( is_wp_error( $post_id ) ) {
		wp_send_json_error( array( 'message' => esc_html__( 'Помилка створення замовлення.', 'mappers' ) ) );
	}

	$credits = 0;

	if ( $fields['package'] ) {
		if ( 'publish' === get_post_status( $fields['package'] ) ) {
			$credits = intval( carbon_get_post_meta( $fields['package'], 'mappers_credits' ) );
			$amount  = floatval( carbon_get_post_meta( $fields['package'], 'mappers_price' ) );

			carbon_set_post_meta(
				$post_id,
				'mappers_package',
				array(
					array(
						'value'   => 'post:mappers-package:' . $fields['package'],
						'id'      => $fields['package'],
						'type'    => 'post',
						'subtype' => 'mappers-package',
					),
				)
			);
		}
	} else {
		$mappers_credit_price = (int) carbon_get_theme_option( 'mappers_credit_price' );
		$amount               = (float) $fields['amount'];
		if ( $amount && $mappers_credit_price ) {
			$credits = floor( $amount / $mappers_credit_price );
		}
	}

	carbon_set_post_meta( $post_id, 'mappers_status', 'pending' );
	carbon_set_post_meta( $post_id, 'mappers_credits', $credits );
	carbon_set_post_meta( $post_id, 'mappers_amount', $amount );
	carbon_set_post_meta( $post_id, 'mappers_currency', $currency );

	carbon_set_post_meta(
		$post_id,
		'mappers_user',
		array(
			array(
				'value'   => 'user:user:' . $user_id,
				'id'      => $user_id,
				'type'    => 'user',
				'subtype' => 'user',
			),
		)
	);

	$liqpay = new Mappers_Liqpay( true );

	$payment = $liqpay->create_payment(
		$order_id,
		$amount,
		$currency,
	);

	wp_send_json_success(
		array(
			'message'  => esc_html__( 'Замовлення створене', 'mappers' ),
			'order_id' => $order_id,
			'post_id'  => $post_id,
			'payment'  => $payment,
		)
	);
}

add_action( 'wp_ajax_nopriv_mappers_create_order', 'mappers_create_order' );
add_action( 'wp_ajax_mappers_create_order', 'mappers_create_order' );
