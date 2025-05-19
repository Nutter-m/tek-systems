const urlParams = new URLSearchParams(window.location.search);
const cartJSON = urlParams.get('cart');
const orderItemsList = document.getElementById('order-items');
const orderTotalSpan = document.getElementById('order-total');
const orderForm = document.getElementById('order-form');
const cancelButton = document.getElementById('cancel-order-button');
let cart = [];
let savedTotal = sessionStorage.getItem('cartTotal');

if (cartJSON) {
    try {
        cart = JSON.parse(decodeURIComponent(cartJSON));
    } catch (error) {
        console.error('Ошибка при парсинге данных корзины', error);
        alert('Ошибка при обработке данных корзины');
    }
    updateOrderDetails();
}

function updateOrderDetails() {
    orderItemsList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        const totalPrice = item.price * item.quantity;
        listItem.innerHTML = `${item.name} x ${item.quantity} - ${totalPrice} руб.`;
        orderItemsList.appendChild(listItem);
        total += totalPrice;
    });
    if (savedTotal) {
        orderTotalSpan.textContent = savedTotal;
    } else {
        orderTotalSpan.textContent = total;
    }
}

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const orderDate = document.getElementById('date').value; 
    const comments = document.getElementById('comments').value;
    const deliveryDate = document.getElementById('delivery-date').value;
   

    alert(`
        Заказ оформлен:
        Компания: ${name}
        Телефон: ${phone}
        Email: ${email}
        Адрес доставки: ${address}
        Дата заказа: ${orderDate}
        Дата поставки: ${deliveryDate}
        Комментарии: ${comments}  
        Детали заказа:
        ${orderItemsList.textContent}
        Итого: ${orderTotalSpan.textContent} руб.
        `);
});

cancelButton.addEventListener('click', function() {
    window.location.href = 'index.html'; // перенаправление на index.html
});
