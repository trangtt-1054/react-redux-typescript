import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import { Todo } from '../actions';

//define a type for global state
export interface StoreState {
  todos: Todo[];
}

export const reducers = combineReducers<StoreState>({
  todos: todosReducer,
});

/* what happens in Redux state
{
  todos: [Todo, Todo, Todo]
} 
*/

// export const reducers = combineReducers({
//   counter: () => 1,
// });
