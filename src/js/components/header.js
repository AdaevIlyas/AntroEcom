export const header = () => {
  const header = document.querySelector(".header");

  if (header) {
    const mobileMenu = document.querySelector(".mobile-menu");
    if (window.innerWidth > 480) {
      header_scroll();
    } else {
      header_mobile_scroll();
    }

    document.addEventListener("scroll", function () {
      if (window.innerWidth > 480) {
        header_scroll();
      } else {
        header_mobile_scroll();
      }
    });

    function header_scroll() {
      if (window.pageYOffset > 0 && header) {
        header.classList.add("scroll");
      } else {
        header.classList.remove("scroll");
      }
    }

    function header_mobile_scroll() {
      if (window.pageYOffset > 0 && mobileMenu) {
        mobileMenu?.classList.add("scroll");
        header.classList.add("scroll");
      } else {
        mobileMenu?.classList.remove("scroll");
        header.classList.remove("scroll");
      }
    }
  }
};
