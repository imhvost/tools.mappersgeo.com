<?php
/**
 * Credits class
 *
 * Handles user credits operations.
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Credits manager.
 */
class Mappers_Credits {

	/**
	 * User ID.
	 *
	 * @var int
	 */
	private int $user_id;

	/**
	 * Constructor.
	 *
	 * @param int $user_id User ID.
	 */
	public function __construct( int $user_id ) {
		if ( get_userdata( $user_id ) ) {
			$this->user_id = $user_id;
		} else {
			$this->user_id = 0;
		}
	}

	/**
	 * Check user.
	 *
	 * @return bool
	 */
	public function is_valid(): bool {
		return $this->user_id > 0;
	}

	/**
	 * Get current user credits.
	 *
	 * @return int Number of credits.
	 */
	public function get_credits(): int {
		if ( ! $this->is_valid() ) {
			return 0;
		}
		$credits = carbon_get_user_meta( $this->user_id, 'mappers_credits' );
		return $credits ? (int) $credits : 0;
	}

	/**
	 * Add credits to user.
	 *
	 * @param int $amount Number of credits to add.
	 * @return bool True on success.
	 */
	public function add_credits( int $amount ): bool {
		if ( ! $this->is_valid() ) {
			return false;
		}
		$current = $this->get_credits();
		carbon_set_user_meta( $this->user_id, 'mappers_credits', $current + $amount );
		/**
		 * Fires after user credits are added.
		 *
		 * @param int $user_id User ID.
		 * @param int $amount  Added credits.
		 */
		do_action( 'mappers_credits_added', $this->user_id, $amount );

		return true;
	}

	/**
	 * Spend credits for user.
	 *
	 * @param int $amount Number of credits to spend.
	 * @return bool True on success, false if not enough credits.
	 */
	public function spend_credits( int $amount ): bool {
		if ( ! $this->is_valid() ) {
			return false;
		}
		$current = $this->get_credits();
		if ( $current < $amount ) {
			return false;
		}

		carbon_set_user_meta( $this->user_id, 'mappers_credits', $current - $amount );
		/**
		 * Fires after user credits are spent.
		 *
		 * @param int $user_id User ID.
		 * @param int $amount  Spent credits.
		 */
		do_action( 'mappers_credits_spent', $this->user_id, $amount );

		return true;
	}

	/**
	 * Check if user has enough credits.
	 *
	 * @param int $amount Number of credits to check.
	 * @return bool True if user has enough credits, false otherwise.
	 */
	public function has_credits( int $amount ): bool {
		if ( ! $this->is_valid() ) {
			return false;
		}
		return $this->get_credits() >= $amount;
	}
}
