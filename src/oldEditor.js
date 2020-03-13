import React, { useState ,useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DeleteOutlined, Block } from '@material-ui/icons'
import _ from 'underscore';
import Popup from "reactjs-popup";
import TreeMenu from './components/Editor/TreeMenu/Tree';

function Editor(operations){
    const [stepCounter,setStepCounter]= useState(0);
    const [input1,setInputValue1]= useState(0);
    const [input2,setInputValue2]= useState(0);
    const [displayData,setDisplayData]= useState([]);
    const [buttonText,setButtonText]= useState('');
    const [addResult,setAddResult]= useState(0);
    const [substractResult,setSubstractResult]= useState(0);
    const [concatResult,setConcatResult]= useState('');
    const [replaceResult,setReplaceResult]= useState('');
    const [displayDataTest,setDisplayDataTest]= useState([]);
    let i1,i2,result,addR;
  
    function dragStart(e) {
      let dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', dragged);
      setButtonText(e.target.innerText)
    }
  
    function dragEnd(e) {
        let count=stepCounter+1;
        setStepCounter(count)
        if(buttonText=='Add'){
            display('Add')
        }
        if(buttonText=='Substract'){
            display('Substract')
        }
        if(buttonText=='Concat'){
            display('Concat')
        }
        if(buttonText=='Split'){
            display('Split')
        }
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function saveInputValue(e,input,className) {
      console.log("<<--",e.target,e.target.parentNode.parentNode,e.target.previousSibling.previousSibling.value)
      var el = document.querySelector('button.'+className);
      if(el.childNodes[1]){
          el.removeChild(el.childNodes[1])
      }
      el.style.paddingBottom="3px";
      var newEl = document.createElement('p');
      newEl.style.margin='0px';
  
      if(input=="input1"){
        setInputValue1(e.target.previousSibling.previousSibling.value)
        i1=e.target.previousSibling.previousSibling.value
        // el.innerText=i1
        console.log("v1--",i1)
        newEl.appendChild(document.createTextNode(i1));
      }
      if(input=="input2"){
        setInputValue2(e.target.previousSibling.previousSibling.value)
        i2=e.target.previousSibling.previousSibling.value;
        // el.innerText=i2
        console.log("v2--",i2)
        newEl.appendChild(document.createTextNode(i2));
      }
      el.appendChild(newEl);
      el.insertBefore(newEl, null);
      el.insertBefore(newEl, el.childNodes[1] || null)
      e.target.parentNode.style.display='none';
    }
  
    function display(methodCall){
      let appendDiv={};
      if(methodCall=='Add'){
        let step=displayData.length+1;
        appendDiv=loadAddDivBlock(step);
      }
  
      if(methodCall=='Substract'){
        let step=displayData.length+1;
        appendDiv=loadSubstractDivBlock(step);
      }
  
      if(methodCall=='Concat'){
        let step=displayData.length+1;
        appendDiv=loadConcatStringDivBlock(step);
      }
  
      if(methodCall=='Split'){
        let step=displayData.length+1;
        appendDiv=loadSplitStringDivBlock(step);
      }
      let functionArray=displayData;
      functionArray.push(appendDiv)
      appendDiv={};
      setDisplayData(functionArray);
      setDisplayDataTest(functionArray);
    }
  
    function closeWindow(e,methodCall) {
      console.log("e.target.parentNode.parentNode.previousSibling-",e.target,e.target.parentNode,e.target.parentNode.parentNode,e.target.parentNode.parentNode.previousSibling)
      if(methodCall=='popUpClose'){
        e.target.parentNode.style.display='none';
      }else if(e.target.parentNode.parentNode.previousSibling && e.target.parentNode.parentNode.previousSibling.innerText){
        let index=parseInt(e.target.parentNode.parentNode.previousSibling.innerText.split('STEP:')[1]);
        index=index-1;
        let functionArray= [];
        for(let i=0;i<displayData.length;i++){
          if(i==index){
          }else{
            functionArray.push(displayData[i])
          }
        }
        setDisplayData(functionArray)
        setDisplayDataTest(functionArray)
      }
    }
  
    function renderDrag(obj){
      return(
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              >
              {/* {items.map((item, index) => ( */}
              { obj.map((item, index) => (
                <Draggable key={index} draggableId={index+"k"} index={index}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )} 
                        >
                          <p id="1" style={{'textAlign': 'center',cursor:'pointer','marginBottom': '1px','fontWeight': 'bold','fontFamily': 'HelveticaNeue-Light'}} onClick={(e) =>hideShowMenu(e)}>STEP:{index+1}<br/><i className="arrow down" ></i></p>
                          <div className='box' style={{border: '1px solid','display':'block',backgroundColor:'#e0dcdc'}} id={index}><DeleteOutlined  onClick={(e) => closeWindow(e,"addStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '15px', 'cursor': 'pointer', 'paddingTop': '3px'}}/>
                            {item}
                          </div>
                        {/* k+{index.toString()} */}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )
    }
  
    function calculateValue(e,methodCall) {
        var para = document.createElement("p");
        if(methodCall=="numberAddition"){
          result=parseInt(i1)+parseInt(i2);
          setAddResult(result)
          console.log("addResult--",addResult)
        }
        if(methodCall=="numberSubstraction"){
          result=i1-i2;
          setSubstractResult(result)
        }
        if(methodCall=="concatString"){
          result=i1+i2;
          setConcatResult(result)
        }
        if(methodCall=="replaceString"){
          var arr=i1.split("");
          var text = "";
          for (let i = 0; i < arr.length; i++) {
            text += arr[i] +" ";
          }
          result=text;
          setReplaceResult(result)
        }
        if(result){
          if(e.target.childNodes[1]){
            e.target.removeChild(e.target.childNodes[1])
          }
          var value = document.createTextNode(result);
          para.appendChild(value);
          e.target.appendChild(para)
        }
    }

    function hideShowMenu(e){
      if(e.target.parentNode.nextSibling && e.target.parentNode.nextSibling.children){

        let showStyle=e.target.parentNode.nextSibling.children[1].style.display;
        if(showStyle=='none'){
          console.log("none => block")
          // e.target.parentNode.nextSibling.style.display='block';
          e.target.parentNode.nextSibling.children[1].style.display='block'
          e.target.parentNode.nextSibling.children[2].style.display='none'
          e.target.className='arrow down'
        }
        if(showStyle=='block'){
          console.log("block => none")
          // e.target.parentNode.nextSibling.style.display='none'
          e.target.parentNode.nextSibling.children[1].style.display='none'
          e.target.parentNode.nextSibling.children[2].style.display='block'
          e.target.className='arrow up'
        }
      }
    }
  
    function loadAddDivBlock(){
        return(
          <>
            <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                <div className='column'>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}} className='addInput1'> Input Value 1</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="number" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1",'addInput1')}>Add</button>
                    </Popup>____________________<br/><br/>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}} className='addInput2'> Input Value 2</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="number" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","addInput2")}>Add</button>
                    </Popup>____________________
                    </div>
                    <div style={{border: '1px solid', 'textAlign': 'center','height': '78px'}} className='column'>
                        <p style={{'padding':'10px'}}>Add</p>
                    </div>
                    <div className='column'>___________________
                       {/* <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}} onClick={() =>setAddResult(i1+i2)}>Result</button>&nbsp;{addResult}<br/><br/> */}
                        <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}} onClick={(e) =>calculateValue(e,'numberAddition')}>Result</button>&nbsp;<br/><br/>
                    </div>
                </div>
                <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Add( Input1 + Input2 ) = Result
            </div>
          </>
        )
    }
  
    function loadSubstractDivBlock(){
      return(
        <>
            <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
            <div className='column'>
                <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}} className='subInput1'> Input Value 1</button>}>
                    Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                    <input type="number" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1","subInput1")}>Add</button>
                </Popup>____________________<br/><br/>
                <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}} className='subInput2'> Input Value 2</button>}>
                    Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                    <input type="number" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","subInput2")}>Add</button>
                </Popup>____________________
            </div>
            <div style={{border: '1px solid', 'textAlign': 'center', 'height': '78px'}} className='column'>
            <p style={{'padding':'10px'}}>Substract</p> 
            </div>
            <div className='column'>___________________
            <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  onClick={(e) =>calculateValue(e,'numberSubstraction')}>Result</button> &nbsp;{substractResult>0 ? substractResult :''}<br/><br/>
            </div>
        </div>
        <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                Substract( Input1 - Input2 ) = Result
        </div>
        </>
      )
    }
    
    function loadConcatStringDivBlock(){
      return(
        <>
            <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                <div className='column'>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  className='concatInput1'> String 1</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1","concatInput1")}>Add</button>
                    </Popup>_________________________<br/><br/>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  className='concatInput2'> String 2</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","concatInput2")}>Add</button>
                    </Popup>_________________________
                </div>
                <div style={{border: '1px solid', 'textAlign': 'center', 'height': '78px'}} className='column'>
                    <p style={{'padding':'10px'}}>Concat</p> 
                </div>
                <div className='column'>___________________
                    <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  onClick={(e) =>calculateValue(e,'concatString')}>Result</button>&nbsp;{concatResult}<br/><br/>
                </div>
            </div>
            <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Concat( Input1 + Input2 ) = Result
            </div>
        </>
      )
    }
  
    function loadSplitStringDivBlock(){
      return(
        <>
            <div style={{padding: '9px',paddingBottom: '22px',display:'block',height: '84px'}} className='row'>
                <div className='column'>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  className='splitInput1'>String</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1","splitInput1")}>Add</button>
                    </Popup>__________________________<br/><br/>
                    <Popup trigger={<button style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  className='splitInput2'> Split string with</button>}>
                        Please Add value  <span className="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2","splitInput2")}>Add</button>
                    </Popup>__________________<br/><br/>
                </div>
                <div style={{border: '1px solid', 'textAlign': 'center', 'height': '78px'}} className='column'>
                    <p style={{'padding':'10px'}}>Split</p>  
                </div>
                <div className='column'>___________________
                    <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  onClick={(e) =>calculateValue(e,'replaceString')}>Result</button>&nbsp;{replaceResult}<br/><br/>
                </div>
            </div>
            <div  style={{ 'textAlign': 'center',display:'none','paddingBottom':' 10px'}}>
                    Input1.split( Input2 ) = Result
            </div>
        </>
      )
    }
  
    let listItems=_.map(operations.operations, function(num,i){ 
      return (
        <li 
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={dragEnd}
          onDragStart={dragStart}>{num}</li>
      )
    });
  
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };
  
    function onDndDragEnd(result) {
      if (!result.destination) {
        return;
      }
      const itemsArray = reorder(
        displayDataTest,
        result.source.index,
        result.destination.index
      );
      setDisplayDataTest(itemsArray)
    }
  
    function collapseAll(){
      let el=document.querySelectorAll('div.box');
      for(let i=0;i<el.length;i++){
        el[i].children[1].style.display='none';
        el[i].children[2].style.display='block';
        el[i].previousSibling.children[1].className='arrow up';
      }
    }
    
    function expandAll(){
      let el=document.querySelectorAll('div.box');
      for(let i=0;i<el.length;i++){
        el[i].children[1].style.display='block';
        el[i].children[2].style.display='none';
        el[i].previousSibling.children[1].className='arrow down';
      }
    }
  
    return (
      <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 }}>
              <div style={{border:'1px solid #5a585866',backgroundColor:'#e0dcdc'}}><TreeMenu/></div>
              {/* <div style={{border:'1px solid #5a585866' ,padding: '34px'}}>{displayDataTest}</div> */}
              <div style={{border:'1px solid #5a585866' ,padding: '34px'}}>
                <div style={{textAlign:'right'}}>
                    {displayDataTest.length>0 ? <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  onClick={(e) =>collapseAll(e)}>Collapse</button> : <p></p>}
                    &nbsp; &nbsp;
                    {displayDataTest.length>0 ? <button type='button' style={{'cursor':'pointer',padding: '5px',fontWeight: 'bold',backgroundColor:'#e0dcdc'}}  onClick={(e) =>expandAll(e)}>Expand</button> : <p></p>}
                </div> 
                <DragDropContext onDragEnd={onDndDragEnd} >
                    {renderDrag(displayDataTest)}
                </DragDropContext>
              </div>
              <div style={{border:'1px solid #5a585866',padding: '11px',backgroundColor:'#e0dcdc'}}>
                <div>Arithmatic Functions
                  <ul onDragOver={dragOver}>
                    {listItems}
                  </ul>
                </div>
                <div>String Functions
                  <ul>
                    <li  draggable='true'
                      onDragEnd={dragEnd}
                      onDragStart={dragStart}>Concat</li>
                                <li  draggable='true'
                      onDragEnd={dragEnd}
                      onDragStart={dragStart}>Split</li>
                  </ul>
                </div>
              </div>
          </div>
          {/* {addResult} */}
      </>
    );
  }

  export default Editor;