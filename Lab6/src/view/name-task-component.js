import {AbstractComponent} from '../framework/view/abstract-component.js'
function createNameTaskComponent(status, statusLabel) {
    return (`   <div class="name-tasks"> 
                    <label class="task_status ${status}">${statusLabel}</label> 
                    <ul class="list-task"></ul>
                </div> `);

}

export default class TasksListComponent extends AbstractComponent{

    constructor({status = '', statusLabel = '', onTaskDrop} = {}) {
        super();
        this.status = status;
        this.statusLabel = statusLabel;
        this.#setDropHandler(onTaskDrop);
      }

    get template() {
        return createNameTaskComponent(this.status, this.statusLabel);
    }

    #setDropHandler(onTaskDrop){
        const container = this.element;

        container.addEventListener('dragover', (event) =>{
            event.preventDefault();

        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            onTaskDrop(taskId, this.status);
        });
    }
}