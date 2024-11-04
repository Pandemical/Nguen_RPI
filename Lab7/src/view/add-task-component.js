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
        this.#handleClick = onClick; 
        this.#inputElement = this.element.querySelector('.user_add_task_search'); 
        this.element.addEventListener('submit', this.#clickHandler); 
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    clearInput() {
        this.#inputElement.value = '';
    }

    #clickHandler = (evt) => {
        evt.preventDefault(); 
        const taskTitle = this.#inputElement.value; 
        if (this.#handleClick) {
            this.#handleClick(taskTitle); 
        }
        this.clearInput(); 
    }
}
