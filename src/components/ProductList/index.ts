import { addObserver, appState } from "../../store/store";
import TaskItem, { TaskItemProps } from "../ProductItem/index";
import "../ProductItem/index";

class TaskList extends HTMLElement {
	taskItems: TaskItem[] = []
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

		appState.tasks.forEach((task) => {
			const { id, title, state } = task
			const taskItem = this.ownerDocument.createElement('product-item') as TaskItem;
			taskItem.setAttribute(TaskItemProps.uid, id);
			taskItem.setAttribute(TaskItemProps.tasktitle, title);
			taskItem.setAttribute(TaskItemProps.taskprice, title);
			taskItem.setAttribute(TaskItemProps.taskcategory, title);
			taskItem.setAttribute(TaskItemProps.taskrating, title);
			taskItem.setAttribute(TaskItemProps.state, state);
			this.taskItems.push(taskItem);
		})
	}

	connectedCallback() {
		this.render();
	}
	
	render() {
		if (this.shadowRoot) {
	
			// Crear contenedores separados para las tareas completadas e incompletas
			const incompletedTasksContainer = this.ownerDocument.createElement('section');
			const completedTasksContainer = this.ownerDocument.createElement('section');
			incompletedTasksContainer.innerHTML = `<h3>Products</h3>`;
	
			this.taskItems.forEach((taskItem) => {
				if (taskItem.state) {
					completedTasksContainer.appendChild(taskItem);
				} else {
					incompletedTasksContainer.appendChild(taskItem);
				}
			});
	
			this.shadowRoot.appendChild(incompletedTasksContainer);
			this.shadowRoot.appendChild(completedTasksContainer);
		}
	}
}	

customElements.define('product-list', TaskList);
export default TaskList;
