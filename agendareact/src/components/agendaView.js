import React from 'react'
import ListItems from './listItems'


function AgendaView(props){
   
    return (
        <div>
            <ListItems agenda={props.agenda}  handle_ContatoDelete={props.handle_ContatoDelete} handle_ChangeData={props.handle_ChangeData}/>
        </div>
        )
  }



  export default AgendaView