import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import useContract from '../hooks/useContract'
import useProvider from '../hooks/useProvider'

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState()
  const provider = useProvider()
  const contract = useContract('TodoList');
  const [todos, setTodos] = useState([]);
  const [balance, setBalance] = useState();


  useEffect(() => {  
   window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(result => {
        setCurrentAccount(result[0]);

        provider.getBalance(result[0])
          .then(ethers.utils.formatEther)
          .then(setBalance);
        
        contract.getTodos().then(setTodos);
        contract.getTodos().then(console.log);
      });  
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    const description = e.target.description.value;

    contract.addTodo(todo, description).then(() => {
      e.target.todo.value = '';
      e.target.description.value = '';
      setTodos(todos => [...todos, {todo, description, _id: todos.length}]);
    });
  };

  const removeHandler = (id) => {
    return () => {
      contract.removeTodo(id).then(() => {
        setTodos(todos => todos.filter((todo, key) => key !== id));
      });
    }
  }

  return (
    <div style={{width: "70%", margin: "0 auto"}}>
      <h1>Todo List application</h1>
      <p>Account: {currentAccount}</p>
      <p>Balance: {balance} ETH</p>
      <hr />
      <h2>Create new todo</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Todo' name='todo' />
        <input placeholder='Description' name='description' />
        <button>Create</button>
      </form>
      <h2>Todos</h2>
      <table style={{width: '100%', textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, key) => {
            return (
              <tr key={key}>
                <td>{todo.todo}</td>
                <td>{todo.description}</td>
                <td>
                  <button onClick={removeHandler(key)}>X</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default HomePage;