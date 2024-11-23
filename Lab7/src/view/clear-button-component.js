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
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createClearButtonComponentTemplate();
    }

    enable() {
        this.element.disabled = false;
    }

    disable() {
        this.element.disabled = true;
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        if (this.#handleClick) {
            this.#handleClick();
        }
    }
}
