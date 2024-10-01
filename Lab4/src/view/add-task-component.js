import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
return (
`    <form class="user_add_task">
<h2>Новая задача</h2>
<input type="search" placeholder="Название задачи..." class="user_add_task_search">
<button class="user_add_task_button"> + Добавить</button>
</form>`
);
}

export default class FormAddTaskComponent extends AbstractComponent{
    get template() {
    return createFormAddTaskComponentTemplate();
    }
    }