import {createElement} from '../framework/render.js'
function createAreaTaskComponentTemplate() {
    return(`   <section class="task">
    </section>  `
);
}

export default class FormAddTaskComponent {
    getTemplate() {
    return createAreaTaskComponentTemplate();
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