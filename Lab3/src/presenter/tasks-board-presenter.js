import TasksListComponent from '../view/name-task-component.js';
import TaskComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/area-task-component.js';
import {render} from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js'

export default class TasksBoardPresenter {
 tasksBoardComponent = new TaskBoardComponent()
 taskListComponent = new TasksListComponent();


 constructor({boardContainer, tasksModel}) {
   this.boardContainer = boardContainer;
   this.tasksModel = tasksModel;
 }


    init() {
        this.boardTasks = [...this.tasksModel.getTasks()]

        const statuses = [Status.BACKLOG, Status.INPROGRESS, Status.COMPLETED, Status.RESYCLEBIN];
        render(this.tasksBoardComponent, this.boardContainer);
        for (let i = 0; i < 4; i++) {
            const status = statuses[i];
            const tasksListComponent = new TasksListComponent({status, statusLabel: StatusLabel[status]});
            render(tasksListComponent, this.tasksBoardComponent.getElement());
      
            for (let j = 0; j < this.boardTasks.length; j++) {
                if (this.boardTasks[j].status === status) {
                    const taskComponent = new TaskComponent({task: this.boardTasks[j]});
                    render(taskComponent, tasksListComponent.getElement());
                }
            }
            if (i === 3) { 
                const clearButtonComponent = new ClearButtonComponent();
                render(clearButtonComponent, tasksListComponent.getElement());
              }
        }
    }
}

