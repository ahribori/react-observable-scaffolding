import { axios } from "../lib/axios";

class TodoRepository {
  private baseUrl = "https://jsonplaceholder.typicode.com/todos";

  fetchTodos() {
    return axios.get(this.baseUrl);
  }

  fetchTodo(id: number) {
    return axios.get(`${this.baseUrl}/${id}`);
  }
}

export default new TodoRepository();
