import React, {useState} from 'react'

import PropTypes from 'prop-types'

function LoginForm (props) {
    const [state,setState] = useState({
        username:'',
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
    <form onSubmit={e => props.handle_login(e, state)} >
        <h4>Log In</h4> 
        <label htmlFor='username'>Username</label>
        <input type='text' name="username" value={state.username} onChange={handleChange}/>

        <label htmlFor='password'>password</label>
        <input type='password' name="password" value={state.password} onChange={handleChange}/>
        <input type="submit"/>
    </form>
)
}

export default LoginForm

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
}