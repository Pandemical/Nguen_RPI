import TasksListComponent from '../view/name-task-component.js';
import TaskComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/area-task-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugTaskComponent from '../view/plug-task-component.js';

function getTasksByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    taskListComponent = new TasksListComponent();
    plugTaskComponent = new PlugTaskComponent();
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderBoard();
    }

    #renderBoard() {
        this.#renderTaskList();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        const taskList = container.querySelector('.task-list'); 

        if (taskList) {
            render(taskComponent, taskList); 
        } else {
            console.error('Container .task-list не найден внутри блока задач');
        }
    }

    #renderIfEmpty(tasks, container) {
        const taskList = container.querySelector('.task-list');
        if (taskList && tasks.length === 0) {
            const plugTaskComponent = new PlugTaskComponent();
            render(plugTaskComponent, taskList);
        }
    }

    #renderTaskList() {
        Object.values(Status).forEach((status) => {
            const tasksListComponent = new TasksListComponent({ 
                status: status, 
                statusLabel: StatusLabel[status], 
                onTaskDrop: this.#handleTaskDrop.bind(this) 
            });
            
            render(tasksListComponent, this.#tasksBoardComponent.element);
            tasksListComponent.afterRender();
    
            // Получаем задачи и сортируем их по индексу
            const tasksForStatus = getTasksByStatus(this.#boardTasks, status).sort((a, b) => {
                return this.#boardTasks.indexOf(a) - this.#boardTasks.indexOf(b);
            });
    
            this.#renderIfEmpty(tasksForStatus, tasksListComponent.element);
    
            tasksForStatus.forEach((task) => {
                this.#renderTask(task, tasksListComponent.element);
            });
            
            if (status === 'resyclebin') {
                this.#renderResetButton(tasksListComponent);
            }
        });
    }
    
    

    #renderBacket(tasksListComponent) {
        render(tasksListComponent, this.#tasksBoardComponent.element);
        const status = Status.RESYCLEBIN;
        const tasksForStatus = getTasksByStatus(this.#boardTasks, status);

        this.#renderIfEmpty(tasksForStatus, tasksListComponent.element);

        tasksForStatus.forEach((task) => {
            this.#renderTask(task, tasksListComponent.element);
        });
        this.#renderResetButton(tasksListComponent);
    }

    #renderResetButton(tasksListComponent) {
        const clearButtonComponent = new ClearButtonComponent({
            onClick: this.#clearRecycleBinTasks.bind(this)
        });
        render(clearButtonComponent, tasksListComponent.element); 
    }    

    #clearRecycleBinTasks() {
        this.#tasksModel.clearRecycleBin();
        this.#handleModelChange();
    }
    

    #handleModelChange() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
    
    createTask() {
        const taskTitle = document.querySelector('#add-task').value.trim();
        if (taskTitle) {
            this.#tasksModel.addTask(taskTitle);  
            document.querySelector('#add-task').value = ''; 
        }
    }
    
    #handleTaskDrop(taskId, newStatus, newIndex) {      
        this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
    }
    
    
}
