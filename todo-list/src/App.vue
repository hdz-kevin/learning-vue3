<script>
export default {
  data() {
    return {
      todoTitle: "",
      todos: [],
    }
  },

  methods: {
    addTodo() {
      this.todos = [...this.todos, this.todoTitle];
    },

    removeTodo(todoTitle) {
      this.todos = this.todos.filter(todo => todo !== todoTitle);
    }
  }
};
</script>

<template>
  <nav class="navbar">
    <img src="./assets/logo.svg" width="45" />
    <div class="brand">Todo List App</div>
  </nav>

  <main class="container">
    <section>
      <form class="add-todo-form">
        <input v-model="todoTitle" type="text" placeholder="Todo Title" />
        <div>
          <button @click.prevent="addTodo">Add Todo</button>
        </div>
      </form>
    </section>

    <section>
      <div v-for="todo in todos" class="todo">
        <p>{{ todo }}</p>
        <div>
          <button @click="removeTodo(todo)" class="remove-todo-btn">&times;</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 50px;
}

.brand {
  font-size: 2rem;
}

.add-todo-form {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 40px;
}

.add-todo-form input {
  flex: 1;
  border: solid 2px var(--accent-color);
  border-radius: 10px;
  padding: 15px 10px;
  font-size: 18px;
}

.add-todo-form button {
  background: var(--accent-color);
  color: var(--text-color);
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.todo p {
  font-size: 18px;
}

.remove-todo-btn {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: none;
  font-size: 18px;
  color: var(--text-color);
  background: var(--danger-color);
}
</style>
