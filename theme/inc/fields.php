<?php
/**
 * Meta fields
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Carbon_Fields\Container;
use Carbon_Fields\Field;


add_action(
	'carbon_fields_register_fields',
	function () {

		/* options */
		Container::make( 'theme_options', __( 'Опції теми', 'mappers' ) )
			->add_tab(
				__( 'Шапка', 'mappers' ),
				array(
					Field::make( 'image', 'mappers_logo', __( 'Логотип', 'mappers' ) ),
				)
			);

		/* user */
		Container::make( 'user_meta', __( 'Поля', 'mappers' ) )
			->add_fields(
				array(
					Field::make( 'text', 'mappers_credits', __( 'Кредити', 'mappers' ) )
						->set_attribute( 'type', 'number' ),
				)
			);
	}
);
