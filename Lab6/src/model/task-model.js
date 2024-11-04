import { tasks } from '../mock/task.js';
import  { GenerateId } from '../utils.js';

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: GenerateId(),
    };
    
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObservers() {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }

  clearRecycleBin() {
    this.#boardtasks = this.#boardtasks.filter((task) => task.status !== 'resyclebin');
    this._notifyObservers(); 
  }

  updateTaskStatus(taskId, newStatus, newIndex) {
    const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return;
    }
    const [task] = this.#boardtasks.splice(taskIndex, 1);
    task.status = newStatus;

    if (newIndex >= 0 && newIndex < this.#boardtasks.length) {
        this.#boardtasks.splice(newIndex, 0, task);
    } else {
        this.#boardtasks.push(task);
    }
    this._notifyObservers();
}


}