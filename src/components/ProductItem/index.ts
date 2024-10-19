import { removeTask,  } from "../../store/actions";
import { addObserver, dispatch } from "../../store/store";

export enum TaskItemProps {
	'uid' = 'uid',
	'tasktitle' = 'tasktitle',
	'taskdescription' = 'taskdescription',
	'taskprice' = 'taskprice',
	'taskcategory' = 'taskcategory',
	'taskrating' = 'taskrating',

	'state' = 'state',
}

class TaskItem extends HTMLElement {
	uid?: number;
	tasktitle?: string;
	taskdescription?: string;
    taskprice?: string;
    taskcategory?: string;
    taskrating?: string;
	state?: boolean;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

	}

	static get observedAttributes() {
		const attrs: Record<TaskItemProps, null> = {
			uid: null,
			tasktitle: null,
			taskdescription: null,
			taskprice: null,
			taskcategory: null,
			taskrating: null,
			state: null,
		}
		return Object.keys(attrs)
	}

	connectedCallback() {
		this.render();

	}

	attributeChangedCallback(propName: TaskItemProps, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case TaskItemProps.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case TaskItemProps.state:
				this.state = newValue ? newValue === 'true' : undefined;
				break;


			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<article style="text-decoration: ${this.state ? 'line-through' : 'none'}; color: ${this.state ? 'gray' : 'black'};">
					<h2>Title<h2>
					<h4>${this.tasktitle}</h4>
					<h2>Description<h2>
					<h4>${this.taskdescription}</h4>
					<h2>Price<h2>
					<h4>${this.taskprice}</h4>
					<h2>Category<h2>
					<h4>${this.taskcategory}</h4>
					<h2>Rating<h2>
					<h4>${this.taskrating}</h4>
					<button class="delete-task">X</button>
				</article>
			`;
	
			const deleteButton = this.shadowRoot?.querySelector('.delete-task');
			const checkButton = this.shadowRoot?.querySelector('.check-task');
			deleteButton?.addEventListener('click', () => {
				dispatch(removeTask(this.uid!));
			});
	

		}
	}
}	

customElements.define('product-item', TaskItem);
export default TaskItem;
