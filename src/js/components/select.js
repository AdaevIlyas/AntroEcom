export const select = () => {
  const selects = document.querySelectorAll(".select");

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".select")) {
      document.querySelectorAll(".select__list_open").forEach((list) => {
        list.classList.remove("select__list_open");
      });
    }
  });

  for (let select of selects) {
    let options = select.querySelectorAll(".select__option");
    let valueInput = select.querySelector(".select__value"); // это input
    let list = select.querySelector(".select__list");

    valueInput.addEventListener("click", function (e) {
      e.stopPropagation();

      document.querySelectorAll(".select__list_open").forEach((openList) => {
        if (openList !== list) {
          openList.classList.remove("select__list_open");
        }
      });

      list.classList.toggle("select__list_open");
    });

    for (let option of options) {
      option.addEventListener("click", function (e) {
        e.stopPropagation();

        // Правильно устанавливаем значение для input
        const selectedValue = option.dataset.value || option.textContent.trim();
        valueInput.value = selectedValue;

        setTimeout(() => {
          list.classList.remove("select__list_open");
        }, 1);

        // Дополнительные события если нужны
        valueInput.dispatchEvent(new Event("input", { bubbles: true }));
        valueInput.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
  }
};
