import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/add-task-component.js";
import NameTaskComponent from "./view/name-task-component.js";
import ListTaskComponent from "./view/list-task-component.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksModel from  "./model/task-model.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".task-board");

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({boardContainer: tasksBoardContainer, tasksModel});

// Рендерим заголовок и форму
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

tasksBoardPresenter.init();




















