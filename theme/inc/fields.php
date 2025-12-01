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
		Container::make( 'theme_options', __( 'Налаштування теми', 'mappers' ) )
			->add_fields(
				array(
					Field::make( 'text', 'mappers_credit_price', __( 'Ціна кредиту', 'mappers' ) )
						->set_attribute( 'type', 'number' ),
					Field::make( 'text', 'mappers_currency', __( 'Валюта', 'mappers' ) ),
				)
			);

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

		/* page-credits */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_template', '=', 'page-credits.php' )
			->add_fields(
				array(
					Field::make( 'complex', 'mappers_packages', __( 'Пакети', 'mappers' ) )
						->set_collapsed( true )
						->set_layout( 'tabbed-vertical' )
						->add_fields(
							array(
								Field::make( 'text', 'title', __( 'Назва', 'mappers' ) ),
								Field::make( 'text', 'credits', __( 'Кількість кредитів', 'mappers' ) )
									->set_attribute( 'type', 'number' )
									->set_width( 50 ),
								Field::make( 'text', 'price', __( 'Ціна', 'mappers' ) )
									->set_attribute( 'type', 'number' )
									->set_width( 50 ),
								Field::make( 'color', 'color', __( 'Колір', 'mappers' ) )
									->set_palette( array( '#94D5A3', '#DCB4EC', '#F1C13B' ) ),
							)
						)
						->set_header_template( '<%= title %>' ),
				),
			);
	}
);
