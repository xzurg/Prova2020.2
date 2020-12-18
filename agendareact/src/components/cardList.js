import React, { useState } from 'react'
//import './cards.css'

function Cards  (props) {

    const [state, setState] =useState({
        Name:'',
        Email:'',
        CelPhone:'',
    })

	return (

		// <div className="row">
		<div className="" style={{width:200}}>		
            <div className="">

            <div className="">

              <div className="">
                  <h5>{props.Name}</h5>
              </div>

              <div className="">
                  <div className="" style={{flexDirection:'row'}}>
                        <h6>Email:{props.Email}, Celular:{props.CelPhone} </h6>
                  </div>

                  <div style={{flexDirection:'row'}}>
                      <a onClick={e => props.handle_ContatoDelete(e,props)}>Deletar</a>	
                      <a onClick={e => props.handle_ChangeData(e,props)} >Editar</a>	
                  </div>
                  
              </div>

            </div>
          </div>

		</div>
	// </div>
		)
}

export default Cards;

