import {AbstractComponent} from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `<button id="clear-button" type="button" class="task_button_clear">x Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent{
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick; // Получаем переданный обработчик
        this.element.addEventListener('click', this.#clickHandler); // Изменяем событие на 'click'
    }

    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        if (this.#handleClick) {
            this.#handleClick(); // Вызываем переданный обработчик клика
        }
    }
}
