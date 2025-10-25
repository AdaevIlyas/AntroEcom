export default function differenceHover() {
  const differenceItems = document.querySelectorAll(".difference__item");

  differenceItems.forEach((item) => {
    const hoverElement = item.querySelector(".difference__item-hover");

    item.addEventListener("mouseenter", (e) => {
      hoverElement.classList.add("active");
      positionHoverElement(e, hoverElement, item);
    });

    item.addEventListener("mousemove", (e) => {
      positionHoverElement(e, hoverElement, item);
    });

    item.addEventListener("mouseleave", () => {
      hoverElement.classList.remove("active");
    });
  });

  function positionHoverElement(e, hoverElement, parentItem) {
    const rect = parentItem.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Позиция X внутри элемента
    const mouseY = e.clientY - rect.top; // Позиция Y внутри элемента
    const offset = 20; // Отступ от курсора

    // Позиционируем относительно родительского элемента
    hoverElement.style.left = mouseX + offset + "px";
    hoverElement.style.top = mouseY + offset + "px";
  }
}
