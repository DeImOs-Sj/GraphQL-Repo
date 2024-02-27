import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { gql } from 'apollo-server-core';

const query = gql`
query GetTodoWithUser {
getTodos {
  title
  completed
  user {
    name,
    email
  
  }
}

}`




function App() {
  const { data, loading } = useQuery(query)
        console.log(data)

  
if(loading) return <h1>Loading...</h1>

  return (
    <div>

      <table>
        {
          data.getTodos.map(todo => <tr>
            <td>{todo.title}</td>
            <td>{ todo?.user?.name}</td>

          </tr>)
        }
      </table>
    </div>
  );
}

export default App;
