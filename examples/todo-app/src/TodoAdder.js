import { LitElement, html, css } from "lit-element";
import { add } from "stoxy";

export default class TodoAdder extends LitElement {
    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const task = formData.get("task");

        add("todos", task);
        this.shadowRoot.querySelector("input[type='text']").value = "";
    }

    render() {
        return html`
      <form @submit=${this.handleSubmit}>
        <input type="text" name="task" placeholder="Add todo..." autocomplete="off" />
        <input type="submit" value="Submit" />
      </form>
    `;
    }

    static get styles() {
        return css`
      input[type="text"] {
        background: transparent;
        font-size: 24px;
        color: #fff;
        border: 2px solid #fff;
      }
      input[type="submit"] {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        background: transparent;
        border: 4px solid #fff;
        cursor: pointer;
      }

        input::placeholder,
        input::-webkit-input-placeholder {
            color: #FFF;
        }
    `;
    }
}

if (!customElements.get("todo-adder")) {
    customElements.define("todo-adder", TodoAdder);
}

