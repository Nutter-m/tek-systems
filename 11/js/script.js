const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let index = 0;
let isScrolling = false;

function nextSlide() {
    if (!isScrolling) {
        index = (index + 1) % slides.length;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
}

setInterval(nextSlide, 3000); // Меняем слайд каждые 3 секунды

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                isScrolling = true; // Устанавливаем флаг, что началась прокрутка
                window.scrollTo({
                   top: targetElement.offsetTop -150, /*отступ для хедера*/
                   behavior: 'smooth'
               });
                setTimeout(() => {
                    isScrolling = false; // Сбрасываем флаг по завершении прокрутки
                 }, 500); // Задержка, чтоб прокрутка успела сработать
             }
        });
    });

ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [54.629239, 39.732762], // Координаты центра карты (Рязань, Маяковского, 1а)
        zoom: 16 // Масштаб
    });
    var myPlacemark = new ymaps.Placemark([54.629239, 39.732762], {
       balloonContent: 'ООО "ТЭК-СИСТЕМС"' // Балун
    });
    myMap.geoObjects.add(myPlacemark);
}
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("orderModal");

    const orderLink = document.getElementById("orderLink");

    const span = document.querySelector("#orderModal .close"); 

    orderLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        modal.style.display = "block";
    });

    span.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("adminLoginModal");
    const loginLink = document.getElementById("adminLoginLink");
    const span = document.querySelector("#adminLoginModal .close");

    if (loginLink) {
        loginLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (modal) {
                modal.style.display = "block";
            } else {
                console.error("Модальное окно авторизации администратора не найдено!");
            }
        });
    } else {
        console.error("Ссылка на авторизацию администратора не найдена!");
    }

    if (span) {
        span.addEventListener('click', function() {
            if (modal) {
                modal.style.display = "none";
            } else {
                console.error("Модальное окно авторизации администратора не найдено при попытке закрытия!");
            }
        });
    } else {
        console.error("Кнопка закрытия окна авторизации администратора не найдена!");
    }

    window.onclick = function(event) {
        if (event.target == modal && modal) {
            modal.style.display = "none";
        }
    }

    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            document.querySelectorAll('#adminLoginModal .error-message').forEach(el => el.textContent = '');
            document.getElementById('adminFormError').textContent = '';
            document.getElementById('adminSuccessMessage').textContent = '';
    
            const adminUsername = document.getElementById('adminUsername').value;
            const adminPassword = document.getElementById('adminPassword').value;
    
            let formIsValid = true;
            if (!adminUsername) {
                document.getElementById('adminUsernameError').textContent = "Пожалуйста, введите имя пользователя.";
                formIsValid = false;
            }
            if (!adminPassword) {
                document.getElementById('adminPasswordError').textContent = "Пожалуйста, введите пароль.";
                formIsValid = false;
            }
    
            if (!formIsValid) {
                return;
            }
    
            if (adminUsername === 'admin' && adminPassword === '987654321') {
                document.getElementById('adminSuccessMessage').textContent = "Авторизация прошла успешно!";
                const modal = document.getElementById("adminLoginModal");
                if (modal) {
                    modal.style.display = "none";
                }
    
            } else {
                document.getElementById('adminFormError').textContent = "Неверное имя пользователя или пароль.";
            }
        });
    } else {
        console.error("Форма авторизации администратора не найдена!");
    }
});