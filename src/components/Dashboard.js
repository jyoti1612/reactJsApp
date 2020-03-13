import React, { useState } from 'react'
import axios from 'axios';
import Table from '../components/Table';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import "../index.css";

const Dashboard = () => {
    const [skip, setSkipCount] = useState(1); 
    const [limit, setLimit] = useState(1000);
    const [file, setFile] = useState();
    const [response, setResponse] = useState([]);
    const [responseExcel, setResponseExcel] = useState([]);
    const [columns, setColumns] = useState([]);
    const [displayDiv, setDisplay] = useState('none'); 

    const uploadDocument = async () => {
        const data = new FormData();
        data.append('file', file);
        const _resp = await axios.post('http://localhost:3001/uploadDocument', data);
        if(_resp && !_resp.data.error_code) {
            setResponse(_resp.data.result);
        } else {
            setResponse(_resp.data.err_desc);
        }
    }

    const uploadExcel = async () => {
        console.log("Start: ", new Date())
        const data = new FormData();
        data.append('file', file);
        const _resp = await axios.post('http://localhost:3001/uploadExcel', data);
        if(_resp && !_resp.data.error_code) {
            setResponseExcel(_resp.data.result.data);
            setColumns(_resp.data.result.columns);
            setDisplay("block");
        } else {
            setResponseExcel(_resp.data.err_desc);
        }
    }

    const fetchData = async (buttonText) => {
        if(buttonText=="prev"){
            let page=skip-1
            setSkipCount(page)
            const _resp = await axios.get('http://localhost:3001/fetchData?page='+page);
            if(_resp && !_resp.data.error_code) {
                setResponseExcel(_resp.data.result.data);
                setColumns(_resp.data.result.columns);
            } else {
                setResponseExcel(_resp.data.err_desc);
            }
        }else if(buttonText=="next"){
            let page=skip+1
            setSkipCount(page)
            const _resp = await axios.get('http://localhost:3001/fetchData?page='+page);
            if(_resp && !_resp.data.error_code) {
                setResponseExcel(_resp.data.result.data);
                setColumns(_resp.data.result.columns);
            } else {
                setResponseExcel(_resp.data.err_desc);
            }
        }
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-12 col-lg-12'>
                <input type='file'  name='file' onChange={(e) => setFile(e.target.files[0])}/><br/><br/>
                <button type='button' onClick={uploadDocument}>Upload .docx file</button>{'&nbsp'}
                <button id="convert-table" type='button' onClick={Table.writeFile}>Export File</button><br/><br/>
                <button type='button' onClick={uploadExcel}>Upload .xlsx file</button><br/>
                </div>
            </div>
            <div className='row'>
                <Table data = {response}></Table>
            </div>
            <div>
                <button onClick={(e) => fetchData("prev")}>Prev Batch</button>{'&nbsp'}
                <button onClick={(e) => fetchData("next")}>Next Batch </button><br/><br/>
                <ReactTable
                        data={responseExcel}
                        columns={columns}
                        defaultPageSize={1000}
                        style={{
                            "height": "400px",
                            "color":"black",
                            "font-size": "11px",
                            "width":"1300px !important"
                        }}
                        className="-striped -highlight"
                />
            </div><br/> 
        </>
    )
}

export default Dashboard;
