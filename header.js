/* Header y navegación centralizados para todas las vistas.
   Se inyecta en <div id="site-header"></div> de cada página. */
(function () {
    'use strict';

    /* Detecta la página actual para marcar el enlace activo */
    var currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    var NAV_ITEMS = [
        { label: 'Mujer',      href: 'categoria-mujer.html',    match: ['categoria-mujer.html', 'polerones-mujer.html'] },
        { label: 'Hombre',     href: 'categoria-hombre.html',   match: ['categoria-hombre.html'] },
        { label: 'Niños',      href: 'categoria-ninos.html',    match: ['categoria-ninos.html'] },
        { label: 'Tendencia',  href: 'categoria-deportes.html', match: [] },
        { label: 'Deportes',   href: 'categoria-deportes.html', match: ['categoria-deportes.html'] }
    ];

    var CATEGORY_ITEMS = [
        { label: 'Zapatillas', href: '#' },
        { label: 'Ropa',       href: '#' },
        { label: 'Polerones',  href: 'polerones-mujer.html', match: ['polerones-mujer.html'] },
        { label: 'Chaquetas',  href: '#' }
    ];

    function navLink(item, baseClass, activeClass) {
        var isActive = (item.match || []).indexOf(currentFile) !== -1;
        var cls = baseClass + (isActive ? ' ' + activeClass : '');
        var current = isActive ? ' aria-current="page"' : '';
        return '<li><a href="' + item.href + '" class="' + cls + '"' + current + '>' + item.label + '</a></li>';
    }

    var mainNav = NAV_ITEMS.map(function (item) {
        return navLink(item, 'header__nav-link', 'header__nav-link--active');
    }).join('\n                ');

    var categoriesNav = CATEGORY_ITEMS.map(function (item) {
        return '<li><a href="' + item.href + '" class="categories__link"' +
            ((item.match || []).indexOf(currentFile) !== -1 ? ' aria-current="page"' : '') +
            '>' + item.label + '</a></li>';
    }).join('\n            ');

    var html =
        '<header class="header">' +
            '<div class="header__top-bar">' +
                '<div class="header__utility-container">' +
                    '<p>Envío gratis en pedidos superiores a 50$ | Devoluciones 30 días</p>' +
                '</div>' +
            '</div>' +
            '<div class="header__main">' +
                '<div class="header__logo-container">' +
                    '<a href="index.html" class="header__logo">VALDEZ</a>' +
                '</div>' +
                '<div class="header__search-container">' +
                    '<form class="header__search-form" role="search">' +
                        '<label for="search-input" class="visually-hidden">Buscar productos</label>' +
                        '<input type="search" id="search-input" name="q" placeholder="¿Qué buscas?" class="header__search-input">' +
                        '<button type="submit" class="header__search-btn">Buscar</button>' +
                    '</form>' +
                '</div>' +
                '<div class="header__user-container">' +
                    '<nav class="header__user-menu" aria-label="Menú de usuario">' +
                        '<ul class="header__user-list">' +
                            '<li><a href="login.html" class="header__user-link">Iniciar sesión</a></li>' +
                            '<li><a href="register.html" class="header__user-link">Registrarse</a></li>' +
                            '<li><a href="cart.html" class="header__user-link" aria-label="Carrito de compras">🛒</a></li>' +
                        '</ul>' +
                    '</nav>' +
                '</div>' +
            '</div>' +
            '<nav class="header__main-nav" aria-label="Navegación principal">' +
                '<ul class="header__nav-list">' +
                mainNav +
                '</ul>' +
            '</nav>' +
        '</header>' +
        '<nav class="categories-nav" aria-label="Categorías de productos">' +
            '<ul class="categories__list">' +
            categoriesNav +
            '</ul>' +
        '</nav>';

    var container = document.getElementById('site-header');
    if (container) {
        container.outerHTML = html;
    } else {
        document.body.insertAdjacentHTML('afterbegin', html);
    }
})();
