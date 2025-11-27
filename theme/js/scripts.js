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
