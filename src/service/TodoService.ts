import TodoRepository from "../repository/TodoRepository";

class TodoService {
  fetchTodos() {
    return TodoRepository.fetchTodos();
  }

  fetchTodo(id: number) {
    return TodoRepository.fetchTodo(id);
  }
}

export default new TodoService();
