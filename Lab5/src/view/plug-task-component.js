import {AbstractComponent} from '../framework/view/abstract-component.js'
function createAreaTaskComponentTemplate() {
    return(`   <li class="task_list_plug">Перетащите карточку</li> `
);
}

export default class PlugTaskComponent extends AbstractComponent{
    get template() {
    return createAreaTaskComponentTemplate();
    }

    }