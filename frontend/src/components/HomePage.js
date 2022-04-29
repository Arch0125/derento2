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
    const price = e.target.price.value;
    const duration = e.target.duration.value;

    contract.addTodo(todo, description,price,duration).then(() => {
      e.target.todo.value = '';
      e.target.description.value = '';
      e.target.price.value='';
      e.target.duration.value='';
      setTodos(todos => [...todos, {todo, description, price, duration, _id: todos.length}]);
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
      <h1>DeRento</h1>
      <p>Account: {currentAccount}</p>
      <p>Balance: {balance} ETH</p>
      <hr />
      <h2>List item for Rent</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Todo' name='todo' />
        <input placeholder='Description' name='description' />
        <input placeholder='Price' name='price' />
        <input placeholder='Duration' name='duration' />
        <button>Create</button>
      </form>
      <h2>Items for Rent</h2>
      <table style={{width: '100%', textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, key) => {
            return (
              <tr key={key}>
                <td>{todo.todo}</td>
                <td>{todo.description}</td>
                <td>{todo.price}</td>
                <td>{todo.duration}</td>
                <td>
                  <button onClick={removeHandler(key)}>Apply for Rent</button>
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