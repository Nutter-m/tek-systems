const sliders = document.querySelectorAll('.slider');
const prevButtons = document.querySelectorAll('.slider-control.prev');
const nextButtons = document.querySelectorAll('.slider-control.next');
 const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
 const checkoutButton = document.getElementById('checkout-button');
 let cart = [];
//управление слайдером
sliders.forEach((slider, index) => {
    const slides = slider.querySelectorAll('.slide');
    const prevButton = prevButtons[index];
    const nextButton = nextButtons[index];
    let slideIndex = 0;
    const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slides[0]).marginRight);

    function updateSliderPosition() {
        slider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    }

    function moveSlide(direction) {
         if (direction === 'next') {
             slideIndex = (slideIndex + 1) % slides.length;
        } else if (direction === 'prev') {
             slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        }
          updateSliderPosition();
     }

     prevButton.addEventListener('click', () => moveSlide('prev'));
    nextButton.addEventListener('click', () => moveSlide('next'));
  });

 //добавление товаров в корзину
addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
            const productDiv = this.closest('.product');
            const productId = productDiv.getAttribute('data-product-id');
            const productName = productDiv.getAttribute('data-product-name');
            const productPrice = parseFloat(productDiv.getAttribute('data-product-price'));

            const productInCart = cart.find(item => item.id === productId);
            if (productInCart){
                 productInCart.quantity++;
              } else {
                 cart.push({id: productId, name: productName, price: productPrice, quantity: 1});
            }
             updateCart();
              checkoutButton.disabled = cart.length === 0;
      });
  });
 //увеличение количества товара

function updateCart() {
     cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
       const listItem = document.createElement('li');
       const totalPrice = item.price * item.quantity;
       listItem.innerHTML = `
                <span>${item.name} x ${item.quantity} - ${totalPrice} руб.</span>
                <button data-product-id="${item.id}" class="remove-from-cart">Удалить</button>
             `;
       cartItemsList.appendChild(listItem);
       total += totalPrice;
    });
  cartTotalSpan.textContent = total;
     sessionStorage.setItem('cartTotal', total) //сохранение общей стоимости в sessionStorage
  removeButton();
 }
 //удаление товара из корзины
function removeButton() {
     const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
       button.addEventListener('click', function(){
            const productId = this.getAttribute('data-product-id');
             cart = cart.filter(item => item.id !== productId);
             updateCart();
             checkoutButton.disabled = cart.length === 0;
       });
     });
 }
//переход на страницу order.html
  checkoutButton.addEventListener('click', function() {
        const cartJSON = JSON.stringify(cart); //сериализация данных
      //передаем данные через URL параметры
       window.location.href = `order.html?cart=${encodeURIComponent(cartJSON)}`;
    });