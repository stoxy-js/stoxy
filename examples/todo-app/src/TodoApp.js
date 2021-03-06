import { LitElement, html, css } from 'lit-element';
import './TodoAdder';
import './TodoEntry';
import 'stoxy/stoxy-repeat';
import { del } from "stoxy";

export default class TodoApp extends LitElement {
    static get properties() {
        return {
            todos: {
                type: Array,
            },
        };
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
      <button @click=${() => del("todos")}>Clear list</button>
      <todo-adder></todo-adder>

      <stoxy-repeat key="todos" id="todoTask">
        <todo-entry task="todoTask"></todo-entry>
      </stoxy-repeat>
    `;
    }
}
