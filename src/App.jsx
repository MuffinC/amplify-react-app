import React, { useEffect, useState } from 'react';
import './App.css';
import  {Amplify} from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import {Authenticator} from '@aws-amplify/ui-react' 
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import { listTodos} from './graphql/queries';

//config code is to enable the auth, so that registration of new accounts via otp is viable
Amplify.configure(awsconfig)

function App({signOut}) {
  const [todo, setTodos] = useState([])

  const client = generateClient();

  useEffect(() =>{
    fetchTodo()
  }, [])


  const fetchTodo = async() =>{
    try{
      //get data from graphql database and put into state
      const todoData = await client.graphql({ query: listTodos });
      const todoList = todoData.data.listTodos.items;
      console.log('Todo list', todoList);
      setTodos(todoList)

    }
    catch(error){
      console.log('error on fetching todo', error);

    }
  }


  return (
    <Authenticator>
      {({ signOut, user})=>(

      
    <div className="App">
      <header className="App-header">
        
        <h2>My app content</h2>
        <button onClick={signOut}>Sign out</button>
      </header>
    </div>
    )}
    </Authenticator>
  );
}

export default App;
