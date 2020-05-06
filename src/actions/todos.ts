import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

//optional but recommended, dùng làm type cho cái obj pass vào dispatch
export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number; //id of the todo to delete
}

const url = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = () => {
  //return a function instead of action creator, bc were using redux-thunk. This fn will be called with some dispatch - the dispatch fn from redux, we have to provide type annotation for dispatch
  return async (dispatch: Dispatch) => {
    //get của axios là generic fn, nếu ko pass type vào thì sẽ là get<any>
    const response = await axios.get<Todo[]>(url);

    //vì dispatch là generic function, we can pass in the interface that describes the arguments expected to be passed to dispatch
    dispatch<FetchTodosAction>({
      //dispatch an obj
      type: ActionTypes.fetchTodos,
      payload: response.data,
    });
  };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  //not an async so we don't have to use thunk
  return {
    type: ActionTypes.deleteTodo,
    payload: id,
  };
};
