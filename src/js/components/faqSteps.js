export default function faqSteps() {
  // Инициализация при загрузке DOM
  document.addEventListener("DOMContentLoaded", function () {
    // initFaqTabs();
    initFaqQuestions();
  });

  // function initFaqTabs() {
  //   const tabs = document.querySelectorAll(".faq__tab");
  //   const steps = document.querySelectorAll(".faq__step");

  //   tabs.forEach((tab) => {
  //     tab.addEventListener("click", function () {
  //       const step = this.getAttribute("data-step");

  //       // Убираем активный класс у всех табов
  //       tabs.forEach((t) => t.classList.remove("active"));
  //       // Добавляем активный класс текущему табу
  //       this.classList.add("active");

  //       // Скрываем все шаги
  //       steps.forEach((s) => s.classList.remove("active"));
  //       // Показываем выбранный шаг
  //       const activeStep = document.querySelector(
  //         `[data-step-block="${step}"]`
  //       );
  //       if (activeStep) {
  //         activeStep.classList.add("active");
  //       }

  //       // Сбрасываем активный вопрос при смене категории
  //       resetActiveQuestion();
  //     });
  //   });
  // }

  function initFaqQuestions() {
    const questions = document.querySelectorAll(".faq__question");

    questions.forEach((question) => {
      question.addEventListener("click", function () {
        const messageId = this.getAttribute("data-message");
        const stepBlock = this.closest(".faq__step");

        // Убираем активный класс у всех вопросов в текущем шаге
        const allQuestionsInStep = stepBlock.querySelectorAll(".faq__question");
        allQuestionsInStep.forEach((q) => q.classList.remove("active"));

        // Добавляем активный класс текущему вопросу
        this.classList.add("active");

        // Скрываем все сообщения в текущем шаге
        const allMessages = stepBlock.querySelectorAll(".faq__messages");
        allMessages.forEach((m) => m.classList.remove("active"));

        // Показываем выбранное сообщение
        const activeMessage = stepBlock.querySelector(
          `[data-message-block="${messageId}"]`
        );
        if (activeMessage) {
          activeMessage.classList.add("active");
        }
      });
    });
  }

  function resetActiveQuestion() {
    const activeStep = document.querySelector(".faq__step.active");
    if (!activeStep) return;

    // Сбрасываем активный вопрос
    const activeQuestion = activeStep.querySelector(".faq__question.active");
    if (activeQuestion) {
      activeQuestion.classList.remove("active");
    }

    // Сбрасываем активное сообщение
    const activeMessage = activeStep.querySelector(".faq__messages.active");
    if (activeMessage) {
      activeMessage.classList.remove("active");
    }

    // Активируем первый вопрос по умолчанию
    const firstQuestion = activeStep.querySelector(".faq__question");
    const firstMessageId = firstQuestion?.getAttribute("data-message");

    if (firstQuestion && firstMessageId) {
      firstQuestion.classList.add("active");

      const firstMessage = activeStep.querySelector(
        `[data-message-block="${firstMessageId}"]`
      );
      if (firstMessage) {
        firstMessage.classList.add("active");
      }
    }
  }

  // Публичные методы для внешнего использования
  return {
    // Переключение на конкретную вкладку по номеру
    switchToTab: function (stepNumber) {
      const tab = document.querySelector(
        `.faq__tab[data-step="${stepNumber}"]`
      );
      if (tab) {
        tab.click();
      }
    },

    // Переключение на конкретный вопрос
    switchToQuestion: function (stepNumber, messageNumber) {
      this.switchToTab(stepNumber);

      // Ждем немного для применения изменений DOM
      setTimeout(() => {
        const question = document.querySelector(
          `.faq__step[data-step-block="${stepNumber}"] .faq__question[data-message="${stepNumber}.${messageNumber}"]`
        );
        if (question) {
          question.click();
        }
      }, 50);
    },

    // Получение текущего активного состояния
    getCurrentState: function () {
      const activeTab = document.querySelector(".faq__tab.active");
      const activeStep = document.querySelector(".faq__step.active");
      const activeQuestion = activeStep?.querySelector(".faq__question.active");
      const activeMessage = activeStep?.querySelector(".faq__messages.active");

      return {
        tab: activeTab ? activeTab.getAttribute("data-step") : null,
        step: activeStep ? activeStep.getAttribute("data-step-block") : null,
        question: activeQuestion
          ? activeQuestion.getAttribute("data-message")
          : null,
        message: activeMessage
          ? activeMessage.getAttribute("data-message-block")
          : null,
      };
    },
  };
}

// Автоматическая инициализация
const faqInstance = faqSteps();

// Экспорт для использования в других модулях
export { faqInstance };
