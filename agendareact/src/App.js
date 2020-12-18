import React, {Component} from 'react'

import './App.css';

import Nav from './components/navbar'
import LoginForm from './components/loginForm'
import SignupForm from './components/signupForm'
import AgendaForm from './components/agendaForm'
import AgendaView from './components/agendaView'

class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      displayed_form :'',
      logged_in: localStorage.getItem(`token`) ? true : false,
      username:'',
      agenda:'',
      contatoToChange:'',
      contatoChange:false
    }
  }

  componentDidMount()  {
    if(this.state.logged_in){
      fetch('http://localhost:8000/contatos/current_user/', {
        headers:{
          Authorization : `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res=> res.json())
      .then(json => {
        this.setState({username:json.username})
      })
    }

    if(this.state.logged_in){
      fetch('http://localhost:8000/agenda/', {
        headers:{
          Authorization : `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res=> res.json())
      .then(json => {
        console.log(json)
        this.setState({agenda:json})
      })
    }
  }

   handle_login =(e, data) => {
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
      this.setState({
        
        logged_in:true,
        displayed_form:'',
        username:json.user.username
      })
    })
  }
   handle_signup =(e, data) => {
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
      this.setState({
        logged_in:true,
        displayed_form:'',
        username:json.username
      })
    })*/
  }

   handle_logout = () =>{
    this.setState({
      logged_in:false,
      displayed_form:'',
      username:''
    })
    localStorage.removeItem('token');
  }

   display_form = form => {
    this.setState({displayed_form:form})
  }


   handle_agenda = (e, data) => {
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

   handle_ContatoChange = (e,data) => {
    e.preventDefault();
    console.log(data)
    fetch(`http://localhost:8000/agenda/${data.id}`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization : `JWT ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
}
   handle_ContatoDelete = (e,data) => {
    e.preventDefault();
    fetch(`http://localhost:8000/agenda/${data.id}`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
        Authorization : `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
}

handle_ChangeData = (e,data) => {
  this.setState({contatoToChange:data,contatoChange:true})
}
render(){
   let form;
  switch (this.state.displayed_form){
    case 'login':
      form = <LoginForm handle_login={this.handle_login}/>
      break;
    case 'signup':
      form = <SignupForm handle_signup={this.handle_signup}/>
      break;
    default:
      form=null;
  }

  return (
    <div className="App">
      <div >
        <Nav display_form={this.display_form} handle_logout={this.handle_logout} logged_in={this.state.logged_in}/>

        {form}
        <h3>
          {this.state.logged_in
          ? `Olá , ${this.state.username}`
        : null
        }
        </h3>
        {this.state.logged_in
        ?
        <div >
        <AgendaForm handle_agenda={this.handle_agenda} handle_ContatoChange={this.handle_ContatoChange} 
          contatoToChange={this.state.contatoToChange} contatoChange={this.state.contatoChange } handle_ChangeData={this.handle_ChangeData}
        />
          <div>
            <AgendaView agenda={this.state.agenda} handle_ContatoDelete={this.handle_ContatoDelete} handle_ChangeData={this.handle_ChangeData} />
          </div>
        </div>
      :( null)}

      </div>
    </div>
  );
}
}

export default App;
