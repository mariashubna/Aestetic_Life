let titlePrograms = document.querySelectorAll(".spec-programs-item-title");
let dropDowns = document.querySelectorAll(".spec-programs-item__content");

// Add a click event listener to each title element
titlePrograms.forEach((titleProgram, index) => {
    titleProgram.addEventListener("click", () => {
        // Toggle the "spec-programs-item__content-active" class on the corresponding dropdown element
        dropDowns[index].classList.toggle("spec-programs-item__content-active");
        titlePrograms[index].classList.toggle("spec-programs-item-title-active");
    });
});


(() => {
    const mobileMenu = document.querySelector('.js-menu-container');
    const openMenuBtn = document.querySelector('.js-open-menu');
    const closeMenuBtn = document.querySelector('.js-close-menu');
    const menuItems = document.querySelectorAll('.mobile-menu__item');

    const toggleMenu = () => {
        const isMenuOpen =
            openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
        mobileMenu.classList.toggle('is-open');

        const scrollLockMethod = !isMenuOpen
            ? 'disableBodyScroll'
            : 'enableBodyScroll';
        // bodyScrollLock[scrollLockMethod](document.body);
    };

    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu(); // Закрывает модальное окно при нажатии на элемент меню
        });
    });

    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
        if (!e.matches) return;
        mobileMenu.classList.remove('is-open');
        openMenuBtn.setAttribute('aria-expanded', false);
    });
})();





// ----- bg-slider -----


document.addEventListener("DOMContentLoaded", function () {
    const counterBlockColor = document.querySelector(".header-counter-block-color");

    const slides = [
        {
            text: "Lift or go f*rk",
            simpleText: "",
            bgImage: "url(/images/bg-mobile-1.jpg)",
        },
        {
            text: "Philosophy",
            simpleText: "of Aesthetic Life",
            bgImage: "url(../images/bg-mobile-2.jpg)",
        },
        {
            text: "Push",
            secondText: "or Die",
            simpleText: "",
            bgImage: "url(../images/bg-mobile-3.jpg)",
        },
    ];

    const maxColorHeight = 70;
    const slideCount = slides.length;

    const initialColorHeight = maxColorHeight / slideCount;
    counterBlockColor.style.height = initialColorHeight + 'px';

    // Отримайте посилання на елементи слайдера та контейнер .header-counter-block-color
    const counterText = document.querySelector(".header-counter-text");

    // Останній відомий індекс слайду
    let lastSlideIndex = 0;

    // Ваш існуючий код для слайдера
    const slideContainer = document.querySelector(".header");
    const nextButton = document.querySelector(".header-scroll-btn:nth-child(2)");
    const prevButton = document.querySelector(".header-scroll-btn:nth-child(1)");

    let currentSlide = 0;

    function updateSlide() {
        const slide = slides[currentSlide];
        slideContainer.style.backgroundImage = slide.bgImage;
        slideContainer.querySelector(".header-content-text").textContent = slide.text;
        slideContainer.querySelector(".header-content-second").textContent = slide.secondText;
        slideContainer.querySelector(".header-simple-text").textContent = slide.simpleText;

        // Установите начальную высоту .header-counter-block-color на максимальное значение
        if (currentSlide === 0) {
            counterBlockColor.style.height = maxColorHeight + "px";
            updateCounterTextAndColor(0); 
        } else {
            updateCounterTextAndColor(currentSlide);
        }

        // Оновлюємо значення лічильника
        lastSlideIndex = currentSlide;
        updateCounterTextAndColor(lastSlideIndex);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    // Добавьте обробники подій для кнопок
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Запускаємо оновлення при завантаженні
    updateSlide();

    // Оновлення значень .header-counter-text та .header-counter-block-color
    function updateCounterTextAndColor(slideIndex) {
        // Оновлюємо текст у .header-counter-text
        const slideNumber = (slideIndex + 1).toString().padStart(2, "0"); // Перетворюємо номер слайда на формат "01", "02", ...
        counterText.textContent = slideNumber;
    
        // Оновлюємо висоту .header-counter-block-color
        const colorHeight = ((slideIndex + 1) / slideCount) * maxColorHeight; // Розрахунок висоти
        counterBlockColor.style.height = colorHeight + "px";
    }
});
