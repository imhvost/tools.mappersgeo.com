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

		/* package */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_type', '=', 'mappers-package' )
			->add_fields(
				array(
					Field::make( 'text', 'mappers_credits', __( 'Кількість кредитів', 'mappers' ) )
						->set_attribute( 'type', 'number' )
						->set_width( 50 ),
					Field::make( 'text', 'mappers_price', __( 'Ціна', 'mappers' ) )
						->set_attribute( 'type', 'number' )
						->set_width( 50 ),
					Field::make( 'color', 'mappers_color', __( 'Колір', 'mappers' ) )
						->set_palette( array( '#94D5A3', '#DCB4EC', '#F1C13B' ) ),
				),
			);

		/* order */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_type', '=', 'mappers-order' )
			->add_fields(
				array(
					Field::make( 'select', 'mappers_status', __( 'Статус', 'mappers' ) )
						->add_options(
							array(
								'pending'          => __( 'Замовлення створено', 'mappers' ),
								'payment_waiting'  => __( 'Очікується оплата', 'mappers' ),
								'paid'             => __( 'Оплачено', 'mappers' ),
								'cash_on_delivery' => __( 'Оплата при отриманні', 'mappers' ),
								'failed'           => __( 'Оплата не пройшла', 'mappers' ),
								'refunded'         => __( 'Повернення коштів', 'mappers' ),
								'completed'        => __( 'Завершено', 'mappers' ),
							)
						),
					Field::make( 'text', 'mappers_credits', __( 'Кількість кредитів', 'mappers' ) )
						->set_attribute( 'type', 'number' ),
					Field::make( 'text', 'mappers_amount', __( 'Сума', 'mappers' ) )
						->set_attribute( 'type', 'number' )
						->set_width( 70 ),
					Field::make( 'text', 'mappers_currency', __( 'Валюта', 'mappers' ) )
						->set_width( 30 ),
					Field::make( 'association', 'mappers_package', __( 'Пакет', 'mappers' ) )
						->set_types(
							array(
								array(
									'type'     => 'post',
									'taxonomy' => 'mappers-package',
								),
							)
						)
						->set_max( 1 ),
					Field::make( 'association', 'mappers_user', __( 'Користувач', 'mappers' ) )
						->set_types(
							array(
								array(
									'type' => 'user',
								),
							)
						)
						->set_max( 1 ),
				),
			);

		/* audit */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_template', '=', 'page-audit.php' )
			->add_fields(
				array(
					Field::make( 'complex', 'mappers_audit', __( 'Аудит', 'mappers' ) )
						->set_collapsed( true )
						->set_layout( 'tabbed-horizontal' )
						->add_fields(
							array(
								Field::make( 'text', 'title', __( 'Назва розділу', 'mappers' ) ),
								Field::make( 'text', 'name', __( 'name', 'mappers' ) ),
								Field::make( 'rich_text', 'introduction', __( 'Вступ', 'mappers' ) ),
								Field::make( 'complex', 'quiz', __( 'Питання', 'mappers' ) )
									->set_collapsed( true )
									->set_layout( 'tabbed-vertical' )
									->add_fields(
										array(
											Field::make( 'text', 'question', __( 'Запитання', 'mappers' ) ),
											Field::make( 'text', 'name', __( 'name', 'mappers' ) ),
											Field::make( 'select', 'input_type', __( 'Тип відповіді', 'mappers' ) )
												->set_options(
													array(
														'radio'    => 'radio',
														'checkbox' => 'checkbox',
													)
												),
											Field::make( 'complex', 'answers', __( 'Відповіді', 'mappers' ) )
												->set_collapsed( true )
												->set_layout( 'tabbed-vertical' )
												->add_fields(
													array(
														Field::make( 'text', 'answer', __( 'Відповідь', 'mappers' ) ),
														Field::make( 'text', 'val', __( 'value', 'mappers' ) ),
														Field::make( 'text', 'points', __( 'Бали', 'mappers' ) )
															->set_attribute( 'type', 'number' ),
														Field::make( 'textarea', 'report', __( 'Пояснення для звіту', 'mappers' ) )
															->set_rows( 3 ),
														Field::make( 'select', 'report_color', __( 'Колір', 'mappers' ) )
															->set_options(
																array(
																	'default' => 'За замовченням',
																	'green'   => 'Зелений',
																	'red'     => 'Червоний',
																	'orange'  => 'Помаранчевий',
																)
															),
														Field::make( 'complex', 'sub_questions', __( 'Підзапитання', 'mappers' ) )
															->set_collapsed( true )
															->set_layout( 'tabbed-vertical' )
															->add_fields(
																array(
																	Field::make( 'text', 'question', __( 'Запитання', 'mappers' ) ),
																	Field::make( 'text', 'name', __( 'name', 'mappers' ) ),
																	Field::make( 'select', 'input_type', __( 'Тип відповіді', 'mappers' ) )
																		->set_options(
																			array(
																				'radio'    => 'radio',
																				'checkbox' => 'checkbox',
																			)
																		),
																	Field::make( 'complex', 'answers', __( 'Відповіді', 'mappers' ) )
																		->set_collapsed( true )
																		->set_layout( 'tabbed-vertical' )
																		->add_fields(
																			array(
																				Field::make( 'text', 'answer', __( 'Відповідь', 'mappers' ) ),
																				Field::make( 'text', 'val', __( 'value', 'mappers' ) ),
																				Field::make( 'text', 'points', __( 'Бали', 'mappers' ) )
																					->set_attribute( 'type', 'number' ),
																				Field::make( 'textarea', 'report', __( 'Пояснення для звіту', 'mappers' ) )
																					->set_rows( 3 ),
																				Field::make( 'select', 'report_color', __( 'Колір', 'mappers' ) )
																					->set_options(
																						array(
																							'default' => 'За замовченням',
																							'green'   => 'Зелений',
																							'red'     => 'Червоний',
																							'orange'  => 'Помаранчевий',
																						)
																					),
																			)
																		)
																		->set_header_template( '<%= answer %>' )
																		->set_default_value(
																			array(
																				array(
																					'answer' => __( 'Так', 'mappers' ),
																					'val'  => 'yes',
																				),
																				array(
																					'answer' => __( 'Ні', 'mappers' ),
																					'val'  => 'no',
																				),
																			)
																		),
																)
															)
															->set_header_template( '<small><%= ($_index + 1) %>.</small> <%= question %>' ),
													)
												)
												->set_header_template( '<%= answer %>' )
												->set_default_value(
													array(
														array(
															'answer' => __( 'Так', 'mappers' ),
															'val'  => 'yes',
														),
														array(
															'answer' => __( 'Ні', 'mappers' ),
															'val'  => 'no',
														),
													)
												),
											Field::make( 'textarea', 'do', __( 'Що зробити', 'mappers' ) )
												->set_rows( 2 ),
											Field::make( 'rich_text', 'auditor_note', __( 'Ремарка для аудитора', 'mappers' ) ),
											Field::make( 'textarea', 'desc', __( 'Опис', 'mappers' ) )
												->set_rows( 3 ),
											Field::make( 'text', 'condition', __( 'Умова відображення', 'mappers' ) ),
										)
									)
									->set_header_template( '<small><%= ($_index + 1) %>.</small> <%= question %>' ),
							)
						)
						->set_header_template( '<%= title %>' ),
				),
			);
	}
);
