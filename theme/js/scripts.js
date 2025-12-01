'use strict';

/* rem */

function mappersGetPxCssVar(variable, el) {
	el = el || document.documentElement;
	const cssVar = parseFloat(getComputedStyle(el).getPropertyValue(variable)) || 0;
	return cssVar;
}

function mappersConvertPxToRem(px) {
	const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
	return (px / rem).toFixed(3);
}

/* modal */

const mappersFixedElements = '.mappers-header, #wpadminbar';

const mappersModal = new AccessibleMinimodal({
	disableScroll: {
		jumpingElements: mappersFixedElements,
	},
	classes: {
		modal: 'mappers-modal',
		wrapp: 'mappers-modal-wrapp',
		body: 'mappers-modal-body',
		closeBtn: 'mappers-modal-btn-close',
		active: 'mappers-active',
		open: 'mappers-open',
		close: 'mappers-close',
	},
	on: {
		beforeOpen: instance => {
			if (instance.openBtn && instance.modal) {
				const modal = $(instance.modal);
				const btn = $(instance.openBtn);
				const fields = ['subject', 'post_type', 'post_id'];
				fields.forEach(el => {
					modal.find(`[name="${el}"]`).val('');
					if (btn.data(el)) {
						modal.find(`[name="${el}"]`).val(btn.data(el));
					}
				});
			}
		},
	},
	multiple: {
		use: true,
	},
});

$(document).ready(function () {
	const params = new URL(window.location.href).searchParams;
	if (params.get('modal')) {
		mappersModal.openModal('mappers-modal-' + params.get('modal'));
	}
	if (params.get('faq')) {
		const q = $(`#faq-${params.get('faq')}`)[0];
		if (q) {
			q.scrollIntoView({ behavior: 'smooth' });
		}
	}
});

$('.mappers-modal').on('accessible-minimodal:after-close', e => {
	const target = e.currentTarget;

	if (target) {
		$(target).find('.mappers-modal-wrapp').scrollTop(0);
	}

	const url = new URL(window.location.href);
	url.searchParams.delete('modal');
	window.history.replaceState({}, '', url.toString());
});

$(document).on('click', '[data-modal-toggle]', function () {
	const modalId = $(this).data('modal-toggle');
	mappersModal.closeAllModals();
	setTimeout(() => mappersModal.openModal(modalId), 400);
});

/* header */

mappersFixedHeader();
$(window).on('load scroll resize', mappersFixedHeader);

function mappersFixedHeader() {
	const header = $('.mappers-header');
	if ($(window).scrollTop() >= top) {
		header.addClass('mappers-fixed');
	} else {
		header.removeClass('mappers-fixed');
	}
}

/* header-nav */

$(document).on('click', '.mappers-header-nav-toggle', function () {
	const t = $(this);
	if (t.hasClass('mappers-active')) {
		mappersModal.closeModal('mappers-header-nav');
	} else {
		mappersModal.openModal('mappers-header-nav');
		t.addClass('mappers-active');
	}
});

if ($('#mappers-header-nav').length) {
	$('#mappers-header-nav').on('accessible-minimodal:before-close', () => {
		$('.mappers-header-nav-toggle').removeClass('mappers-active');
	});
}

/* header-menu */

$(document).on('click', '.mappers-header-menu .menu-item-has-children>a', function () {
	if (window.matchMedia('(min-width:1024px)').matches) {
		return false;
	}
	const li = $(this).closest('li');
	const subMenu = li.children('.sub-menu');
	if (li.hasClass('mappers-active')) {
		closeMenu();
	} else {
		closeMenu();
		li.addClass('mappers-active');
		subMenu.stop().slideDown(400);
	}
	function closeMenu() {
		const lis = li.parent().children('.menu-item-has-children');
		lis.removeClass('mappers-active');
		lis.children('.sub-menu').stop().slideUp(400);
	}
	return false;
});

/* scroll */

$(document).on('click', '.mappers-header-menu a', function () {
	const t = $(this);
	if (t.attr('href').startsWith('/#')) {
		const sectionName = t.attr('href').replace('/#', '');
		const section = $(`.mappers-section-${sectionName}`)[0];
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
		return false;
	}
});

/* mappers-accordion */

$(document).on('click', '.mappers-accordion-item-toggle', function () {
	const item = $(this).closest('.mappers-accordion-item');
	const accordion = item.closest('.mappers-accordion');

	if (item.hasClass('mappers-active')) {
		accordion.find('.mappers-accordion-item').removeClass('mappers-active');
	} else {
		accordion.find('.mappers-accordion-item').not(item).removeClass('mappers-active');
		item.addClass('mappers-active');
	}
	return false;
});

/* mappers-password-toggle */

$(document).on('click', '.mappers-password-toggle', function () {
	const t = $(this);
	const input = t.closest('.mappers-form-block').find('.mappers-input');
	if (input.attr('type') === 'text') {
		input.attr('type', 'password');
	} else {
		input.attr('type', 'text');
	}
	t.toggleClass('mappers-active');
});

/* mappers-form-notifications-close */

$(document).on('click', '.mappers-form-notifications-close', function () {
	$(this).closest('.mappers-form-notifications').removeClass('mappers-error mappers-success mappers-active');
});

/* mappers-login-form */

$(document).on('submit', '.mappers-login-form', function (e) {
	e.preventDefault();
	if (!window.wp_ajax) {
		return;
	}

	const t = $(this);

	if (t.hasClass('mappers-ajax-process')) {
		return;
	}
	t.addClass('mappers-ajax-process');

	const notifications = t.find('.mappers-form-notifications');
	const notificationsText = notifications.find('.mappers-form-notifications-text');
	notifications.removeClass('mappers-error mappers-active mappers-success');

	const action = t.data('action');

	const formData = new FormData(this);
	formData.append('action', `mappers_auth_${action}`);
	formData.append('nonce', wp_ajax.nonce);
	if (action !== 'forgot_password') {
		formData.append('redirect', location.href);
	}
	$.ajax({
		url: wp_ajax.url,
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			if (response.success) {
				if (response.data.redirect) {
					location.href = response.data.redirect;
					return;
				}
				if (action === 'forgot_password') {
					notificationsText.text(response.data.message);
					notifications.addClass('mappers-success mappers-active');
				}
			} else {
				notificationsText.text(response.data.message);
				notifications.addClass('mappers-error mappers-active');
			}
			t.removeClass('mappers-ajax-process');
		},
		error: error => {
			t.removeClass('mappers-ajax-process');
		},
	});
});

/* mappers-password-recovery-form */

$(document).on('submit', '.mappers-password-recovery-form', function (e) {
	e.preventDefault();
	if (!window.wp_ajax) {
		return;
	}

	const t = $(this);

	if (t.hasClass('mappers-ajax-process')) {
		return;
	}
	t.addClass('mappers-ajax-process');

	const notifications = t.find('.mappers-form-notifications');
	const notificationsText = notifications.find('.mappers-form-notifications-text');
	notifications.removeClass('mappers-error mappers-active mappers-success');

	const params = new URL(location.href).searchParams;

	const formData = new FormData(this);
	formData.append('action', 'mappers_auth_password_recovery');
	formData.append('key', params.get('key'));
	formData.append('login', params.get('login'));
	formData.append('nonce', wp_ajax.nonce);
	$.ajax({
		url: wp_ajax.url,
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			if (response.success) {
				if (response.data.redirect) {
					location.href = response.data.redirect;
					return;
				} else {
					location.href = location.href.split('?')[0];
				}
			} else {
				notificationsText.text(response.data.message);
				notifications.addClass('mappers-error mappers-active');
			}
			t.removeClass('mappers-ajax-process');
		},
		error: error => {
			t.removeClass('mappers-ajax-process');
		},
	});
});

/* mappers-profile-form */

$(document).on('submit', '.mappers-profile-form', function (e) {
	e.preventDefault();
	if (!window.wp_ajax) {
		return;
	}

	const t = $(this);

	if (t.hasClass('mappers-ajax-process')) {
		return;
	}
	t.addClass('mappers-ajax-process');

	const formData = new FormData(this);
	formData.append('action', 'mappers_profile_form');
	formData.append('nonce', wp_ajax.nonce);
	$.ajax({
		url: wp_ajax.url,
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			if (response.success) {
				location.reload();
			}
			t.removeClass('mappers-ajax-process');
		},
		error: error => {
			t.removeClass('mappers-ajax-process');
		},
	});
});

/* mappers-profile-delete-submit */

$(document).on('click', '.mappers-profile-delete-submit', function () {
	if (!window.wp_ajax) {
		return;
	}

	const t = $(this);

	if (t.hasClass('mappers-ajax-process')) {
		return;
	}
	t.addClass('mappers-ajax-process');

	const formData = new FormData();
	formData.append('action', 'mappers_profile_delete');
	formData.append('nonce', wp_ajax.nonce);
	$.ajax({
		url: wp_ajax.url,
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			if (response.data.redirect) {
				t.data('redirect', response.data.redirect);
				t.closest('.mappers-modal-profile-delete')
					.find('.mappers-modal-profile-delete-tab')
					.toggleClass('mappers-active');
				return;
			}
			t.removeClass('mappers-ajax-process');
		},
		error: error => {
			t.removeClass('mappers-ajax-process');
		},
	});
});

$('#mappers-modal-profile-delete').on('accessible-minimodal:after-close', function () {
	const redirect = $(this).find('.mappers-profile-delete-submit').data('redirect');
	if (redirect) {
		location.href = redirect;
	}
});

/* mappers-new-password-form */

$(document).on('submit', '.mappers-new-password-form', function (e) {
	e.preventDefault();
	if (!window.wp_ajax) {
		return;
	}

	const t = $(this);

	if (t.hasClass('mappers-ajax-process')) {
		return;
	}
	t.addClass('mappers-ajax-process');

	const notifications = t.find('.mappers-form-notifications');
	const notificationsText = notifications.find('.mappers-form-notifications-text');
	notifications.removeClass('mappers-error mappers-active mappers-success');

	const formData = new FormData(this);
	formData.append('action', 'mappers_auth_password_change');
	formData.append('nonce', wp_ajax.nonce);
	$.ajax({
		url: wp_ajax.url,
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			if (response.data.message) {
				notificationsText.text(response.data.message);
				notifications.addClass('mappers-error mappers-active');
			}
			if (response.success) {
				notifications.addClass('mappers-success mappers-active');
			} else {
				notifications.addClass('mappers-error mappers-active');
			}
			t.removeClass('mappers-ajax-process');
		},
		error: error => {
			t.removeClass('mappers-ajax-process');
		},
	});
});

/* mappers-google-auth-btn */

$(document).on('click', '.mappers-google-auth-btn', function () {
	const t = $(this);
	const form = t.closest('.mappers-login-form');
	const url = new URL(t.data('url'));
	const nonce = url.searchParams.get('state');
	const stateObj = {
		nonce: nonce,
		redirect: location.href,
	};
	const state = btoa(JSON.stringify(stateObj));
	url.searchParams.set('state', state);

	const notifications = form.find('.mappers-form-notifications');
	const notificationsText = notifications.find('.mappers-form-notifications-text');
	notifications.removeClass('mappers-error mappers-active mappers-success');

	const width = 500;
	const height = window.innerHeight;
	const left = (window.screen.width - width) / 2;
	const top = (window.screen.height - height) / 2;

	const popup = window.open(url, 'googleLogin', `width=${width},height=${height},left=${left},top=${top}`);

	window.addEventListener('message', function messageHandler(event) {
		if (event.origin !== window.location.origin) {
			return;
		}

		const data = event.data;

		if (data.success) {
			if (data.redirect) {
				location.href = data.redirect;
			} else {
				this.location.reload();
			}
		} else {
			notificationsText.text(data.message);
			notifications.addClass('mappers-error mappers-active');
		}

		window.removeEventListener('message', messageHandler);
	});
});
