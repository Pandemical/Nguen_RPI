import TasksListComponent from '../view/name-task-component.js';
import TaskComponent from '../view/list-task-component.js';
import TaskBoardComponent from '../view/area-task-component.js';
import {render} from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import ClearButtonComponent from '../view/clear-button-component.js'
import PlugTaskComponent from '../view/plug-task-component.js'

function getTasksByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
  
export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent()
    taskListComponent = new TasksListComponent();
    plugTaskComponent = new PlugTaskComponent();
    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks]
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderBoard();
    }

    #renderBoard() {
        Object.values(Status).forEach((status) => {
          const tasksListComponent = new TasksListComponent({status: status, statusLabel: StatusLabel[status]});
          render (tasksListComponent, this.#tasksBoardComponent.element);
          const tasksForStatus = getTasksByStatus(this.#boardTasks,status);
          if (tasksForStatus.length === 0) { 
            const plugTaskComponent = new PlugTaskComponent(); 
            render(plugTaskComponent, tasksListComponent.element); 
          } 
          else {
            tasksForStatus.forEach((task) => {
              this.#renderTask(task, tasksListComponent.element);
            });
          }
          if(status === 'resyclebin')
            {
                const clearButtonComponent = new ClearButtonComponent();
                render(clearButtonComponent, tasksListComponent.element);
            }
        })
    }
    #renderTask(task, container) {
        const taskComponent = new TaskComponent({task});
        render(taskComponent, container);
    }
    
    //     #renderBoard(){

    //     const statuses = [Status.BACKLOG, Status.INPROGRESS, Status.COMPLETED, Status.RESYCLEBIN];
    //     render(this.#tasksBoardComponent, this.#boardContainer);
    //     for (let i = 0; i < 4; i++) {
    //         const status = statuses[i];
    //         const tasksListComponent = new TasksListComponent({status, statusLabel: StatusLabel[status]});
    //         render(tasksListComponent, this.#tasksBoardComponent.element);
      
    //         for (let j = 0; j < this.#boardTasks.length; j++) {
    //             if (this.#boardTasks[j].status === status) {
    //                 const taskComponent = new TaskComponent({task: this.#boardTasks[j]});
    //                 render(taskComponent, tasksListComponent.element);
    //             }
    //         }
    //         if (i === 3) { 
    //             const clearButtonComponent = new ClearButtonComponent();
    //             render(clearButtonComponent, tasksListComponent.element);
    //           }
    //     }
    // }
}


        // init() {
    //     const statuses = [Status.BACKLOG, Status.INPROGRESS, Status.COMPLETED, Status.RESYCLEBIN];
    //     render(this.#tasksBoardComponent, this.#boardContainer);
    //     for (let i = 0; i < 4; i++) {
    //         const status = statuses[i];
    //         const tasksListComponent = new TasksListComponent({status, statusLabel: StatusLabel[status]});
    //         render(tasksListComponent, this.#tasksBoardComponent.element());
    //         for (let j = 0; j < this.#boardTasks.length; j++) {
    //             if (this.#boardTasks[j].status === status) {
    //                 const taskComponent = new TaskComponent({task: this.#boardTasks[j]});
    //                 render(taskComponent, tasksListComponent.element());
    //             }
    //         }
    //         if (i === 3) { 
    //             const clearButtonComponent = new ClearButtonComponent();
    //             render(clearButtonComponent, tasksListComponent.element());
    //           }
    //     }
    // }