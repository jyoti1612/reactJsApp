import React, { useState ,useEffect ,Component} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import _ from 'underscore'
import Popup from "reactjs-popup";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Dashboard />
//       </header>
//     </div>
//   );
// }

// export default App;

function handleClick(event) {
  const modal = document.querySelector(".modal")
  const closeBtn = document.querySelector(".close")
  modal.style.display = "block";
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  })
}
class PopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };
  render() {
    return (
    <div className="modal">
      <div className="modal_content">
      <span className="close" onClick={this.handleClick}>&times;    </span>
      <p>I'm A Pop Up!!!</p>
      </div>
    </div>
    );
  }
}

var placeholder = document.createElement("li");

// console.log("pp--",placeholder)
placeholder.className = "placeholder";


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.state.stepCounter=0;
    this.state.seen=false;
    this.state.input1=0;
    this.state.input2=0;
    this.state.result=0;
    this.state.buttonText='';
    this.state.displayAddBox={'display':'none'};
    this.state.displaySubstarctBox={'display':'none'};
    this.state.methodCall='arithmatic';
    this.state.displayPropertyValue={'display':'none'};
    this.myRef = React.createRef();
  }

  counter=0;

  displayPopUp = () => {
    console.log("Called")
    this.setState({
     seen: !this.state.seen
    });
  };

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    console.log("placeholder--",e.target.innerText,e.target.nodeName)
    e.dataTransfer.setData('text/html', this.dragged);
    // React.createElement('div', { textAlign: 'center' })
    this.setState({'buttonText':e.target.innerText})
  }

  dragEnd(e) {
    console.log("dragEnd Called")
    let count=this.state.stepCounter+1;
    this.setState({"stepCounter":count})
    this.setState({'displayPropertyValue':{'display':'block'}});
    if(this.state.buttonText=='Add'){
      console.log("Add")
      this.setState({displayAddBox:{'display':'block'}})
    }
    if(this.state.buttonText=='Substarct'){
      console.log("Substract")
      this.setState({displaySubstarctBox:{'display':'block'}})
    }
    // this.dragged.style.display = 'block';
    // this.dragged.parentNode.removeChild(placeholder);
    // // update state
    // var data = this.state.operations;
    // var from = Number(this.dragged.dataset.id);
    // var to = Number(this.over.dataset.id);
    // if(from < to) to--;
    // data.splice(to, 0, data.splice(from, 1)[0]);
    // this.setState({operations: data});
  }

  dragOver(e) {
    console.log("Over--")
    e.preventDefault();
    // this.dragged.style.display = "none";
    // if(e.target.className === 'placeholder') return;
    // this.over = e.target;
    // e.target.parentNode.insertBefore(placeholder, e.target);
  }

  saveInputValue(e,input) {
    console.log("saveInputValue--",e.target.previousSibling,"--",e.target.previousSibling.innerText)
    console.log("saveInputValue--",e.target.previousSibling.value)
    if(input=="input1"){
      this.setState({"input1":e.target.previousSibling.value})
    }
    if(input=="input2"){
      this.setState({"input2":e.target.previousSibling.value})
    }
  }

  closeWindow(e,methodCall) {
    console.log("saveInputValue--",e.target.parentNode,e.target.parentNode.previousSibling)
    if(methodCall=="popUpClose"){
     e.target.parentNode.style.display = 'none';
    }
    if(methodCall=='addStepDelete'){
      this.setState({displayAddBox:{'display':'none'}})
      // e.target.parentNode.previousSibling.style.display='none';
      let count=this.state.stepCounter-1;
      this.setState({"stepCounter":count})
      // console.log("c-",count)
    }
    if(methodCall=='substractStepDelete'){
      this.setState({displaySubstarctBox:{'display':'none'}})
      // e.target.parentNode.previousSibling.style.display='none';
      let count=this.state.stepCounter-1;
      this.setState({"stepCounter":count})
      // console.log("c-",count)
    }
  }

  calculateValue(input1,input2) {
    console.log("KK")
      let result=parseInt(input1)+parseInt(input2);
      console.log("result:",result)
      this.setState({"result":result})
  }

  counterValue(){
    const v=this.state.stepCounter
    return v;
  }

  loadAddDivBlock(){
      return(
        <>
            {/* <p style={{'text-align': 'center'}}>Step:{this.state.stepCounter}</p> */}
                  <p id="1" style={{'text-align': 'center'}}>Step:{this.counterValue()}<br/><i class="arrow down"></i></p>
                  <div style={{border: '1px solid'}}><span className="close" onClick={(e) => this.closeWindow(e,"addStepDelete")} style={{'padding-left': '797px','font-size': '19px', 'cursor': 'pointer'}} >&times;</span>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 ,padding: '9px'}}>
                      <div>
                          <Popup trigger={<button> Input Value 1</button>}>
                              Please Add value  <span className="close"  onClick={(e) => this.closeWindow(e,"popUpClose")} style={{ 'padding-left': '67px','font-size': 'x-large','cursor': 'pointer'}} >&times;</span>
                              <input type="text" id="input1" ></input><button type='button' onClick={(e) => this.saveInputValue(e,"input1")}>Add</button>
                          </Popup><br/><br/>
                          <Popup trigger={<button> Input Value 2</button>}>
                              Please Add value  <span className="close"  onClick={(e) => this.closeWindow(e,"popUpClose")} style={{ 'padding-left': '67px','font-size': 'x-large','cursor': 'pointer'}} >&times;</span>
                              <input type="text" id="input2" ></input><button type='button' onClick={(e) => this.saveInputValue(e,"input2")}>Add</button>
                          </Popup>
                      </div>
                      <div style={{border: '1px solid', 'text-align': 'center'}}>
                          {/* {this.state.buttonText} */} Add
                      </div>
                      <div>
                        <button type='button' onClick={(e) => this.calculateValue(this.state.input1,this.state.input2,this.state.methodCall)}>Calculate</button><br/><br/>
                        
                      </div>
                    </div>
                  </div>
        </>
      )
  }

  loadSubstractDivBlock(){
    return(
        <>
            {/* <p style={{'text-align': 'center'}}>Step:{this.state.stepCounter}</p> */}
            <p id="1" style={{'text-align': 'center'}}>Step:{this.counterValue()}<br/><i class="arrow down"></i></p>
            <div style={{border: '1px solid'}}><span className="close" onClick={(e) => this.closeWindow(e,"substractStepDelete")} style={{'padding-left': '797px','font-size': '19px', 'cursor': 'pointer'}} >&times;</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 ,padding: '9px'}}>
                <div>
                    <Popup trigger={<button> Input Value 1</button>}>
                        Please Add value  <span className="close"  onClick={(e) => this.closeWindow(e,"popUpClose")} style={{ 'padding-left': '67px','font-size': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input1" ></input><button type='button' onClick={(e) => this.saveInputValue(e,"input1")}>Add</button>
                    </Popup><br/><br/>
                    <Popup trigger={<button> Input Value 2</button>}>
                        Please Add value  <span className="close"  onClick={(e) => this.closeWindow(e,"popUpClose")} style={{ 'padding-left': '67px','font-size': 'x-large','cursor': 'pointer'}} >&times;</span>
                        <input type="text" id="input2" ></input><button type='button' onClick={(e) => this.saveInputValue(e,"input2")}>Add</button>
                    </Popup>
                </div>
                <div style={{border: '1px solid', 'text-align': 'center'}}>
                    {/* {this.state.buttonText} */} Substract
                </div>
                <div>
                  <button type='button' onClick={(e) => this.calculateValue(this.state.input1,this.state.input2,this.state.methodCall)}>Calculate</button><br/><br/>
                  
                </div>
              </div>
            </div>
        </>
    )
}

	render() {
    var listItems = this.state.operations.map((item, i) => {
      return (
        <li 
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>{item}</li>
      )
     });
		return (
		  <>
        <div ref={this.myRef}></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
            <div>  
              <ul onDragOver={this.dragOver.bind(this)}>
                {listItems}
              </ul>
            </div>
            {/* <div style={{display:'none'}}> */}
            <div>
                <div style={this.state.displayAddBox}>
                  {this.loadAddDivBlock()}
                </div>
                <div style={this.state.displaySubstarctBox}>
                  {this.loadSubstractDivBlock()}
                </div>          
            </div>
          </div>
        {/* <div ref={this.myRef}>m</div> */}
      </>
		)
	}
}

function App() {
  const [operations,setOperations]=useState({"A":['Add', 'Substarct']})
  return (
    <div className="App">
        <List operations={operations.A}/>	
    </div>
  );
}

export default App;


// function List(operations) {
//   let [operation,setOperation]=useState(operations)
//   let [displayPropertyValue,setValue]=useState("none");
//   console.log("Op-",operation)
//   const dragStart=async(e)=> {
//     let dragged = e.currentTarget;
//     e.dataTransfer.effectAllowed = 'move';
//     console.log("placeholder--",e.target.innerText,e.target.nodeName)
//     e.dataTransfer.setData('text/html', dragged);
//     React.createElement('div', { textAlign: 'center' })
//     // return(
//     //     <li>val</li>
//     // )
//   }
//   const dragEnd=async(e)=> {
//     console.log("End--")
//     setValue("block")
//   }

//   const dragOver=async(e)=> {
//     console.log("Over--")
//     e.preventDefault();
//   }

//   const listItems ={}
// console.log("listItems--",listItems)
//   return (
//     <>
//       {/* <div ref={this.myRef}></div> */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
//           <div>  
//             <ul>
//               {listItems}
//             </ul>
//           </div>
//           {/* <div style={{"display":{displayPropertyValue}}}> */}
//           <div>
//               Welcome
//           </div>
//       </div>
//       {/* <div ref={this.myRef}>m</div> */}
//     </>
//   )
	
// }


// Sample2---Working
import React, { useState ,useEffect ,Component} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import _ from 'underscore'
import Popup from "reactjs-popup";
import TreeMenu from './components/editor/treeMenu';
import Form from './components/Form/Form';


// function App() {
//   return (
//     <div class="App">
//       <header class="App-header">
//         <Dashboard />
//       </header>
//     </div>
//   );
// }

// export default App;
var placeholder = document.createElement("li");
placeholder.className = "placeholder";

function List(operations){
  const [stepCounter,setStepCounter]= useState(0);
  const [show,setShowAttribute]=useState(true)
  const [input1,setInputValue1]= useState(0);
  const [input2,setInputValue2]= useState(0);
  const [displayData,setDisplayData]= useState([]);
  const [buttonText,setButtonText]= useState('');
  const [displayAddBox,setCssDisplayForAdd]= useState({'display':'none'});
  const [displaySubstarctBox,setCssDisplayForSubstract]= useState({'display':'none'});
  const [displayConcatStringBox,setCssDisplayForConcat]=useState({'display':'none'});
  const [displayReplaceStringBox,setCssDisplayForReplace]=useState({'display':'none'});
  const [addResult,setAddResult]= useState(0);
  const [substractResult,setSubstractResult]= useState(0);
  const [concatResult,setConcatResult]= useState('');
  const [replaceResult,setReplaceResult]= useState('');
  const [displayDataTest,setDisplayDataTest]= useState([]);
  
  let stepDragged;
  let stepDraggedOver;
  function dragStart(e) {
    let dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragged);
    setButtonText(e.target.innerText)
  }

  function dragEnd(e) {
    let count=stepCounter+1    ;
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
    if(buttonText=='Replace'){
      display('Replace')
    }
  }

  function dragOver(e) {
    console.log("Called")
    e.preventDefault();
  }

  function saveInputValue(e,input) {
    if(input=="input1"){
      setInputValue1(e.target.previousSibling.previousSibling.value)
    }
    if(input=="input2"){
      setInputValue2(e.target.previousSibling.previousSibling.value)
    }
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

    if(methodCall=='Replace'){
      let step=displayData.length+1;
      appendDiv=loadReplaceStringDivBlock(step);
    }

    // if()

    let functionArray=displayData;
    functionArray.push(appendDiv)
    appendDiv={};
    console.log("functionArray--",functionArray)
    setDisplayData(functionArray);
    let aj=addStep(functionArray)
    setDisplayDataTest(aj);

    // setDisplayDataTest(displayData)
  }

  function stepDragStart(e){
    console.log("s1",e.target)
    stepDragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', stepDragged);
  }

  function stepDragEnd(e){
    stepDragged.style.display = 'block';
    stepDragged.parentNode.removeChild(placeholder);
    console.log("stepDragged--",stepDragged)
    console.log("stepDraggedOver--",stepDraggedOver)
    // console.log("stepDragged--",stepDragged,stepDragged.dataset.id)
    console.log("data--",displayData)

    var data = displayData
    var from = Number(stepDragged.dataset.id);
    var to = Number(stepDraggedOver.dataset.id);
    console.log("from--",from)
    console.log("to--",to)

    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    // this.setState({colors: data});
    console.log("data--",data)
    setDisplayData(data);
    let aj=addStep(data)
    setDisplayDataTest(aj);
    // console.log("s11",e.target.parentNode.previousSibling.innerText)
  }

  function stepDragOver(e){
    // console.log("Step Over Called",e.target)
    e.preventDefault();
    if(e.target.className === 'placeholder') return;
    stepDraggedOver=e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
  

  function closeWindow(e,methodCall) {
    console.log("saveInputValue--",e.target,e.target.parentNode.previousSibling,e.target.parentNode.previousSibling.innerText)
    if(methodCall=="popUpClose"){
      e.target.parentNode.style.display = 'none';
      
    }
    else{
      // e.target.parentNode.style.display = 'none';

      let index=parseInt(e.target.parentNode.previousSibling.innerText.split('Step:')[1]);
      index=index-1;
      console.log("index--",index)
      e.target.parentNode.previousSibling.remove();
      e.target.parentNode.remove();
      // let functionArray= [];
      // for(let k=0;k<displayData.length;k++){
      //   if(k==index){
      //     console.log("k-",k)
      //   }else{
      //     functionArray.push(displayData[k])
      //   }
      // }
      // console.log("functionArray Length before splice--",functionArray.length)
      // // let a= functionArray.splice(index,1)
      // // console.log("functionArray Length after splice--",a.length)
      // setDisplayData(functionArray);
      // let aj=addStep(functionArray)
      // console.log("DisplayData=",aj,aj.length)
      // setDisplayDataTest(aj);
      // console.log("DisplayDataTest--",displayDataTest,displayDataTest.length)
      // // e.target.parentNode.previousSibling.style.display='none';
      // // e.target.parentNode.remove();
      // // setDisplayDataTest(displayData)
    }
  }

  function addStep(arr){
    return _.map(arr, function(functionDiv,i){ 
        // console.log("val",functionDiv)
        let step=i+1;
        console.log("step--",step)
        return (
          <div data-id={i} key={i} draggable='true'
          onDragStart={stepDragStart}
          onDragEnd={stepDragEnd}
           ><p style={{'textAlign': 'center'}}>Step:{step}<br/><i class="arrow down" onClick={(e) =>hideShowMenu(e,"hideShowAddBox")}></i></p>
            {functionDiv}
          </div>
        )
       })
  }

  // displayDataTest = _.map(displayData, function(functionDiv,i){ 
  //   // console.log("val",functionDiv)
  //   let step=i+1;
  //   console.log("step--",step)
  //   return (
  //     <div key={i}><p style={{'textAlign': 'center'}}>Step:{step}<br/><i class="arrow down" onClick={(e) =>hideShowMenu(e,"hideShowAddBox")}></i></p>
  //       {functionDiv}
  //     </div>
  //   )
  //  })

  function calculateValue(input1,input2,methodCall) {
    let result;
    if(methodCall=="numberAddition"){
      result=parseInt(input1)+parseInt(input2);
      setAddResult(result)
    }
    if(methodCall=="numberSubstraction"){
      result=parseInt(input1)-parseInt(input2);
      setSubstractResult(result)
    }
    if(methodCall=="concatString"){
      result=input1+input2;
      setConcatResult(result)
    }
    if(methodCall=="replaceString"){
      result=input1+input2;
      setReplaceResult(result)
    }
  }

  function hideShowMenu(e,methodCall){
    console.log("e--",e.target,e.target.previousElementSibling.previousSibling)
    // if(methodCall=='hideShowAddBox'){
    //   setCssDisplayForAdd({'display':'none'})
    //   // e.target,e.target.previousSibling
    // }
    // e.target.previousSibling.previousSibling.previousSibling
    // e.target.class = 'arrow up';
    // setShowAttribute=false;
  }

  function loadAddDivBlock(step,style){
      return(
        <>
            {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
                    {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i class="arrow down" onClick={(e) =>hideShowMenu(e,"hideShowAddBox")}></i></p> */}
                    <div style={{border: '1px solid'}}><span class="close" onClick={(e) => closeWindow(e,"addStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 ,padding: '9px'}}>
                        <div>
                            <Popup trigger={<button> Input Value 1</button>}>
                                Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                                <input type="text" ></input>&nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1")}>Add</button>
                            </Popup><br/><br/>
                            <Popup trigger={<button> Input Value 2</button>}>
                                Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                                <input type="text" ></input>&nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2")}>Add</button>
                            </Popup>
                        </div>
                        <div style={{border: '1px solid', 'textAlign': 'center'}}>
                            {/* {buttonText} */} Add
                        </div>
                        <div>
                          <button type='button' style={{'cursor':'pointer'}} onClick={(e) =>calculateValue(input1,input2,'numberAddition')}>Result</button> &nbsp;{addResult>0 ? addResult :''}<br/><br/>
                        </div>
                      </div>
                    </div>
        </>
      )
  }

  function loadSubstractDivBlock(step,style){
    return(
      <>
      {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
                {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i class="arrow down"></i></p> */}
                <div style={{border: '1px solid'}}><span class="close" onClick={(e) => closeWindow(e,"substractStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 ,padding: '9px'}}>
                    <div>
                        <Popup trigger={<button> Input Value 1</button>}>
                            Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1")}>Add</button>
                        </Popup><br/><br/>
                        <Popup trigger={<button> Input Value 2</button>}>
                            Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2")}>Add</button>
                        </Popup>
                    </div>
                    <div style={{border: '1px solid', 'textAlign': 'center'}}>
                        {/* {buttonText} */} Substract
                    </div>
                    <div>
                      <button type='button' style={{'cursor':'pointer'}}  onClick={(e) =>calculateValue(input1,input2,'numberSubstraction')}>Result</button>&nbsp;{substractResult>0 ? substractResult :''}<br/><br/>
                    </div>
                  </div>
                </div>
      </>
    )
  }
  
  function loadConcatStringDivBlock(step){
    return(
      <>
      {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
                {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i class="arrow down"></i></p> */}
                <div style={{border: '1px solid'}}><span class="close" onClick={(e) => closeWindow(e,"concatStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 ,padding: '9px'}}>
                    <div>
                        <Popup trigger={<button> String 1</button>}>
                            Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1")}>Add</button>
                        </Popup><br/><br/>
                        <Popup trigger={<button> String 2</button>}>
                            Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2")}>Add</button>
                        </Popup>
                    </div>
                    <div style={{border: '1px solid', 'textAlign': 'center'}}>
                        {/* {buttonText} */} Concat
                    </div>
                    <div>
                      <button type='button' style={{'cursor':'pointer'}}  onClick={(e) =>calculateValue(input1,input2,'concatString')}>Result</button>&nbsp;{concatResult}<br/><br/>
                    </div>
                  </div>
                </div>
      </>
    )
  }

  function loadReplaceStringDivBlock(step){
    return(
      <>
      {/* <p style={{'textAlign': 'center'}}>Step:{stepCounter}</p> */}
                {/* <p id="1" style={{'textAlign': 'center'}}>Step:{step}<br/><i class="arrow down"></i></p> */}
                <div style={{border: '1px solid'}}><span class="close" onClick={(e) => closeWindow(e,"replaceStepDelete")} style={{'paddingRight':'9px','paddingLeft': '797px','fontSize': '19px', 'cursor': 'pointer'}} >&times;</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 ,padding: '9px'}}>
                    <div>
                        <Popup trigger={<button> String 1</button>}>
                            Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input1" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input1")}>Add</button>
                        </Popup><br/><br/>
                        <Popup trigger={<button> String 2</button>}>
                            Please Add value  <span class="close"  onClick={(e) =>closeWindow(e,"popUpClose")} style={{ 'paddingLeft': '67px','fontSize': 'x-large','cursor': 'pointer'}} >&times;</span>
                            <input type="text" id="input2" ></input> &nbsp;<button type='button' onClick={(e) =>saveInputValue(e,"input2")}>Add</button>
                        </Popup>
                    </div>
                    <div style={{border: '1px solid', 'textAlign': 'center'}}>
                        {/* {buttonText} */} Replace
                    </div>
                    <div>
                      <button type='button' style={{'cursor':'pointer'}}  onClick={(e) =>calculateValue(input1,input2,'replaceString')}>Result</button>&nbsp;{replaceResult}<br/><br/>
                    </div>
                  </div>
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

  return (
    <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 }}>
            <div style={{border:'1px solid #5a585866'}}><TreeMenu/></div>
            <div style={{border:'1px solid #5a585866' ,padding: '34px'}}onDragOver={stepDragOver}>{displayDataTest}</div>
            {/* <div style={{border:'1px solid #5a585866' ,padding: '34px'}}>{displayDataTest}</div> */}
            <div style={{border:'1px solid #5a585866',padding: '11px'}}>
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
                    onDragStart={dragStart}>Replace</li>
                </ul>
              </div>
            </div>
        </div>
    </>
  );
}


function App() {
  const [operations,setOperations]=useState({"A":['Add', 'Substract']})

  return (
    <>
      <div class="App">
          <List operations={operations.A}/>
      </div>
      {/* <Form /> */}
    </>
  );
}

export default App;
