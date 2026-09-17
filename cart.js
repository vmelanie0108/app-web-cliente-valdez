document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cart__item');
    const itemCountEl = document.getElementById('item-count');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');
    const checkoutTotalEl = document.getElementById('checkout-total');
    const checkoutBtn = document.querySelector('.cart__checkout-btn');
    const cartCountEl = document.getElementById('cart-count');
    const promoInput = document.getElementById('promo-code');
    const promoBtn = document.querySelector('.cart__promo-btn');

    const FREE_SHIPPING_THRESHOLD = 50;
    const SHIPPING_COST = 5.99;

    function formatCurrency(value) {
        return '$' + value.toFixed(2);
    }

    function calculateTotals() {
        let subtotal = 0;
        let totalItems = 0;

        cartItems.forEach(item => {
            if (item.hidden) return;
            const qtyInput = item.querySelector('.cart__qty-input');
            const subtotalEl = item.querySelector('.cart__item-subtotal-value');
            const qty = parseInt(qtyInput.value) || 0;
            const unitPrice = parseFloat(subtotalEl.dataset.subtotal) || 0;
            const itemSubtotal = unitPrice * qty;

            subtotalEl.textContent = formatCurrency(itemSubtotal);
            subtotal += itemSubtotal;
            totalItems += qty;
        });

        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const discount = 0;
        const total = subtotal + shipping - discount;

        itemCountEl.textContent = totalItems;
        subtotalEl.textContent = formatCurrency(subtotal);
        shippingEl.textContent = shipping === 0 ? 'Gratis' : formatCurrency(shipping);
        discountEl.textContent = discount === 0 ? '-$0.00' : '-' + formatCurrency(discount);
        totalEl.textContent = formatCurrency(total);
        checkoutTotalEl.textContent = formatCurrency(total);

        checkoutBtn.disabled = totalItems === 0;
        cartCountEl.textContent = totalItems === 1 ? '1 producto' : totalItems + ' productos';

        const shippingNotice = document.querySelector('.cart__shipping-notice');
        if (shippingNotice) {
            if (subtotal >= FREE_SHIPPING_THRESHOLD) {
                shippingNotice.textContent = '¡Envío gratis aplicado!';
                shippingNotice.style.color = '#22c55e';
            } else {
                const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
                shippingNotice.textContent = `Agrega ${formatCurrency(remaining)} más para envío gratis`;
                shippingNotice.style.color = 'var(--color-text-muted)';
            }
        }
    }

    function setupQuantityControls(item) {
        const minusBtn = item.querySelector('.cart__qty-btn--minus');
        const plusBtn = item.querySelector('.cart__qty-btn--plus');
        const input = item.querySelector('.cart__qty-input');
        const maxStock = 99;

        minusBtn.addEventListener('click', () => {
            const current = parseInt(input.value) || 1;
            if (current > 1) {
                input.value = current - 1;
                input.dispatchEvent(new Event('change'));
            }
        });

        plusBtn.addEventListener('click', () => {
            const current = parseInt(input.value) || 1;
            if (current < maxStock) {
                input.value = current + 1;
                input.dispatchEvent(new Event('change'));
            }
        });

        input.addEventListener('change', () => {
            let value = parseInt(input.value) || 1;
            value = Math.max(1, Math.min(maxStock, value));
            input.value = value;
            input.setAttribute('aria-label', `Cantidad: ${value}`);
            calculateTotals();
        });

        input.addEventListener('blur', () => {
            let value = parseInt(input.value) || 1;
            value = Math.max(1, Math.min(maxStock, value));
            input.value = value;
        });
    }

    function setupRemoveButtons() {
        document.querySelectorAll('.cart__item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.cart__item');
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                item.style.transition = 'all 0.3s ease';

                setTimeout(() => {
                    item.hidden = true;
                    calculateTotals();
                    checkEmptyCart();
                }, 300);
            });
        });
    }

    function checkEmptyCart() {
        const visibleItems = document.querySelectorAll('.cart__item:not([hidden])');
        const emptyState = document.querySelector('.cart__empty-state');

        if (visibleItems.length === 0) {
            emptyState.hidden = false;
            document.querySelector('.cart__summary').style.display = 'none';
            document.querySelector('.cart__payment').style.display = 'none';
            document.querySelector('.cart__actions').style.display = 'none';
        } else {
            emptyState.hidden = true;
            document.querySelector('.cart__summary').style.display = 'block';
            document.querySelector('.cart__payment').style.display = 'block';
            document.querySelector('.cart__actions').style.display = 'flex';
        }
    }

    function setupPromoCode() {
        const validCodes = {
            'WELCOME10': 0.10,
            'SAVE20': 0.20,
            'VALDEZ15': 15
        };

        promoBtn.addEventListener('click', applyPromo);
        promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyPromo();
        });

        function applyPromo() {
            const code = promoInput.value.trim().toUpperCase();
            const helpEl = document.getElementById('promo-help');

            if (!code) {
                helpEl.textContent = 'Ingresa un código válido';
                helpEl.style.color = 'var(--color-accent)';
                return;
            }

            if (validCodes[code]) {
                const discount = validCodes[code];
                helpEl.textContent = `¡Código "${code}" aplicado correctamente!`;
                helpEl.style.color = '#22c55e';
                promoInput.disabled = true;
                promoBtn.disabled = true;
                promoBtn.textContent = 'Aplicado';
                recalculateWithDiscount(discount);
            } else {
                helpEl.textContent = 'Código no válido o expirado';
                helpEl.style.color = 'var(--color-accent)';
            }
        }

        function recalculateWithDiscount(discountValue) {
            let subtotal = 0;
            cartItems.forEach(item => {
                if (item.hidden) return;
                const qtyInput = item.querySelector('.cart__qty-input');
                const subtotalEl = item.querySelector('.cart__item-subtotal-value');
                const qty = parseInt(qtyInput.value) || 0;
                const unitPrice = parseFloat(subtotalEl.dataset.subtotal) || 0;
                subtotal += unitPrice * qty;
            });

            const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
            let discount = 0;

            if (typeof discountValue === 'number') {
                if (discountValue < 1) {
                    discount = subtotal * discountValue;
                } else {
                    discount = discountValue;
                }
            }

            const total = subtotal + shipping - discount;

            discountEl.textContent = '-' + formatCurrency(discount);
            totalEl.textContent = formatCurrency(total);
            checkoutTotalEl.textContent = formatCurrency(total);
        }
    }

    cartItems.forEach(setupQuantityControls);
    setupRemoveButtons();
    setupPromoCode();
    calculateTotals();
});