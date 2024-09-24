import {createElement} from '../framework/render.js'
function createNameTaskComponent() {
    return (`   <div class="name-tasks"> 
                    <label class="task_status backlog">Бэклог</label> 
                    <ul class="list-task"></ul>
                </div> `);

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