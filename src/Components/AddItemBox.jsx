import React from 'react';
import date from 'date-and-time';
import { motion } from "framer-motion"


const AddItemBox = ({ item, setItem, onAddClick, setIsEdit, setVisible }) => {



    function onItemBox(event) {
        const { name, value } = event.target;
        const now = new Date();
        
        const fdate = date.format(now, 'HH:mm:ss A YYYY/MM/DD ');
        setItem((prevValue) => {
            return {
                ...prevValue,
                id : now.getTime().toString(),
                [name]: value,
                time: fdate,
            };
        })
    }


    //// this is a cancel for unset the visibility o adding item box   
    function handleCancel(e) {
        setIsEdit(false);
        setVisible(false);
        e.preventDefault();

    }


    return (
        <motion.div
  initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
       >
        <div className='invisible-box  position-absolute top-50 start-50 translate-middle'>
            <div>
                <h2>Add Task</h2>
                <form>
                    <label htmlFor="exampleTitle"  className='form-label'>Title</label>
                    <input type="text" id='exampleTitle' className='form-control'  name='title' value={item.title} onChange={onItemBox} />
                    <label className='form-label' htmlFor='exampleStatus'>Status</label>
                    <select id='exampleStatus' className='form-select form-control' name='category' value={item.category} onChange={onItemBox}>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Complete">Complete</option>
                    </select>
                    <button className='btn btn-primary' onClick={(event) => {

                        onAddClick(event, item);
                        setItem(() => {
                            return {
                                title: "",
                                category: "Incomplete",
                                time: " "
                            }
                        });
                    }
                    }
                    >Add Task</button>
                    <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
        </motion.div>

    );
}

export default AddItemBox;
