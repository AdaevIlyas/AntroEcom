import { disable_scroll, enable_scroll } from "../functions/scroll";

export const mobileMenu = () => {
  const mobileMenu = document.querySelector(".js-mobile-menu");
  const burger = document.querySelector(".js-burger");
  const menuBlack = document.querySelector(".mobile-menu__black");

  if (mobileMenu && burger) {
    burger.addEventListener("click", function () {
      document
        .querySelector(".mobile-menu__black")
        ?.classList.toggle("mobile-menu__black_show");

      burger_toggle();

      mobileMenu.classList.toggle("mobile-menu__slide_open");
    });
  }

  function burger_toggle() {
    burger.classList.toggle("mobile-menu__burger_open");

    if (burger.querySelector(".mobile-menu__burger-text").innerText == "Меню") {
      burger.querySelector(".mobile-menu__burger-text").innerText = "Закрыть";
      disable_scroll();
    } else {
      burger.querySelector(".mobile-menu__burger-text").innerText = "Меню";
      enable_scroll();
    }
  }

  if (menuBlack && burger) {
    menuBlack.addEventListener("mousedown", function (e) {
      if (e.target.classList.contains("mobile-menu__black_show")) {
        burger_toggle();
        document
          .querySelector(".mobile-menu__black_show")
          ?.classList.remove("mobile-menu__black_show");
        document
          .querySelector(".mobile-menu__slide_open")
          ?.classList.remove("mobile-menu__slide_open");
      }
    });
  }
};
