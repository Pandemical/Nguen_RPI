import {createElement} from '../framework/render.js'
function createNameTaskComponent(status, statusLabel) {
    return (`   <div class="name-tasks"> 
                    <label class="task_status ${status}">${statusLabel}</label> 
                    <ul class="list-task"></ul>
                </div> `);

}

export default class TasksListComponent {

    constructor({status = '', statusLabel = ''} = {}) {
        this.status = status;
        this.statusLabel = statusLabel;
      }

    getTemplate() {
    return createNameTaskComponent(this.status, this.statusLabel);
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