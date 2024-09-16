import {createElement} from '../framework/render.js'
function createListTaskComponentTemplate() {
    return (`           <ul class="task_list_backlog">
            <li class="task_list_items">Выучить JS</li>
            <li class="task_list_items">Выучить React</li>
            <li class="task_list_items">Сделать домашку</li>
        </ul>   `);

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