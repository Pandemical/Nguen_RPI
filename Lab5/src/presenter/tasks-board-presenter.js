import TasksListComponent from '../view/name-task-component.js';
import TaskComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/area-task-component.js';
import {render} from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugTaskComponent from '../view/plug-task-component.js';
import { GetnerateId } from '../utils.js';

function getTasksByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
  
export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent()
    taskListComponent = new TasksListComponent();
    plugTaskComponent = new PlugTaskComponent();
    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks]
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderBoard();
    }

    #renderBoard() {
        this.#renderTaskList();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({task});
        render(taskComponent, container);
    }

    // Новая функция для проверки на пустоту и рендера заглушки
    #renderIfEmpty(tasks, container) {
        if (tasks.length === 0) {
            const plugTaskComponent = new PlugTaskComponent();
            render(plugTaskComponent, container);
        }
    }

    #renderTaskList() {
        Object.values(Status).forEach((status) => {
            const tasksListComponent = new TasksListComponent({status: status, statusLabel: StatusLabel[status]});
            if (status === 'resyclebin') {
                this.#renderBacket(tasksListComponent);
                return;
            } else {
                render(tasksListComponent, this.#tasksBoardComponent.element);
            }

            const tasksForStatus = getTasksByStatus(this.#boardTasks, status);
            
            // Вызываем функцию для проверки на пустоту
            this.#renderIfEmpty(tasksForStatus, tasksListComponent.element);
            
            tasksForStatus.forEach((task) => {
                this.#renderTask(task, tasksListComponent.element);
            });
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
            onClick: this.#clearRecycleBinTasks.bind(this), // Передаем обработчик очистки корзины
        });
        render(clearButtonComponent, tasksListComponent.element);
    }

    handleAddNewTask(taskTitle) {
        // Создание новой задачи
        const newTask = {
            id: GetnerateId(),
            title: taskTitle,
            status: Status.BACKLOG // добавляем в бэклог
        };
  
        // Добавляем новую задачу в модель
        this.#boardTasks.push(newTask);
        this.#handleModelChange();
    }

    // Метод для очистки задач из корзины
    #clearRecycleBinTasks() {
        // Удаляем все задачи с статусом RESYCLEBIN
        this.#boardTasks = this.#boardTasks.filter((task) => task.status !== Status.RESYCLEBIN);
        // Обновляем доску
        this.#handleModelChange();
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
}
