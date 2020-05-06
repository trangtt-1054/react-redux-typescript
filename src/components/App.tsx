import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  //typeof fetchTodos; //fetchTodos có cùng type với fetchTodos của action creator, là 1 fn abcxyz, trả về abcxyz. Nhưng ko dùng đc annotation kiểu này sẽ lỗi TS: redux thunk trả về 1 cái dispatch chứ ko phải normal action object (gồm type và payload)
  deleteTodo: typeof deleteTodo;
}

//nếu đã define interface cho state thì phải dùng constructor chứ ko initialize inline đc (xem evernote)
interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      //nếu props trc ko có todo và props lần này có todo
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return <div key={todo.id}>{todo.title}</div>;
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? 'Loading...' : null}
        {this.renderList()}
      </div>
    );
  }
}

//a function that return an object with a 'todos' property
// const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
//   return { todos: state.todos }
// }

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos: todos };
};

//export a connected version of App
export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);

//
