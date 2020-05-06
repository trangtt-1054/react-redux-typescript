import { FetchTodosAction, DeleteTodoAction } from './todos';

export enum ActionTypes {
  fetchTodos,
  deleteTodo,
}

export type Action = FetchTodosAction | DeleteTodoAction;

//ko cần phải assign cho string vì Redux cũng ko quan tâm đến string là gì, nó chỉ cần 1 value unique. nếu ko assign gì thì enum tự động assign theo thứ tự 0, 1, 2... nên unique ok
