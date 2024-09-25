import {createElement} from '../framework/render.js'
function createNameTaskComponent() {
    return (`   <label class="task_status backlog">Бэклог</label>   `);

}

export default class NameTaskComponent {
    
    getTemplate() {
    return createNameTaskComponent();
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