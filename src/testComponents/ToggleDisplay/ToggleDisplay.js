import React, { Component ,useState} from 'react';
import ToggleDisplay from 'react-toggle-display';

function Toggle(){
    const [showFlag,setShowFlag]=useState(false);
    function handleClick(){
        let flag=!showFlag;
        setShowFlag(flag)
    }

    return(  
        <div className="App">
        <p className="App-intro">
        <button onClick={ () => handleClick() }>Toggle things</button>
        </p>
        <ToggleDisplay show={showFlag}>
            I am rendered in a span (by default) and hidden with display:none when show is false.
        </ToggleDisplay>
    </div>
    )
}
export default Toggle;