import React, {useState ,useEffect, Component } from 'react';
import TreeMenu from 'react-simple-tree-menu'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

function FunctionsMenu({}) {
    // const [sampleData, setSampleTable] = useState({ treeData: [
    //         { title: 'ArithMatic functions', children: [{ title: 'Add' },{ title: 'Substract' }] },
    //         { title: 'String functions', children: [{ title: 'Concat' },{ title: 'Split' }] }
    // ]});
    // return (
    //     <div style={{ height: 400 }}>
    //     <SortableTree
    //       treeData={sampleData.treeData}
    //       onChange={treeData => setSampleTable({ treeData })}
    //     />
    //   </div>
    // );

    const dragStart = async () => {
        console.log("[+++]dragStart")
    }

    const dragEnd = async () => {
        console.log("[+++]dragEnd")
    }

    const dragOver= async(e)=> {
        console.log("Over--")
        e.preventDefault();
        // this.dragged.style.display = "none";
        // if(e.target.className === 'placeholder') return;
        // this.over = e.target;
        // e.target.parentNode.insertBefore(placeholder, e.target);
    }
    return(
        <>
            <ul type="square">
                <li>Arithmatic functions
                <ul style={{'listStyleType' : 'none'}} onDragOver={dragOver}>
                        <li draggable="true"  data-id={1}
                            key={1}
                            onDragEnd={dragEnd}
                            onDragStart={dragStart}>Add</li>
                        <li draggable="true"  data-id={2}
                          key={2}
                          onDragEnd={dragEnd}
                          onDragStart={dragStart}>Substract</li>
                    </ul>
                </li>
                <li >String functions
                    <ul style={{'listStyleType' : 'none'}}>
                        <li draggable="true">Concat</li>
                        <li draggable="true">Split</li>
                    </ul>
                </li>
            </ul>
        </>
    )

    // const [stepCounter, setStepCounter] = useState(0); 
    // const [buttonText, setButtonText] = useState("")

    // const addNumber = async (buttonText) => {
    //     let count=stepCounter+1;
    //     setButtonText(buttonText)
    //     setStepCounter(count)
    //     console.log("step-",stepCounter,buttonText)

    // }
    // const substractNumber = async (buttonText) => {
    //     let count=stepCounter+1
    //     setStepCounter(count)
    //     setButtonText(buttonText)
    // }

    // return (
    //    <>
    //         <div>
    //             <p>Arithmatic Operation</p>
    //             <button id="convert-table" type='button' onClick={(e) => addNumber("Add")}>Add</button><br/><br/>
    //             <button id="convert-table" type='button' onClick={(e) => substractNumber("Substract")}>Substract</button>
    //             <p>String Operation</p>
    //             <button id="convert-table" type='button'>Conact</button><br/><br/>
    //             <button id="convert-table" type='button'>Split</button>
    //             <div><br/><br/>
    //                 Step: {stepCounter}
    //             </div>
    //         </div>
    //    </>
    // );
}

export default FunctionsMenu;