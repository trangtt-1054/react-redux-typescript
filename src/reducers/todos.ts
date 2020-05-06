import { Todo, ActionTypes, Action } from '../actions';

//reducer takes in state and action
export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (
    action.type //switch now works as type guard
  ) {
    case ActionTypes.fetchTodos:
      return action.payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
