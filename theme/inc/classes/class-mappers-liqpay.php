<?php
/**
 * Liqpay class
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Liqpay manager.
 */
class Mappers_Liqpay {

	/**
	 * Liqpay public key.
	 *
	 * @var string
	 */
	private string $public_key;

	/**
	 * Liqpay private key.
	 *
	 * @var string
	 */
	private string $private_key;

	/**
	 * Sandbox Enabled.
	 *
	 * @var bool
	 */
	private string $sandbox_enabled;

	/**
	 * Constructor.
	 *
	 * @param bool $sandbox_enabled Sandbox Enabled.
	 */
	public function __construct( bool $sandbox_enabled = false ) {
		$this->sandbox_enabled = $sandbox_enabled;

		$this->public_key  = defined( 'MAPPERS_LIQPAY_PUBLIC_KEY' ) ? MAPPERS_LIQPAY_PUBLIC_KEY : '';
		$this->private_key = defined( 'MAPPERS_LIQPAY_PRIVATE_KEY' ) ? MAPPERS_LIQPAY_PRIVATE_KEY : '';

		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Register REST API routes
	 */
	public function register_rest_routes(): void {
		register_rest_route(
			'liqpay/v1',
			'/callback',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_callback' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Create LiqPay payment
	 *
	 * @param float       $amount Payment amount.
	 * @param string      $order_id Order identifier.
	 * @param string      $description Payment description.
	 * @param string      $currency Currency code (default 'UAH').
	 * @param string|null $result_url Redirect URL after payment.
	 * @param string|null $server_url Callback URL.
	 * @return array Payment data with data, signature, and checkout_url
	 */
	public function create_payment(
		float $amount,
		string $order_id,
		string $description = '',
		string $currency = 'UAH',
		string $result_url = null,
		string $server_url = null
	): array {
		$data = array(
			'version'     => '3',
			'public_key'  => $this->public_key,
			'action'      => 'pay',
			'amount'      => $amount,
			'currency'    => $currency,
			'description' => $description,
			'order_id'    => $order_id,
		);

		if ( $server_url ) {
			$data['server_url'] = $server_url;
		}

		if ( $result_url ) {
			$data['result_url'] = $result_url;
		}

		if ( $this->sandbox_enabled ) {
			$data['sandbox'] = 1;
		}

		$data_encoded = base64_encode( json_encode( $data ) );
		$signature    = base64_encode( sha1( $this->private_key . $data_encoded . $this->private_key, true ) );

		return array(
			'data'         => $data_encoded,
			'signature'    => $signature,
			'checkout_url' => 'https://www.liqpay.ua/api/3/checkout?data=' . $data_encoded . '&signature=' . $signature,
		);
	}

	/**
	 * Handle LiqPay callback via REST API
	 *
	 * @param WP_REST_Request $request REST request object.
	 * @return WP_REST_Response
	 */
	public function rest_callback( WP_REST_Request $request ): WP_REST_Response {
		$data      = $request->get_param( 'data' ) ?? '';
		$signature = $request->get_param( 'signature' ) ?? '';

		$decoded_data = $this->handle_callback( $data, $signature );

		if ( ! $decoded_data ) {
			return new WP_REST_Response( array( 'error' => 'Invalid signature' ), 403 );
		}

		// Example processing
		$status   = $decoded_data['status'] ?? '';
		$order_id = $decoded_data['order_id'] ?? '';

		// You can implement your own order handling logic here
		switch ( $status ) {
			case 'success':
				$message = "Payment completed for order {$order_id}.";
				break;
			case 'failure':
			case 'error':
				$message = "Payment failed for order {$order_id}.";
				break;
			case 'sandbox':
				$message = "Sandbox payment completed for order {$order_id}.";
				break;
			default:
				$message = "Payment status '{$status}' for order {$order_id}.";
				break;
		}

		return new WP_REST_Response(
			array(
				'success'  => true,
				'status'   => $status,
				'order_id' => $order_id,
				'message'  => $message,
			)
		);
	}

	/**
	 * Verify LiqPay callback signature and decode data
	 *
	 * @param string $data base64 encoded data from LiqPay.
	 * @param string $signature Signature from LiqPay.
	 * @return array|null Decoded data array or null if signature invalid
	 */
	public function handle_callback( string $data, string $signature ): ?array {
		$calculated_signature = base64_encode( sha1( $this->private_key . $data . $this->private_key, true ) );

		if ( $signature !== $calculated_signature ) {
			return null;
		}

		return json_decode( base64_decode( $data ), true );
	}
}
