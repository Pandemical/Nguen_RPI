import {createElement} from '../framework/render.js';
function createFormAddTaskComponentTemplate() {
return (
`    <form class="user_add_task">
<h2>Новая задача</h2>
<input type="search" placeholder="Название задачи..." class="user_add_task_search">
<button class="user_add_task_button"> + Добавить</button>
</form>`
);
}

export default class FormAddTaskComponent {
    getTemplate() {
    return createFormAddTaskComponentTemplate();
    }
    getElement() {
    if (!this.element) {
    this.element = createElement(this.getTemplate());
    }
    return this.element;
    }
    removeElement() {
    this.element = null;
    }
    }