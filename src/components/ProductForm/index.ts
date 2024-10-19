import { addTask } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/store";
import { Task } from "../../types/task";

class TaskForm extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
        addObserver(this)
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `
        <h2>Juanes Store</h2>
         <form class="product-form">
            <input type="text" id="text-input" placeholder="Title" required />
            <input type="text" id="text-input" placeholder="Description" required />
            <input type="text" id="text-input" placeholder="Price" required />
            <input type="text" id="text-input" placeholder="Category" required />
            <input type="text" id="text-input" placeholder="Rating Rate" required />
            <input type="text" id="text-input" placeholder="Img" required />
            <button type="submit" id="add-btn">Add</button>
         </form>
        `;

        const formElement = this.shadowRoot?.querySelector('.product-form')
        formElement?.addEventListener("submit", (e) => {
            e.preventDefault()
            const inputValue = this.shadowRoot?.querySelector("#text-input") as HTMLInputElement
        
            const newTask: Task = {
                id: new Date().getTime(),
                title: inputValue.value,
                description: inputValue.value,
                price: inputValue.value,
                category: inputValue.value,
                rating: inputValue.value,
                state: false
            }

            dispatch(addTask(newTask))            
            
        })

		
		}
	
}

customElements.define('product-form', TaskForm);
export default TaskForm;
