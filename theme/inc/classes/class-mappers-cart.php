<?php
/**
 * Cart class
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Cart manager for storing items in usermeta or cookies.
 *
 * Handles cart retrieval, persistence and operations for both
 * logged-in and guest users.
 */
class Mappers_Cart {

	/**
	 * Cookie key name.
	 *
	 * @var string
	 */
	private string $cookie_key = 'mappers_cart';

	/**
	 * Cookie lifetime in seconds.
	 *
	 * @var int
	 */
	private int $cookie_lifetime = 86400 * 7; // 7 days

	/**
	 * Get cart data
	 *
	 * @return array
	 */
	public function get_cart(): array {
		if ( is_user_logged_in() ) {
			$cart = get_user_meta( get_current_user_id(), $this->cookie_key, true );
			return is_array( $cart ) ? $cart : array();
		}

		if ( isset( $_COOKIE[ $this->cookie_key ] ) ) {
			$data = mappers_check_text_fields(
				array( $this->cookie_key ),
				false,
				'COOKIE'
			);
			if ( $data[ $this->cookie_key ] ) {
				$data = json_decode( wp_unslash( $data[ $this->cookie_key ] ), true );
			}
			return is_array( $data ) ? $data : array();
		}

		return array();
	}

	/**
	 * Save cart data
	 *
	 * @param array $cart Cart array.
	 * @return void
	 */
	public function save_cart( array $cart ): void {
		if ( is_user_logged_in() ) {
			update_user_meta( get_current_user_id(), $this->cookie_key, $cart );
			return;
		}

		setcookie(
			$this->cookie_key,
			wp_json_encode( $cart ),
			time() + $this->cookie_lifetime,
			'/'
		);
	}

	/**
	 * Add item to cart
	 *
	 * @param int $product_id Product ID.
	 * @param int $qty        Quantity.
	 * @return void
	 */
	public function add( int $product_id, int $qty = 1 ): void {
		$cart = $this->get_cart();

		if ( isset( $cart[ $product_id ] ) ) {
			$cart[ $product_id ] += $qty;
		} else {
			$cart[ $product_id ] = $qty;
		}

		$this->save_cart( $cart );
	}

	/**
	 * Remove item from cart
	 *
	 * @param int $product_id Product ID.
	 * @return void
	 */
	public function remove( int $product_id ): void {
		$cart = $this->get_cart();

		if ( isset( $cart[ $product_id ] ) ) {
			unset( $cart[ $product_id ] );
			$this->save_cart( $cart );
		}
	}

	/**
	 * Get cart count.
	 *
	 * @return int
	 */
	public function get_count(): int {
		return count( $this->get_cart() );
	}

	/**
	 * Get total cart items count.
	 *
	 * @return int
	 */
	public function get_total_count(): int {
		$cart  = $this->get_cart();
		$count = 0;

		foreach ( $cart as $qty ) {
			$count += (int) $qty;
		}

		return $count;
	}

	/**
	 * Clear cart completely
	 *
	 * @return void
	 */
	public function clear(): void {
		$this->save_cart( array() );
	}
}
