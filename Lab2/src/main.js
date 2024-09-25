import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/add-task-component.js";
import NameTaskComponent from "./view/name-task-component.js";
import ListTaskComponent from "./view/list-task-component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const sectionContainer = document.querySelector(".task-board");

// Рендерим заголовок и форму
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);


// Внешний цикл для добавления задач
for (let i = 0; i < 4; i++) {
    // Рендерим название задачи
    render(new NameTaskComponent(), sectionContainer);
    // Находим все существующие контейнеры списка задач
    const listContainers = sectionContainer.querySelectorAll('.list-task');
    
    // Получаем текущий контейнер списка
    const listContainer = listContainers[i];
    // Внутренний цикл для добавления элементов списка
    for (let j = 0; j < 4; j++) {
        // Создаем элемент списка
        render(new ListTaskComponent(), listContainer); // Рендерим элемент списка в контейнер списка
    }
}
