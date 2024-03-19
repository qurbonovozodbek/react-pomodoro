import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { IoIosTimer } from "react-icons/io";
import { MdNotStarted } from "react-icons/md";
import { FaPauseCircle } from "react-icons/fa";




function ShortBreak() {

    const [minute, setMinute] = useState('0')
  const [second, setSecond] = useState('0')
  const [work, setWork] = useState(false)
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  const [workMinute, setWorkMinute] = useState(5)

  useEffect(() => {
    setMinute(workMinute)
    setSecond(0)
  }, [])

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        if (second === 0 && minute === 0) {
          let shortBreak = confirm('do you want to go back to work?')
          if (shortBreak) {
            navigate('/')
          }
          setMinute(workMinute)
          setActive(false)
          setWork(false)
          clearInterval(interval)
        } else if (second === 0) {
          setMinute(prevMinute => prevMinute - 1);
          setSecond(59);
        } else {
          setSecond(prevSecond => prevSecond - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [minute, second, work, active, navigate, workMinute]);

  function timeFormat() {
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    const formattedSecond = second < 10 ? `0${second}` : `${second}`;
    return `${formattedMinute}:${formattedSecond}`;
  }

  function handleStart() {
    setActive(true)
  }

  function handlePause() {
    setWork(false)
    setActive(false)
  }


  return (
    <div className="container">
      <div onClick={() => navigate('/')} className="link">
        <IoIosTimer className='icon'/>
      </div>
      <h1>Short Break</h1>
      <span>{timeFormat()}</span>
      <div className="circle">
      </div>
      <div className="buttons">
        <button onClick={handleStart}>< MdNotStarted className='btn-icon'/></button>
        <button onClick={handlePause}><FaPauseCircle className='btn-icon'/></button>
      </div>
    </div>
  )
}

export default ShortBreak