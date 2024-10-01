import {AbstractComponent} from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `<button class="task_button_clear">x Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent{
    get template() {
        return createClearButtonComponentTemplate();
    }
}