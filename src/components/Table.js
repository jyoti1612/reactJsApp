import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import 'react-table-6/react-table.css';

function Table({data}) {
    let sampleData=data;
    const [tableInfo, setTable] = useState(sampleData);
    const [exportText,setExportText] = useState("");
    useEffect(() => {
        setTable(data);
    }, [data]);


    function renderTableData(){
        const columns = tableInfo.length>0 ? Object.keys(tableInfo[0]) : [];
          return tableInfo ? tableInfo.map((_data, index) => {
            return (
                <tr key={index}>
                     {columns.map((col, ind) => <td key={ind} style={{"fontSize":'13px'}}><input type="text" style={{ "border": "none", "width": ((_data[col].length + 1) * 8) + 'px'}} value={_data[col]} onChange={(e) => handleClick(index,ind,columns, e)} ></input></td>)}
                </tr>
            )
          }) : null
    } 

    function renderTableHeading() {
        const columns = tableInfo.length>0 ? Object.keys(tableInfo[0]) : [];
        return (
           <tr>
                {
                    columns.map((col, index) => <td style={{'fontWeight' : 'bold',"fontSize":'13px'}} >{col}</td> )
                }
           </tr>
        )
    }

    const exportData = async () => {
        console.log("[+++] Exported data:", JSON.stringify(data,null,1))
    }

    const writeFile = async () => {
        axios.post('http://localhost:3001/writefile', tableInfo)
        .then(function (response) {
            setExportText("Document file created successfully")
        })
        .catch(function (error) {
            console.log("Error While writing File:", error);
        });
    }

    function handleClick(rowIndex, colIndex,columns,event){
       let keyName=columns[colIndex];
       const _data = [...data];
       _data[rowIndex][keyName]= event.target.value;
       setTable(_data);
    }

    return (
        <div>
              <h1 id='title' style={{'fontWeight' : 'bold',"fontSize":'25px','textAlign':'center'}}></h1>
              <table id='students'>
                  <thead>
                      {data ? renderTableHeading() : null}
                  </thead>
                <tbody  style={{'border': '0.05px solid #dcd3ce'}}>
                    {data ? renderTableData() : null}
                </tbody>
              </table><br/>
              {/* <button id="convert-table" type='button' onClick={exportData}>Export Data</button> <br/> */}
              {/* <button id="convert-table" type='button' onClick={writeFile}>Export File</button> */}
              <h1 id='title' style={{'fontWeight' : 'bold',"fontSize":'25px','textAlign':'center'}}>{exportText}</h1>
        </div>
    );
}

export default Table;