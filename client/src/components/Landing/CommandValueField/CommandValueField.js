import React, { useEffect, useState } from 'react'
const CommandValueField = ({ setData, original }) => {
    const [command, setCommand] = useState(original.value);
    const [timeoutValue, setTimeoutValue] = useState(0);
    const [commandChanged, setCommandChanged] = useState(false);
    const setTimer = () => setCommandChanged(true)
    useEffect(() => {
        if (commandChanged) {
            setData(data=>{ 
                const updatedData  = [...data];
                const foundIndex = updatedData.findIndex(({ Deviceeui }) => Deviceeui  === original.Deviceeui);
                if (foundIndex !== -1) 
                    updatedData[foundIndex] = {...updatedData[foundIndex], value: command };
                setCommandChanged(false)
                return updatedData;
            }) 
        }
       
    }, [commandChanged, setData, original.Deviceeui, command]);

    useEffect(() => {
        setCommand(original.value)
    }, [original.value])

    return(
         <input
           value={command}
           onChange={(e)=>{
            setCommand(e.target.value)
           }} 
           onKeyPress={() => {
            if (timeoutValue) {
                clearTimeout(timeoutValue);
                setTimeoutValue(null)
            }
            const timeoutId = setTimeout(() => setTimer(), 2000);
            setTimeoutValue(timeoutId);
           }}   
          type='text' 
          style={{ width: '100%'}}/>
    )
}

export  { CommandValueField };
