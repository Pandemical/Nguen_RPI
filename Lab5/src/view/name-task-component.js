import {AbstractComponent} from '../framework/view/abstract-component.js'
function createNameTaskComponent(status, statusLabel) {
    return (`   <div class="name-tasks"> 
                    <label class="task_status ${status}">${statusLabel}</label> 
                    <ul class="list-task"></ul>
                </div> `);

}

export default class TasksListComponent extends AbstractComponent{

    constructor({status = '', statusLabel = ''} = {}) {
        super();
        this.status = status;
        this.statusLabel = statusLabel;
      }

    get template() {
    return createNameTaskComponent(this.status, this.statusLabel);
    }

}