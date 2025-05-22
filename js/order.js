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

    // Show the order confirmation alert first
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

    createReviewModal(name, phone, email, address, orderDate, comments, deliveryDate);
});

function createReviewModal(name, phone, email, address, orderDate, comments, deliveryDate) {
    // Create the review modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        padding: 15px;
        background-color: rgba(136, 0, 0, 0.64);
        border: 3px solid yellow;
    `;

    const ratingLabel = document.createElement('label');
    ratingLabel.textContent = 'Оцените заказ (звезды):';
    modalContent.appendChild(ratingLabel);

    const starContainer = document.createElement('div');
    starContainer.id = 'starRating';
    starContainer.style.cssText = `
        font-size: 2em;
        color: gold;
        cursor: pointer;
    `;

    let selectedRating = 0;  

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '☆';
        star.dataset.value = i;
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value);
            updateStars(selectedRating);
        });
        starContainer.appendChild(star);
    }

    function updateStars(rating) {
        for (let i = 0; i < starContainer.children.length; i++) {
            if (i < rating) {
                starContainer.children[i].textContent = '★';
            } else {
                starContainer.children[i].textContent = '☆';
            }
        }
    }

    modalContent.appendChild(starContainer);

    const reviewLabel = document.createElement('label');
    reviewLabel.textContent = 'Добавьте отзыв:';
    modalContent.appendChild(reviewLabel);

    const reviewTextarea = document.createElement('textarea');
    reviewTextarea.id = 'orderReview';
    reviewTextarea.rows = 4;
    reviewTextarea.cols = 50;
    modalContent.appendChild(reviewTextarea);

    const submitReviewButton = document.createElement('button');
    submitReviewButton.textContent = 'Отправить отзыв';
    submitReviewButton.addEventListener('click', function() {
        const review = document.getElementById('orderReview').value;


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
            Оценка заказа: ${selectedRating} звезд
            Отзыв: ${review}
        `);
        document.body.removeChild(modal); 
    });
    modalContent.appendChild(submitReviewButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', function() {
        document.body.removeChild(modal); 
    });
    modalContent.appendChild(cancelButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

cancelButton.addEventListener('click', function() {
    window.location.href = 'index.html'; // перенаправление на index.html
});


 modal.classList.add('modal');
    modalContent.classList.add('modal-content')