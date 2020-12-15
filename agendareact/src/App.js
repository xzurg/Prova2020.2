import React, {useEffect, useState} from 'react'

import './App.css';

import Nav from './components/navbar'
import LoginForm from './components/loginForm'
import SignupForm from './components/signupForm'
import AgendaForm from './components/agendaForm'
import AgendaView from './components/agendaView'

function App() {
  const [state,setState] = useState({
    displayed_form :'',
    logged_in: false,
    username:'',
    agenda:'',
    agendaView:'',
  })

  useEffect(() => {
    if(state.logged_in){
      fetch('http://localhost:8000/contatos/current_user/', {
        headers:{
          Authorization : `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res=> res.json())
      .then(json => {
        setState({...state,username:json.username})
      })
    }
  })

  const handle_login =(e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/contatos/login/', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      setState({
        ...state,
        logged_in:true,
        displayed_form:'',
        username:json.user.username
      })
    })
  }
  const handle_signup =(e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/contatos/register/', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
/*    .then(json => {
      localStorage.setItem('token', json.token);
      setState({
        logged_in:true,
        displayed_form:'',
        username:json.username
      })
    })*/
  }

  const handle_logout = () =>{
    setState({
      ...state,
      logged_in:false,
      displayed_form:'',
      username:''
    })
    localStorage.removeItem('token');
  }

  const display_form = form => {
    setState({...state,displayed_form:form})
  }


  const handle_agenda = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/agenda/', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization : `JWT ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }
  const handle_agendaView = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/agenda/', {
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization : `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setState({
        ...state,
        agenda:json
      })
    })

    let array = ''
    let suport = ''
    for(let i=0; i<=state.agenda.length; i++){
      suport = `id :${state.agenda[i].id} `+` Nome: ${state.agenda[i].Name}` +` Celular:${state.agenda[i].CelPhone}` +`Email: ${state.agenda[i].Email}`
      console.log(state.agenda[i])
      array += suport;
      console.log(suport)
      console.log(array)
    }
    setState({...state,agendaView:array})
  }

  let form;
  switch (state.displayed_form){
    case 'login':
      form = <LoginForm handle_login={handle_login}/>
      break;
    case 'signup':
      form = <SignupForm handle_signup={handle_signup}/>
      break;
    default:
      form=null;
  }

  return (
    <div className="App">
      <div >
        <Nav display_form={display_form} handle_logout={handle_logout} logged_in={state.logged_in}/>

        {form}
        <h3>
          {state.logged_in
          ? `Olá , ${state.username}`
        : null
        }
        </h3>
        {state.logged_in
        ?
        <div>
        <AgendaForm handle_agenda={handle_agenda}/>
        <button onClick={handle_agendaView}></button>
        {state.agendaView!=='' ?
          <AgendaView agendaView={state.agendaView}/>
      :null}
        </div>
      :( null)}

      </div>
    </div>
  );
}

export default App;
