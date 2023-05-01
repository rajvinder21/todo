import React, { useState } from 'react';
import { motion } from "framer-motion"


function ItemBox(props) {




    const [strike, Setstrike] = useState((props.category === "Complete" ? true : false))






    return (
        
        <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
// animate={{ opacity: 1, scale: 1 }}
// transition={{
// duration: 0.6,
// delay: 0.5,
// ease: [0, 0.71, 0.2, 1.01]
// }}
initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
       >

        <div className='item-box'  key={props.id}>


            <input className='form-check-input' type="checkbox" checked={strike} onChange={(event) => {
                props.onStrike(!strike, props.id)
                Setstrike(!strike)

               
                // event.preventDefault();
               
            }} />
            <div className='item-text card-body'>
                <h5 className='card-title' style={{ textDecoration: strike ? "line-through" : "none" }}>{props.title}</h5>
                <p className='time card-text'>{props.time}</p>
            </div>
            <div className='delete' onClick={() => {
                props.onDelete(props.id);
                props.checkData();
            }}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </div>
            <div className='edit' onClick={() => {
                props.onEdit(props.id)
            }}>
                <span className="material-symbols-outlined" >
                    edit_square
                </span>
            </div>
        </div></motion.div>

    );
}

export default ItemBox;
