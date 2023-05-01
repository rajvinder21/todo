import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ItemBox from '../Components/ItemBox';
import Toast from '../Components/Toast';
import AddItemBox from '../Components/AddItemBox';
import { motion } from "framer-motion"

// cd OneDrive/Documents/Documents/rajvinder/script/project/React\ Project/todo-app/


const getLocalItem = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}

function Home() {
    const [visible, setVisible] = useState(false);
    const [note, setNote] = useState(getLocalItem());
    const [incomp, setIncomp] = useState([]);
    const [toast, SetToast] = useState({
        view: false,
        color: "",
        eventName: ""
    });

    const [isEdit, setIsEdit] = useState(false)
    const [iid, setiid] = useState();
    const [item, setItem] = useState({
        title: "",
        category: "Incomplete",
        time: " ",
    })
    const [editId, setEditId] = useState();
    const [load, setLoad] = useState(false);
    const [nodata, SetNodata] = useState(false);
    const [editValue, setEditValue] = useState({
        title: "",
        category: "Complete",
        date: ""
    })

    const [list, setList] = useState("All");


    ////   This function set the visiblitiy of adding item box
    function handleClick(event) {
        setItem(() => {
            return {
                title: "",
                category: "Incomplete",
                time: " ",
            }
        })
        setVisible(true);

    }









    ///  this is or adding item to note array  

    function onAddClick(event, item) {

        if (isEdit) {
            if (item.title === "") {
                SetToast(() => {
                    return {
                        view: true,
                        color: "red",
                        eventName: " Please Enter Title"
                    }
                });
                toastClose();
            } else {

                setNote(
                    note.map((elem) => {
                        if (elem.id === editId) {
                            return {
                                ...elem,
                                title: item.title,
                                category: item.category,
                                time: item.time
                            }
                        }
                        return elem;
                    })
                )


                setLoad(true);
                setVisible(false)
                setIsEdit(false);
                SetToast(() => {
                    return {
                        view: true,
                        color: "Green",
                        eventName: "Task is Edited Sucessuly"
                    }
                });
                event.preventDefault();
            }
        } else {

            if (item.title === "") {
                SetToast(() => {
                    return {
                        view: true,
                        color: "red",
                        eventName: " Please Enter Title"
                    }
                });
                toastClose();

            } else {
                setNote((prevValue) => {
                    return [...prevValue, item];
                })

                setVisible(false)
                setLoad(true)
                SetNodata(true)
                setIsEdit(false);
                SetToast(() => {
                    return {
                        view: true,
                        color: "green",
                        eventName: "Todo is add successfullt"
                    }
                });
            }

            console.log(list);
            console.log(toast);

        }
        event.preventDefault();
    }



    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(note))

    }, [note])



    useEffect(() => {

        if (note.length > 0) {
            if (list === "Complete") {
                let newNote = note.filter((elem) => {
                    return elem.category === "Complete";
                });

                if (newNote < 1) {
                    SetNodata(false)
                }
                else {
                    SetNodata(true)
                }

            } else if (list === "InComplete") {
                let newNote = note.filter((elem) => {
                    return elem.category === "Incomplete";
                });

                if (newNote < 1) {
                    SetNodata(false)
                }
                else {
                    SetNodata(true)
                }
            } else if (list === "All") {

                if (note.length < 1) {
                    SetNodata(false)
                }
                else {
                    SetNodata(true)
                }
            }







        }
        console.log('list has benn changed', note.length);

    }, [list])


    function ofToast(event) {
        SetToast(() => {
            return {
                view: false,
                color: "red",
                eventName: " Please Enter Title"
            }
        });
        event.preventDefault();
    }


    function checkData() {
        if (note.length === 1) {
            SetNodata(false)
        }



        else {
            console.log('nothing to see here');

        }
    }

    function dataAfter() {
        //     if (note.length === 0) {
        //         SetNodata(false)
        //     } 


        // if (note.length === 0) {
        //     SetNodata(false)
        // }

        // else if (note.length >= 1) {
        //     SetNodata(true)
        // }


        // else {
        //     console.log('nothing to see here');

        // }
    }


    function onDelete(id) {

        setNote((prevValue) => {
            return prevValue.filter((kote) => {
                return id !== kote.id;
            })
        });

        SetToast(() => {
            return {
                view: true,
                color: "green",
                eventName: "Successfully Task Deleted"
            }
        });
    }


    function onEdit(idd) {
        setEditId(idd)
        setIsEdit(true);
        setVisible(true);
        var element;
        element = note.find((noteer) => {
            return noteer.id === idd;
        })



        setEditValue(() => {
            return {
                ...element
            }
        })



        setItem((prevValue) => {
            return {
                ...prevValue,
                title: element.title,
                category: element.category,
                time: element.date
            }
        })




        console.log(editValue);
    }


    function onCategory(e) {
        const val = e.target.value;
        setList(val)

        // if (val === "InComplete") {
        //     const incom = note.find((n, i) => {
        //         return n.category === "Incomplete";
        //     })
        //     dataAfter();
        // }

        // else if (val === "All") {
        //     dataAfter();
        // }

        // else if (val === "Complete") {

        //     // if (note.length === 0) {
        //     //     SetNodata(false)
        //     // }

        //     // dataAfter();
        //     // checkData();
        // }
        // else {
        //     dataAfter();
        //     // checkData();
        // }

    }

    function makeNotes(note, i) {


        if (list === "All") {
            return (
                <ItemBox key={i} id={note.id} title={note.title} category={note.category} time={note.time} note={note} onStrike={onStrike} onDelete={onDelete} onEdit={onEdit} checkData={checkData} />
            );

        } else if (list === "InComplete") {

            if (note.category === "Incomplete") {


                return (
                    <ItemBox key={i} id={note.id} title={note.title} category={note.category} time={note.time} note={note} onStrike={onStrike} onDelete={onDelete} onEdit={onEdit} checkData={checkData} />
                );

            }

            else {

                console.log('nothing incomplete');
            }

        }

        else if (list === "Complete") {
            if (note.category === "Complete") {

                return (
                    <ItemBox key={i} id={note.id} title={note.title} category={note.category} time={note.time} note={note} onStrike={onStrike} onDelete={onDelete} onEdit={onEdit} checkData={checkData} />
                );

            }

            else {

                console.log('nothing complete');
            }

        }

    }

    function toastClose() {
        setTimeout(() => {
            SetToast(() => {
                return {
                    view: false,
                    color: "red",
                    eventName: " Please Enter Title"
                }
            });

        }, 4000);


    }


    function onStrike(strike, id) {
        if (strike) {
            setNote(
                note.map((elem) => {
                    if (elem.id === id) {
                        return {
                            ...elem,
                            category: "Complete"
                        }
                    }
                    return elem;
                })
            )
            // note[id].category = "Complete";
        } else {
            setNote(
                note.map((elem) => {
                    if (elem.id === id) {
                        return {
                            ...elem,
                            category: "Incomplete"
                        }
                    }
                    return elem;
                })
            )
            // note[id].category = "Incomplete";
        }

    }








    return (
        <div>
            {/* header is navbar component of just html css  */}
            <Header />

            <div className=' main-box'>
                {/* header of main box  */}
                <div className='second-head'>
                    <button className=' btn btn-primary add-btn' value={list} onClick={handleClick}>Add Task</button>
                    <select className='category form-select ' onChange={onCategory} >
                        <option value="All"  >All</option>
                        <option value="InComplete"  >InComplee</option>
                        <option value="Complete" >Complete</option>
                    </select>
                </div>




                {/* Tasks addding box  */}
                
                { visible &&    <div className='full-banner' >

                        <AddItemBox
                            item={item}
                            setItem={setItem}
                            onAddClick={onAddClick}

                            setVisible={setVisible}
                            setIsEdit={setEditId}
                        />

                    </div> 
             
                } 

                <div >
                    <div className='item-show-box' >
                        {nodata ? dataAfter() :  <motion.div
                          initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
       > <p className='no-item'>No Todos</p></motion.div>}




                            {note.map(makeNotes)}
                        {/* {nodata ? note.map(makeNotes): <p className='no-item'>No Todos</p>} */}
                        {toast.view && <Toast ofToast={ofToast} color={toast.color} eventName={toast.eventName} />}
                        {toast.view && toastClose()}
                    </div>
                </div>
            </div>


        </div>

    );
}

export default Home;