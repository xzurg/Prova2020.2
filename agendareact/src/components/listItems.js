import React from 'react'
import Cards from './cardList'

function ListItems (props) {

    const agenda = props.agenda
     
    return (
       <div  style={{float:'right', marginTop:'-250px', marginRight:"50px"}}>
       {agenda.length !==0 
       ?
           agenda.map((nomePet, i) => {
               return (
                   <div key={agenda[i].id}>
                       <Cards 
                           key={agenda[i].id}
                           id={agenda[i].id} 
                           Name={agenda[i].Name}
                           Email={agenda[i].Email} 
                           CelPhone={agenda[i].CelPhone}
                           handle_ContatoDelete={props.handle_ContatoDelete}
                            handle_ChangeData={props.handle_ChangeData}
                           />
                   </div>
                       );
                   }	
               )
           
       :null
       }
       </div>
       
       )
}

export default ListItems
