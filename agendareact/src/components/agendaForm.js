import React, {useState} from 'react'

import PropTypes from 'prop-types'

function AgendaForm (props) {
    const [state,setState] = useState({
        Name:'',
        Email:'',
        CelPhone:''
    })

    function handleChange  (e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]:value
        })
    }

return(
    <form onSubmit={e => props.handle_agenda(e, state)} >
        <h4>Cadastrar Contato</h4> 
        <label htmlFor='Name'>Nome</label>
        <input type='text' name="Name" value={state.Name} onChange={handleChange}/>

        <label htmlFor='Email'>Email</label>
        <input type='Email' name="Email" value={state.Email} onChange={handleChange}/>

        <label htmlFor='CelPhone'>Celular</label>
        <input type='text' name="CelPhone" value={state.CelPhone} onChange={handleChange}/>
        <input type="submit"/>
    </form>
)
}

export default AgendaForm


AgendaForm.propTypes = {
    handle_agenda: PropTypes.func.isRequired
}