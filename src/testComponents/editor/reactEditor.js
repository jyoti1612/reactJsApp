import React from 'react';
import TreeMenu from './treeMenu';
import DragMenu from './dragMenu'
import FunctionsMenu from './sampleFunctions'


function ReactEditor() {
  return (
      <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 10 }}>
            <div><TreeMenu/></div>
            <div><DragMenu/></div>
            <div></div>
            <div><FunctionsMenu/></div>
        </div>
        {/* <div className="App">
            Editor PAGE
        </div>
        <TreeMenu/>
        <DragMenu/> */}
      </>
  );
}

export default ReactEditor;