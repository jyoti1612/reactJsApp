import React, { useState ,useEffect ,Component} from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Editor from './Editor'
import Popup from "reactjs-popup";

import Form from './testComponents/Form/Form';
import DragDrop from './testComponents/dragDrop/drag';
import Toggle from './testComponents/ToggleDisplay/ToggleDisplay';
import SimpleVerticalList from './testComponents/reactDnd/SimpleVerticalList';
import TestVerticalList from './testComponents/testDnd/SimpleVerticalList';
import Dragula from 'react-dragula';
import ToggleDisplay from 'react-toggle-display';

function App() {
  const [operations,setOperations]=useState({"A":['Add', 'Substract']})
  return (
    <>
      <div className="App">
          <Editor operations={operations.A}/>
      </div>
      {/* <SimpleVerticalList/> */}
      {/* <TestVerticalList/> */}
      {/* <DragDrop/> */}
      {/* <Form /> */}
      {/* <Toggle/> */}
      
    </>
  );
}

export default App;
