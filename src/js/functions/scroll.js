let distance = 0;

export function disable_scroll() {
  distance = window.pageYOffset;
  document.querySelector(".page").classList.add("dis-scroll");
  document.querySelector(".page__body").scrollTo({
    top: distance,
    left: 0
  });
}

export function enable_scroll() {
  document.querySelector(".page").classList.remove("dis-scroll");
  if (distance != 0) {
    window.scrollTo({
      top: distance,
      left: 0
    });
  }
}
