import React, {useEffect, useState} from 'react'

import PropTypes from 'prop-types'

function AgendaForm (props) {
    const [state,setState] = useState({
        Name:'',
        Email:'',
        CelPhone:'',
        id:''
    })

    function handleChange  (e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]:value
        })
    }

    useEffect(() => {
        if(state.Name === ' '){
            setState({
                Email:props.contatoToChange.Email,
                CelPhone:props.contatoToChange.CelPhone,
                Name:props.contatoToChange.Name,
                id:props.contatoToChange.id
            })}
        
    })

return(
    <div>
    {props.contatoChange
    ?
    <form onSubmit={e => props.handle_ContatoChange(e, state)} >
    <h4>Cadastrar Contato</h4> 
    <label htmlFor='Name'>Nome</label>
    <input type='text' name="Name" value={state.Name} onChange={handleChange}/>

    <label htmlFor='Email'>Email</label>
    <input type='Email' name="Email" value={state.Email} onChange={handleChange}/>

    <label htmlFor='CelPhone'>Celular</label>
    <input type='text' name="CelPhone" value={state.CelPhone} onChange={handleChange}/>
    
    <input type="submit" value="Atualizar"/>
    
</form>
    :
    <form onSubmit={e => props.handle_agenda(e, state)} >
        <h4>Cadastrar Contato</h4> 
        <label htmlFor='Name'>Nome</label>
        <input type='text' name="Name" value={state.Name} onChange={handleChange}/>

        <label htmlFor='Email'>Email</label>
        <input type='Email' name="Email" value={state.Email} onChange={handleChange}/>

        <label htmlFor='CelPhone'>Celular</label>
        <input type='text' name="CelPhone" value={state.CelPhone} onChange={handleChange}/>
        <input type="submit"/>
    </form>}
    </div>
)
}

export default AgendaForm


AgendaForm.propTypes = {
    handle_agenda: PropTypes.func.isRequired
}