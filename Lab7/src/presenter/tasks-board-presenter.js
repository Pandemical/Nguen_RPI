import TasksListComponent from '../view/name-task-component.js';
import TaskComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/area-task-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugTaskComponent from '../view/plug-task-component.js';
import LoadingViewComponent from '../view/LoadingViewComponent.js';

function getTasksByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #loadingComponent = new LoadingViewComponent();
    taskListComponent = new TasksListComponent();
    plugTaskComponent = new PlugTaskComponent();
    #boardTasks = [];
    #isLoading = true;

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);
    
        try {
            await this.#tasksModel.init(); 
        } finally {
            this.#isLoading = false;
            this.#loadingComponent.element.remove(); 
            this.#renderBoard(); 
        }
    }

    #renderBoard() {
        if (this.#isLoading) {
            return;
        }
        render(this.#tasksBoardComponent, this.#boardContainer); 
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
    
    #renderResetButton(tasksListComponent) {
        const clearButtonComponent = new ClearButtonComponent({});
        render(clearButtonComponent, tasksListComponent.element); 
        //onClick: this.#clearRecycleBinTasks.bind(this)
        const clearButtonElement = clearButtonComponent.element;
        if (this.#boardTasks.filter((task) => task.status === Status.RESYCLEBIN).length === 0) {
            clearButtonElement.disabled = true;
            clearButtonElement.classList.add('inactive');
        }
        clearButtonElement.addEventListener('click', (event) => {
            if (clearButtonElement.disabled) {
                event.preventDefault();
                return;
            }
    
            this.#clearRecycleBinTasks();
        });

    }    
    
    async #clearRecycleBinTasks() {
        try{
            this.#tasksModel.clearRecycleBin();
            this.#handleModelChange();
        }
        catch(err){
            console.error('Ошибка',err);
            throw err;
        }
    }

    #handleModelChange() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
    
    async createTask() {
        const taskTitle = document.querySelector('#add-task').value.trim();
        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#add-task').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи', err);
        }
    }
    
    async #handleTaskDrop(taskId, newStatus, newIndex) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
            this.#handleModelChange(); 
        } catch (err) {
            console.error('Ошибка изменения статуса задачи', err);
        }
    }
    
}
