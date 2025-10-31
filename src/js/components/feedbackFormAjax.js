export const feedbackFormAjax = () => {
    const applicationForms = document.querySelectorAll('.js-form');
    if (applicationForms.length) {
        applicationForms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                input.addEventListener('input', e => {
                    validateInput(input);
                });
            });

            form.addEventListener('submit', e => {
                e.preventDefault();
                let valid = validateForm(form);
                if (valid) {
                    let formData = new FormData(form)
                    formData.append('action', 'send_email');
                    fetch('https://antro.cx/wp/wp-admin/admin-ajax.php', {
                        method: 'POST',
                        // mode: 'cors',
                        body: formData
                    }).then(response => response.json()).then(response => {
                        if (response.success) {
                            form.reset();
                            if (form.classList.contains('main-order__form')) {
                                form.reset();
                                form.style.display = 'none';
                                document.querySelector('.main-order__success').style.display = 'flex';
                            } else if (form.classList.contains('audit-form__form')) {
                                form.reset();
                                document.querySelector(".js-modal-open[data-modal='thanks']").click();
                            } else if (form.name == 'reviewForm') {

                                // document.querySelector(".js-modal-open[data-modal='thanks']").click();

                                const searchParams = new URLSearchParams();
                                // Добавляем нужные параметры
                                searchParams.append('type', 'pay');
                                if (formData.has('application-userEmail')) searchParams.append('email', formData.get('application-userEmail'));
                                if (formData.has('application-userTel')) searchParams.append('phone', formData.get('application-userTel'));
                                if (formData.has('application-userComMethod')) searchParams.append('send_to', formData.get('application-userComMethod'));

                                // Формируем URL
                                const baseUrl = response.data.report_url;
                                const resultUrl = `${baseUrl}?${searchParams.toString()}`;

                                window.location = resultUrl;
                            } else if (form.classList.contains('modal__inner')) {
                                form.reset();
                                form.closest('[data-modal="order"]')?.classList.remove('modal_open');

                                document.querySelector('[data-modal="thanks"]')?.classList.add('modal_open');
                            }
                            ym(89555039, 'reachGoal', 'done');
                        }
                    });
                }
            })
        })
    }
};

function validateInput(input) {
    let isError = false;
    let errorMessage = '';
    const value = input.value.trim();

    // Проверка обязательных полей
    if (input.hasAttribute('data-required') && !value) {
        isError = true;
        errorMessage = input.getAttribute('data-required')
        if (!errorMessage) {
            errorMessage = 'Это поле обязательно для заполнения';
        }
        if (input.hasAttribute('data-email')) {
            errorMessage = 'Пожалуйста, введите email';
        }
    }

    // Проверка email-полей (только если поле заполнено)
    if (!isError && input.hasAttribute('data-email') && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isError = true;
            errorMessage = 'Пожалуйста, проверьте правильность email’а';
        }
    }

    if (!isError && input.type == 'checkbox' && !input.checked) {
        console.log('input')
        isError = true;
        let parent = input.closest('.i-checkbox');

        if (!parent) return;

        parent.classList.add('i-checkbox_error');
    }

    // Поиск родительского контейнера
    let errorElement = null;
    const inputBlock = input.closest('.form__field');
    if (inputBlock) {
        // Работа с сообщением об ошибке
        errorElement = inputBlock.querySelector('.form__field-error-text');
    }

    if (isError) {
        console.log(isError, 'isError');

        if (inputBlock) {
            inputBlock.classList.add('error');
        }

        // Создаем элемент ошибки если отсутствует
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form__field__error';
            if (inputBlock) {
                inputBlock.appendChild(errorElement);
            }
        }
        errorElement.textContent = errorMessage;
        return false;
    }
    if (inputBlock && errorElement) {
        inputBlock.classList.remove('error');
        errorElement.textContent = '';
    }

    return true;
}

function validateForm(form) {
    let formIsValid = true;

    const inputs = form.querySelectorAll('input:not([type="hidden"]), textarea, select');

    inputs.forEach(input => {
        let isValidInput = validateInput(input);
        console.log(isValidInput, 'isValidInput');

        if (!isValidInput) {
            formIsValid = false;
        }
    });
    console.log(formIsValid, 'formIsValid');

    return formIsValid;
}