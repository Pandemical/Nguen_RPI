import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNameTaskComponent(status, statusLabel) {
    return (`<div class="name-tasks"> 
                <label class="task_status ${status}">${statusLabel}</label> 
                <ul class="task-list"></ul>
            </div>`);
}

export default class TasksListComponent extends AbstractComponent {
    constructor({ status = '', statusLabel = '', onTaskDrop } = {}) {
        super();
        this.status = status;
        this.statusLabel = statusLabel;
        this.onTaskDrop = onTaskDrop;
    }

    get template() {
        return createNameTaskComponent(this.status, this.statusLabel);
    }

    afterRender() {
        this.#setDropHandler();
    }

    #setDropHandler() {
        const container = this.element.querySelector('.task-list'); 
    
        if (!container) {
            console.error('Container .task-list не найден');
            return;
        }
    
        let targetIndex = null;
    
        container.addEventListener('dragover', (event) => {
            event.preventDefault();
    
            const targetElement = event.target.closest('.task_list_items');
            if (targetElement) {
                const taskList = Array.from(container.children);
                targetIndex = taskList.indexOf(targetElement);
    
                taskList.forEach(task => task.classList.remove('drag-over'));
                targetElement.classList.add('drag-over');
            } else {
                targetIndex = 0;
            }
        });
    
        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            container.querySelectorAll('.task_list_items').forEach(task => task.classList.remove('drag-over'));
    
            if (this.onTaskDrop && taskId && targetIndex !== null) {
                this.onTaskDrop(taskId, this.status, targetIndex);
            }
        });
    }
    
    
}
