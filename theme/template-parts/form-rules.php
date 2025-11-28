<?php
/**
 * Form rules
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( has_nav_menu( 'mappers_rules' ) ) : ?>
<div class="mappers-form-rules">
		<?php esc_html_e( 'Ви погоджуєтесь з', 'mappers' ); ?>
		<?php
			wp_nav_menu(
				array(
					'theme_location' => 'mappers_rules',
					'container'      => false,
					'menu_class'     => 'mappers-question-form-rules-links',
					'after'          => '<span data-divider="' . __( 'та', 'mappers' ) . '"></span>',
					'walker'         => new Mappers_Rules_Menu_Walker(),
					'items_wrap'     => '%3$s',
				)
			);
		?>
</div>
<?php endif; ?>
