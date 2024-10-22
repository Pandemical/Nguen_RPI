import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/add-task-component.js";
import NameTaskComponent from "./view/name-task-component.js";
import ListTaskComponent from "./view/list-task-component.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksModel from "./model/task-model.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import ClearButtonComponent from "./view/clear-button-component.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".task-board");

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({ boardContainer: tasksBoardContainer, tasksModel });

// Обработчик клика для добавления новой задачи
function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();  // Используем createTask вместо handleAddNewTask
}

// Создаем экземпляр формы и передаем обработчик onClick
const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

// Рендерим заголовок и форму
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);  // Рендерим форму перед добавлением события

tasksBoardPresenter.init(); 
