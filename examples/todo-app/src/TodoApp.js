import { LitElement, html, css } from 'lit-element';
import './TodoAdder';
import './TodoEntry';
import 'stoxy/stoxy-repeat';
import 'stoxy/stoxy-string';
import { clear, sub, write } from 'stoxy';

export default class TodoApp extends LitElement {
    static get properties() {
        return {
            todos: {
                type: Array,
            },
        };
    }

    firstUpdated() {
        sub('todos', this.todosChangeCallback.bind(this));
    }

    todosChangeCallback(e) {
        //write('todocount', e && e.data ? e.data.length : 0);
    }

    static get styles() {
        return css`
      :host {
        width: 100%;
        height: 100vh;
        background: lightseagreen;
        display: flex;
        flex-direction: column;
        color: #fff;
        align-items: center;
        padding-top: 2rem;
      }
      todo-adder {
        margin-bottom: 2rem;
      }
      stoxy-repeat {
        width: 35%;
      }
    `;
    }

    render() {
        return html`
      <h1>My Todo app</h1>
      <button @click=${() => clear('todos')}>Clear list</button>
      <todo-adder></todo-adder>

      <stoxy-repeat key="todos" id="todoTask">
        <todo-entry task="todoTask.task"></todo-entry>
      </stoxy-repeat>
      <p>Task Count: <stoxy-string default="0">todocount</stoxy-string></p>
    `;
    }
}
