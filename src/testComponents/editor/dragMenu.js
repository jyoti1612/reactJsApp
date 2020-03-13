import React, {useState ,useEffect, Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

function Dragmenu({data}) {
    const [sampleData, setSampleTable] = useState({ treeData: [{ title: 'Step1', children: [{ title: 'Inner Step1' }] },{ title: 'Step2', children: [{ title: 'Inner Step2' }] }]});
    return (
        <div style={{ height: 400 }}>
        <SortableTree
          treeData={sampleData.treeData}
          onChange={treeData => setSampleTable({ treeData })}
        />
      </div>
    );
}

export default Dragmenu;