import {AbstractComponent} from '../framework/view/abstract-component.js'
function createAreaTaskComponentTemplate() {
    return(`   <section class="task">
    </section>  `
);
}

export default class TaskBoardComponent extends AbstractComponent{
    get template() {
    return createAreaTaskComponentTemplate();
    }

    }