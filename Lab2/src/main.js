import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/add-task-component.js";
import AreaTaskComponent from "./view/area-task-component.js";
import NameTaskComponent from "./view/name-task-component.js";
import ListTaskComponent from "./view/list-task-component.js";
import {render, RenderPosition} from "./framework/render.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const sectionContainer = document.querySelector(".task-board");
const labelContainer = document.querySelector(".name-tasks");
const listContainer = document.querySelector(".list-task");


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new AreaTaskComponent(), sectionContainer);
for(let i = 0; i != 4; i++)
{
    render(new NameTaskComponent(), labelContainer);
    for(let i = 0; i != 4; i++)
        {
            render(new ListTaskComponent(), listContainer);
            break;
        }
    
}

