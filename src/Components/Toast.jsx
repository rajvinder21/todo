
import React, { useState } from 'react';
import { motion } from "framer-motion"

function Toast(props) {



    return (
        <motion.div
        initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
>
        <div className=" side-toast ">
        <div >
            <button type="button" style={{color : props.color } }  onClick={(event)=>{
                props.ofToast(event)
            }} >X</button>
            <p ><b>{props.eventName}</b></p>
        </div>
    </div>
    </motion.div>
    );
}


export default Toast ;