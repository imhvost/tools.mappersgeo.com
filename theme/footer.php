<?php
/**
 * Footer
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<?php
	$fields = mappers_check_text_fields(
		array( 'modal' ),
		false,
		'GET'
	);

	$allowed_modals = array(
		'password-recovery' => false,
	);
	if ( $fields['modal'] ) {
		if ( in_array( $modal, array_keys( $allowed_modals ), true ) ) {
			$is_need_auth = $allowed_modals[ $modal ];
			if ( $is_need_auth ) {
				if ( is_user_logged_in() ) {
					get_template_part( 'template-parts/modals/' . $modal );
				}
			} else {
				get_template_part( 'template-parts/modals/' . $modal );
			}
		}
	}

	if ( ! is_user_logged_in() || is_super_admin() ) {
		get_template_part( 'template-parts/modals/auth/registration' );
		get_template_part( 'template-parts/modals/auth/enter' );
		get_template_part( 'template-parts/modals/auth/forgot', 'password', array( 'back_btn' => true ) );
	}

	?>
<?php wp_footer(); ?>
</body>
</html>
