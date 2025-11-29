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

		/* user */
		Container::make( 'user_meta', __( 'Поля', 'mappers' ) )
			->add_fields(
				array(
					Field::make( 'text', 'mappers_name', __( "Ім'я та прізвище", 'mappers' ) ),
					Field::make( 'text', 'mappers_tel', __( 'Номер телефону', 'mappers' ) ),
					Field::make( 'text', 'mappers_website', __( 'Веб-сайт', 'mappers' ) ),
					Field::make( 'text', 'mappers_telegram', __( 'Telegram', 'mappers' ) ),
					Field::make( 'text', 'mappers_facebook', __( 'Facebook', 'mappers' ) ),
					Field::make( 'text', 'mappers_credits', __( 'Кредити', 'mappers' ) )
						->set_attribute( 'type', 'number' ),
				)
			);
	}
);
