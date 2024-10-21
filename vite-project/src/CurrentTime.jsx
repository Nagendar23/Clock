import React from 'react'
import { useState } from 'react'

export default function CurrentTime() {

    const [dateTime, setDateTime]=useState("")

    setInterval(()=>{
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        setDateTime(`${formattedDate} - ${formattedTime}`)
    },1000);

    return (
    <div className='dt'>
    <h2>Date :&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; Time:</h2>
    <h2> {dateTime}</h2>
    
    
    </div>
  )
}
