import { LitElement, html, css } from 'lit-element';
import { read, write, remove } from '@stoxy/core';

export default class TodoEntry extends LitElement {
    static get properties() {
        return {
            task: { type: String },
        };
    }

    async shiftTaskUp() {
        const todos = await read('todos');
        const todoTask = todos.filter(t => t.task === this.task)[0];
        const taskIndex = todos.indexOf(todoTask);
        if (taskIndex <= 0) return;

        const tmp = todos[taskIndex];
        todos[taskIndex] = todos[taskIndex - 1];
        todos[taskIndex - 1] = tmp;
        write('todos', todos);
    }

    async shiftTaskDown() {
        const todos = await read('todos');
        const todoTask = todos.filter(t => t.task === this.task)[0];
        const taskIndex = todos.indexOf(todoTask);
        if (taskIndex >= todos.length - 1) return;

        const tmp = todos[taskIndex];
        todos[taskIndex] = todos[taskIndex + 1];
        todos[taskIndex + 1] = tmp;
        write('todos', todos);
    }

    removeTask() {
        this.addEventListener("transitionend", () => {
            remove('todos', todo => todo.task === this.task);
        });
        this.setAttribute("leaving", "");
    }

    disconnectedCallback() {
    }

    render() {
        return html`<p>${this.task}</p>

      <div>
        <button @click=${this.shiftTaskUp}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"
            />
          </svg>
        </button>

        <button @click=${this.shiftTaskDown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
            />
          </svg>
        </button>

        <button @click=${this.removeTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
            />
          </svg>
        </button>
      </div>`;
    }

    static get styles() {
        return css`
      :host {
        display: flex;
        width: 100%;
        padding: 0.5rem 1rem;
        border: 2px solid #fff;
        font-size: 24px;
        font-weight: bold;
        box-sizing: border-box;
        animation: fade-in 500ms;
        margin-bottom: 1rem;
        justify-content: space-between;
        transition: 500ms;
      }

      :host([leaving]) {
        transform: translate(0, -30px);
        opacity: 0;
          margin-bottom: -3.3rem;
      }

      @keyframes fade-in {
        from {
          transform: translate(0, -30px);
          opacity: 0;
        }
      }

      p {
        margin: 0;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
      }

      svg {
        fill: #fff;
      }
    `;
    }
}

if (!customElements.get('todo-entry')) {
    customElements.define('todo-entry', TodoEntry);
}
