import React, {useState} from 'react'

import PropTypes from 'prop-types'

function SignupForm (props) {
    const [state,setState] = useState({
        username:'',
        email:'',
        password:''
    })

    function handleChange  (e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]:value
        })
    }

return(
    <form onSubmit={e => props.handle_signup(e, state)} >
        <h4>Sign Up</h4> 
        <label htmlFor='username'>Username</label>
        <input type='text' name="username" value={state.username} onChange={handleChange}/>

        <label htmlFor='email'>Email</label>
        <input type='email' name="email" value={state.email} onChange={handleChange}/>

        <label htmlFor='password'>password</label>
        <input type='text' name="password" value={state.password} onChange={handleChange}/>
        <input type="submit"/>
    </form>
)
}

export default SignupForm


SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
}