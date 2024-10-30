import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="user_add_task">
            <h2>Новая задача</h2>
            <input id="add-task" type="text" placeholder="Название задачи..." class="user_add_task_search">
            <button type="submit" class="user_add_task_button"> + Добавить</button>
        </form>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;
    #inputElement = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick; // Получаем переданный обработчик
        this.#inputElement = this.element.querySelector('.user_add_task_search'); // Захватываем элемент ввода
        this.element.addEventListener('submit', this.#clickHandler); // Добавляем обработчик на submit
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    // Метод для очистки поля ввода
    clearInput() {
        this.#inputElement.value = '';
    }

    #clickHandler = (evt) => {
        evt.preventDefault(); // Предотвращаем отправку формы
        const taskTitle = this.#inputElement.value; // Получаем текст задачи из поля ввода
        if (this.#handleClick) {
            this.#handleClick(taskTitle); // Передаем текст задачи в обработчик
        }
        this.clearInput(); // Очищаем поле после добавления задачи
    }
}
