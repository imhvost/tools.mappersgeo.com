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

/**
 * Returns section fields.
 *
 * @return array Fields array
 */
function mappers_get_section_fields() {

	if ( class_exists( 'Carbon_Fields\Field' ) ) {
		return array(
			Field::make( 'text', 'mappers_section_label', __( 'Ярлик', 'mappers' ) )
				->set_width( 80 ),
			Field::make( 'select', 'mappers_section_label_tag', __( 'Ярлик - тег', 'mappers' ) )
				->set_width( 20 )
				->set_options(
					array(
						'div' => 'div',
						'h1'  => 'h1',
						'h2'  => 'h2',
						'h3'  => 'h3',
						'h4'  => 'h4',
						'h5'  => 'h5',
						'h6'  => 'h6',
					)
				)
				->set_default_value( 'div' ),
			Field::make( 'textarea', 'mappers_section_title', __( 'Заголовок', 'mappers' ) )
				->set_width( 80 )
				->set_rows( 3 ),
			Field::make( 'select', 'mappers_section_title_tag', __( 'Заголовок - тег', 'mappers' ) )
				->set_width( 20 )
				->set_options(
					array(
						'div' => 'div',
						'h1'  => 'h1',
						'h2'  => 'h2',
						'h3'  => 'h3',
						'h4'  => 'h4',
						'h5'  => 'h5',
						'h6'  => 'h6',
					)
				)
				->set_default_value( 'h2' ),
			Field::make( 'rich_text', 'mappers_section_desc', __( 'Опис', 'mappers' ) ),
			Field::make( 'color', 'mappers_section_bg', __( 'Фон блокa', 'mappers' ) )
					->set_palette( array( '#ffffff' ) ),
		);
	}
	return array();
}

add_action(
	'carbon_fields_register_fields',
	function () {

		/* options */
		Container::make( 'theme_options', __( 'Налаштування теми', 'mappers' ) )
			->add_tab(
				__( 'Основне', 'mappers' ),
				array(
					Field::make( 'text', 'mappers_credit_price', __( 'Ціна кредиту', 'mappers' ) )
						->set_attribute( 'type', 'number' ),
					Field::make( 'text', 'mappers_currency', __( 'Валюта', 'mappers' ) ),
				)
			)
			->add_tab(
				__( 'Футер', 'mappers' ),
				array(
					Field::make( 'image', 'mappers_footer_logo', __( 'Лого', 'mappers' ) ),
					Field::make( 'complex', 'mappers_offices', __( 'Офіси', 'mappers' ) )
						->set_collapsed( true )
						->set_layout( 'tabbed-vertical' )
						->add_fields(
							array(
								Field::make( 'textarea', 'office', __( 'Офіс', 'mappers' ) ),
							)
						)
						->set_header_template( '<%= office %>' ),
					Field::make( 'textarea', 'mappers_tels', __( 'Телефон', 'mappers' ) )
						->set_rows( 3 ),
					Field::make( 'textarea', 'mappers_emails', __( 'Пошта', 'mappers' ) )
						->set_rows( 3 ),
					Field::make( 'text', 'mappers_viber', __( 'Viber', 'mappers' ) ),
					Field::make( 'text', 'mappers_telegram', __( 'Telegram', 'mappers' ) ),
					Field::make( 'text', 'mappers_whatsapp', __( 'Whatsapp', 'mappers' ) ),
					Field::make( 'text', 'mappers_youtube', __( 'Youtube', 'mappers' ) ),
					Field::make( 'text', 'mappers_linkedin', __( 'Linkedin', 'mappers' ) ),
					Field::make( 'text', 'mappers_facebook', __( 'Facebook', 'mappers' ) ),
					Field::make( 'text', 'mappers_instagram', __( 'Instagram', 'mappers' ) ),
					Field::make( 'text', 'mappers_tiktok', __( 'Tiktok', 'mappers' ) ),
					Field::make( 'textarea', 'mappers_trustpilot', __( 'Trustpilot', 'mappers' ) )
						->set_rows( 3 ),
					Field::make( 'text', 'mappers_copyright', __( 'Копирайт', 'mappers' ) )
						->set_help_text( __( '{Y} - Поточний рік', 'mappers' ) ),
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
					Field::make( 'image', 'mappers_img', __( 'Зображення', 'mappers' ) ),
					Field::make( 'text', 'mappers_expert_link', __( 'Посилання на сторінку експерта', 'mappers' ) ),
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
									'type'      => 'post',
									'post_type' => 'mappers-package',
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

		/* audit-page */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_template', '=', 'page-audit.php' )
			->add_tab(
				__( 'Загальне', 'mappers' ),
				array(
					Field::make( 'text', 'mappers_version', __( 'Версія', 'mappers' ) ),
				),
			)
			->add_tab(
				__( 'Строки для аудиту', 'mappers' ),
				array(

					Field::make( 'text', 'mappers_start_label', __( 'Старт - етикетка', 'mappers' ) ),
					Field::make( 'text', 'mappers_start_title', __( 'Старт - заголовок', 'mappers' ) ),
					Field::make( 'textarea', 'mappers_start_desc', __( 'Старт - опис', 'mappers' ) )
						->set_rows( 3 ),
					Field::make( 'text', 'mappers_start_btn', __( 'Старт - кнопка', 'mappers' ) ),

					Field::make( 'text', 'mappers_intro', __( 'Вступ', 'mappers' ) ),
					Field::make( 'text', 'mappers_intro_label', __( 'Вступ - етикетка', 'mappers' ) ),
					Field::make( 'text', 'mappers_questions', __( 'Питання', 'mappers' ) ),
					Field::make( 'text', 'mappers_go_to_questions', __( 'Перейти до питань', 'mappers' ) ),
					Field::make( 'text', 'mappers_do', __( 'Що зробити', 'mappers' ) ),
					Field::make( 'text', 'mappers_desc_info', __( 'Опис пункту', 'mappers' ) ),
					Field::make( 'text', 'mappers_next_question', __( 'Наступне питання', 'mappers' ) ),
					Field::make( 'text', 'mappers_next_section', __( 'Наступний розділ', 'mappers' ) ),
					Field::make( 'text', 'mappers_end', __( 'Завершити', 'mappers' ) ),

					Field::make( 'text', 'mappers_finish_label', __( 'Фініш - етикетка', 'mappers' ) ),
					Field::make( 'text', 'mappers_finish_title', __( 'Фініш - заголовок', 'mappers' ) ),
					Field::make( 'textarea', 'mappers_finish_desc', __( 'Фініш - опис', 'mappers' ) )
						->set_rows( 3 ),
					Field::make( 'text', 'mappers_finish_btn_list', __( 'Фініш - кнопка список', 'mappers' ) ),
					Field::make( 'text', 'mappers_finish_btn_result', __( 'Фініш - кнопка результат', 'mappers' ) ),
				),
			);

		/* audit */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_type', '=', 'mappers-audit' )
			->add_fields(
				array(
					Field::make( 'text', 'mappers_id', __( 'ID', 'mappers' ) ),
					Field::make( 'text', 'mappers_type', __( 'Тип', 'mappers' ) ),
					Field::make( 'text', 'mappers_version', __( 'Версія', 'mappers' ) ),
					Field::make( 'text', 'mappers_company', __( 'Компанія', 'mappers' ) ),
					Field::make( 'text', 'mappers_address', __( 'Адреса', 'mappers' ) ),
					Field::make( 'text', 'mappers_google_map', __( 'Посилання на профіль в Google Map', 'mappers' ) ),
					Field::make( 'textarea', 'mappers_audit', __( 'Аудит', 'mappers' ) ),
					Field::make( 'association', 'mappers_user', __( 'Користувач', 'mappers' ) )
						->set_types(
							array(
								array(
									'type'      => 'user',
									'post_type' => 'user',
								),
							)
						)
						->set_max( 1 ),
					Field::make( 'association', 'mappers_expert', __( 'Експерт', 'mappers' ) )
						->set_types(
							array(
								array(
									'type'      => 'user',
									'post_type' => 'user',
								),
							)
						)
						->set_max( 1 ),
					Field::make( 'rich_text', 'mappers_expert_comment', __( 'Коментар експерта', 'mappers' ) ),
				),
			);

		/* mappers-audit-quiz */

		$quiz_question_fields = array(
			Field::make( 'textarea', 'question', __( 'Запитання', 'mappers' ) )
				->set_rows( 2 ),
			Field::make( 'text', 'name', __( 'name', 'mappers' ) ),
			Field::make( 'select', 'input_type', __( 'Тип відповіді', 'mappers' ) )
				->set_options(
					array(
						'radio'    => 'radio',
						'checkbox' => 'checkbox',
						'custom'   => 'custom',
					)
				),

		);

		$quiz_question_info_fields = array(
			Field::make( 'rich_text', 'do', __( 'Що зробити', 'mappers' ) ),
			Field::make( 'rich_text', 'auditor_note', __( 'Ремарка для аудитора', 'mappers' ) ),
			Field::make( 'rich_text', 'desc', __( 'Опис', 'mappers' ) ),
		);

		$quiz_answer_fields = array(
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
						'black'   => 'Чорний',
					)
				),
		);

		$default_answer_value = array(
			array(
				'answer' => __( 'Так', 'mappers' ),
				'val'    => 'yes',
			),
			array(
				'answer' => __( 'Ні', 'mappers' ),
				'val'    => 'no',
			),
		);

		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_type', '=', 'mappers-audit-quiz' )
			->add_fields(
				array(
					Field::make( 'text', 'mappers_name', __( 'name', 'mappers' ) ),
					Field::make( 'rich_text', 'mappers_introduction', __( 'Вступ', 'mappers' ) ),
					Field::make( 'rich_text', 'mappers_report', __( 'Пояснення для звіту', 'mappers' ) ),
					Field::make( 'complex', 'mappers_quiz', __( 'Питання', 'mappers' ) )
						->set_collapsed( true )
						->set_layout( 'tabbed-vertical' )
						->add_fields(
							array_merge(
								$quiz_question_fields,
								array(
									Field::make( 'complex', 'answers', __( 'Відповіді', 'mappers' ) )
										->set_collapsed( true )
										->set_layout( 'tabbed-vertical' )
										->add_fields(
											array_merge(
												$quiz_answer_fields,
												array(
													Field::make( 'complex', 'sub_questions', __( 'Підзапитання', 'mappers' ) )
														->set_collapsed( true )
														->set_layout( 'tabbed-vertical' )
														->add_fields(
															array_merge(
																$quiz_question_fields,
																array(
																	Field::make( 'complex', 'answers', __( 'Відповіді', 'mappers' ) )
																		->set_collapsed( true )
																		->set_layout( 'tabbed-vertical' )
																		->add_fields(
																			$quiz_answer_fields
																		)
																		->set_header_template( '<%= answer %>' )
																		->set_default_value(
																			$default_answer_value
																		),

																),
																$quiz_question_info_fields,
															)
														)
														->set_header_template( '<small><%= ($_index + 1) %>.</small> <%= question %>' ),
												)
											)
										)
										->set_header_template( '<%= answer %>' )
										->set_default_value(
											$default_answer_value
										),
								),
								$quiz_question_info_fields,
								array(
									Field::make( 'text', 'condition', __( 'Умова відображення', 'mappers' ) ),
								),
							)
						)
						->set_header_template( '<small><%= ($_index + 1) %>.</small> <%= question %>' ),
					Field::make( 'text', 'mappers_condition', __( 'Умова відображення', 'mappers' ) ),
					Field::make( 'textarea', 'mappers_condition_alert', __( 'Умова - попередження', 'mappers' ) )
						->set_rows( 3 )
						->set_width( 50 ),
					Field::make( 'textarea', 'mappers_condition_ok', __( 'Умова - виконано', 'mappers' ) )
						->set_rows( 3 )
						->set_width( 50 ),
					Field::make( 'text', 'mappers_initial_score', __( 'Початкові бали', 'mappers' ) )
						->set_attribute( 'type', 'number' ),
				)
			);

		/* audit-page */
		Container::make( 'post_meta', __( 'Поля', 'mappers' ) )
			->where( 'post_template', '=', 'page-audits.php' )
			->add_fields(
				array(
					Field::make( 'image', 'mappers_icon', __( 'Іконка', 'mappers' ) ),
					Field::make( 'complex', 'mappers_audit_types', __( 'Типи аудитів', 'mappers' ) )
						->set_collapsed( true )
						->set_layout( 'tabbed-vertical' )
						->add_fields(
							array(
								Field::make( 'text', 'title', __( 'Назва', 'mappers' ) ),
								Field::make( 'text', 'name', __( 'name', 'mappers' ) ),
								Field::make( 'text', 'price', __( 'Ціна', 'mappers' ) ),
							)
						)
						->set_header_template( '<%= title %>' ),
					Field::make( 'image', 'mappers_google_map_info', __( 'Де взяти посилання на профіль в Google Map', 'mappers' ) ),
				)
			);
	}
);
