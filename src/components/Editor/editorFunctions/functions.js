import Popup from "reactjs-popup";
import {saveInputValue,closeWindow,calculateValue} from '../../../Editor'
import App from '../../../App'

import React, { useState ,useEffect } from 'react';

function LoadAddDivBlock(){
    return(
    <>
        {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
                {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i className="arrow down" onClick={(e) =>hideShowMenu(e,"hideShowAddBox")}></i></p> */}
                {/* <div style={{border: '1px solid' ,display:'block'}}> <DeleteOutlined  onClick={(e) => closeWindow(e,"addStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '15px', 'cursor': 'pointer', 'paddingTop': '3px'}}/> */}
                {/* <span className="close" onClick={(e) => closeWindow(e,"addStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span> */}
                    <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                    <div className='column'>
                        <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}} className='addInput1'> Input Value 1</button>}>
                            Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1",'addInput1')}>Add</button>
                        </Popup>____________________<br/><br/>
                        <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}} className='addInput2'> Input Value 2</button>}>
                            Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","addInput2")}>Add</button>
                        </Popup>____________________
                    </div>
                    <div style={{border: '1px solid', 'textAlign': 'center','height': '78px'}} className='column'>
                        <p style={{'padding':'10px'}}>Add</p>
                    </div>
                    <div className='column'>___________________
                    <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}} onClick={(e) =>calculateValue(e,App.input1,App.input2,'numberAddition')}>Result</button><br/><br/>
                    </div>
                    </div>
                    <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Add( Input1 + Input2 ) = Result
                    </div>
                {/* </div> */}
    </>
    )
}

function LoadSubstractDivBlock(step,style){
return(
    <>
    {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
            {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i className="arrow down"></i></p> */}
            {/* <div style={{border: '1px solid'}}><span className="close" onClick={(e) => closeWindow(e,"substractStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span> */}
                <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                <div className='column'>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}} className='subInput1'> Input Value 1</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1","subInput1")}>Add</button>
                    </Popup>____________________<br/><br/>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}} className='subInput2'> Input Value 2</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","subInput2")}>Add</button>
                    </Popup>____________________
                </div>
                <div style={{border: '1px solid', 'textAlign': 'center', 'height': '78px'}} className='column'>
                <p style={{'padding':'10px'}}>Substract</p> 
                </div>
                <div className='column'>___________________
                    <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  onClick={(e) =>calculateValue(e,App.input1,App.input2,'numberSubstraction')}>Result</button><br/><br/>
                </div>
                </div>
                <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Substract( Input1 - Input2 ) = Result
                </div>
            {/* </div> */}
    </>
)
}

function LoadConcatStringDivBlock(step){
return(
    <>
    {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
            {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i className="arrow down"></i></p> */}
            {/* <div style={{border: '1px solid'}}><span className="close" onClick={(e) => closeWindow(e,"concatStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span> */}
            <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                <div className='column'>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  className='concatInput1'> String 1</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1","concatInput1")}>Add</button>
                    </Popup>_________________________<br/><br/>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  className='concatInput2'> String 2</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","concatInput2")}>Add</button>
                    </Popup>_________________________
                </div>
                <div style={{border: '1px solid', 'textAlign': 'center', 'height': '78px'}} className='column'>
                    <p style={{'padding':'10px'}}>Concat</p> 
                </div>
                <div className='column'>___________________
                    <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  onClick={(e) =>calculateValue(e,App.input1,App.input2,'concatString')}>Result</button><br/><br/>
                </div>
                </div>
                <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Concat( Input1 + Input2 ) = Result
                </div>
            {/* </div> */}
    </>
)
}

function LoadSplitStringDivBlock(step){
return(
    <>
    {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
            {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i className="arrow down"></i></p> */}
            {/* <div style={{border: '1px solid'}}><span className="close" onClick={(e) => closeWindow(e,"replaceStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span> */}
            <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                <div className='column'>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  className='splitInput1'>String</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1","splitInput1")}>Add</button>
                    </Popup>__________________________<br/><br/>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  className='splitInput2'> Split string with</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","splitInput2")}>Add</button>
                    </Popup>__________________<br/><br/>
                    {/* <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}> </button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2")}>Add</button>
                    </Popup>_________________________ */}
                </div>
                <div style={{border: '1px solid', 'textAlign': 'center', 'height': '78px'}} className='column'>
                    <p style={{'padding':'10px'}}>Split</p>  
                </div>
                <div className='column'>___________________
                    <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#ecece5'}}  onClick={(e) =>calculateValue(e,App.input1,App.input2,'replaceString')}>Result</button><br/><br/>
                </div>
                </div>
                <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Input1.split( Input2 ) = Result
                </div>
            {/* </div> */}
    </>
)
}

export {LoadAddDivBlock,LoadSubstractDivBlock,LoadConcatStringDivBlock,LoadSplitStringDivBlock}
