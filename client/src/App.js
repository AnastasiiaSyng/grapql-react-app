import React from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const READ_TODOS = gql`
  query todos{
    todos {
      id
      text
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

const App = () => {

  const { data, loading, error } = useQuery(READ_TODOS);
  let input;
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);


  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="container">
      <h3>What I will do if corona virus disappeared</h3>
      <form onSubmit={e => {
          e.preventDefault();
          createTodo({ variables: { text: input.value } });
          input.value = '';
          window.location.reload();
      }}>
        <input type="text" ref={node => { input = node;}}></input>
        <button>ADD</button>
      </form>
      <ul className="list">
        {data.todos.map((todo) => 
          <li key={todo.id}>
            <span className={todo.completed ? 'completed' : 'pending'}>{todo.text}</span>
            <button className="button" onClick={() => {
                deleteTodo({ variables: { id: todo.id } });
                window.location.reload();
            }}>X</button>
          </li>
          )}
      </ul>
      </div>
  )
}

export default App