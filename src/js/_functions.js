// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from "./functions/check_client_width";

// Реализация бургер-меню
// import { burger } from './functions/burger';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Подключение свайпера
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });

// Подключение плавной прокрутки к якорям
// import SmoothScroll from "smooth-scroll";
// const scroll = new SmoothScroll('a[href*="#"]', {
//   position: "center"
// });

let links = document.querySelectorAll('a[href*="#"]');

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    try {
      e.preventDefault();

      const href = link.hash;

      const block = document.querySelector(`${href}`);

      if (link.classList.contains("mobile-menu__link")) {
        const mobileMenu = document.querySelector(".js-mobile-menu");
        const burger = document.querySelector(".js-burger");
        const menuBlack = document.querySelector(".mobile-menu__black");
        mobileMenu.classList.remove("mobile-menu__slide_open");

        document
          .querySelector(".mobile-menu__black")
          ?.classList.remove("mobile-menu__black_show");
        burger.classList.remove("mobile-menu__burger_open");
        burger.querySelector(".mobile-menu__burger-text").innerText = "Меню";
        enable_scroll();

        block.scrollIntoView({
          block: "center",
        });
      } else {
        block.scrollIntoView({
          block: "center",
        });
      }
    } catch (error) {}
  });
});

// функция блокировки и разблокировки скролла
// import { disable_scroll, enable_scroll } from "./functions/scroll";
// disable_scroll();
// enable_scroll();

// добавление маски на телефон
import phone_mask from "./functions/phone_mask";
import { enable_scroll } from "./functions/scroll";
phone_mask();

// функция для добавления ограничения символов
// import character_restriction from "./functions/character_restriction";
// добавлять атрибуты на поля
// data-ru-field - русские символы
// data-num-field - цифры
// data-eng-field - английские символы
// data-email-field - ограничение символов для почты
// data-allowed-field - создано для каких-то резиновых ограничений, можно менять
