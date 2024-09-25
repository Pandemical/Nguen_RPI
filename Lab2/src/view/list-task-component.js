import {createElement} from '../framework/render.js'
function createListTaskComponentTemplate() {
    return (` <li class="task_list_items">Выучить JS</li> `);

}

export default class ListTaskComponent {
    getTemplate() {
    return createListTaskComponentTemplate();
    }
    getElement() {
    if (!this.element) {
    this.element = createElement(this.getTemplate());
    }
    return this.element;
    }
    removeElement() {
    this.element = null;
    }
    }