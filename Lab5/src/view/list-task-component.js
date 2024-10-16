import {AbstractComponent} from '../framework/view/abstract-component.js'

function createTaskComponentTemplate(task) {
    const {title, status} = task;
    return (` <li class="task_list_items ${status}">${title}</li> `);

}

export default class TaskComponent extends AbstractComponent{
    constructor({task}) {
      super();
      this.task = task;
    }
  
    get template() {
      return createTaskComponentTemplate(this.task);
    }
}