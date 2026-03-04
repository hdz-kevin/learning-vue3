<script>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Todo from './components/Todo.vue';
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import Btn from './components/Btn.vue';

export default {
  components: {
    AddTodoForm,
    Alert,
    Btn,
    Modal,
    Navbar,
    Todo,
  },

  data() {
    return {
      todos: [{ id: Date.now(), title: 'Test', }],
      showAlert: false,
      editTodoForm: {
        show: false,
        todo: { id: null, title: null }
      }
    }
  },

  methods: {
    addTodo(title) {
      if (title.trim() === "") {
        this.showAlert = true;
        return;
      }

      this.todos = [
        ...this.todos,
        { id: Date.now(), title }
      ];
    },

    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },

    showEditTodoForm(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo };
    },

    updateTodo() {
      if (this.editTodoForm.todo.title.trim() === "") {
        this.showAlert = true;
        return;
      }

      const todo = this.todos.find(todo => todo.id == this.editTodoForm.todo.id);
      todo.title = this.editTodoForm.todo.title;
      this.editTodoForm.show = false;
    },
  }
};
</script>

<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template #header>
        <h2>Edit Todo</h2>
      </template>

      <template #body>
        <form class="edit-todo-form">
          <label for="title">Todo Title</label>
          <input v-model="editTodoForm.todo.title" type="text" id="title">
        </form>
      </template>

      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn @click="updateTodo">Submit</Btn>
          <Btn type="danger" @click="editTodoForm.show = false">Close</Btn>
        </div>
      </template>
    </Modal>
    
    <Alert
      message="Todo title is required"
      :show="showAlert"
      @close="showAlert = false"
    />

    <section>
      <AddTodoForm @submit="addTodo" />
    </section>

    <section>
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="removeTodo(todo.id)"
        @edit="showEditTodoForm(todo)"
      />
    </section>
  </main>
</template>

<style scoped>
.edit-todo-form > input {
  width: 100%;
  border: 1px solid var(--accent-color);
  padding: 10px 0;
  margin-top: 4px;
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
}
</style>
