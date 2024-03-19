import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import music from "../assets/alarm.mp3";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { MdNotStarted } from "react-icons/md";
import { FaPauseCircle } from "react-icons/fa";


function Home() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [active, setActive] = useState(false);
  const [audio, setAudio] = useState(); // State variable to store the audio object
  const navigate = useNavigate();

  const [workMinute, setWorkMinute] = useState(25);

  useEffect(() => {
    setMinute(workMinute);
    setSecond(0);
  }, []);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        if (second === 0 && minute === 0) {
          clearInterval(interval);
          playMusic();
          // Move the confirmation dialog here
          let shortBreak = window.confirm(
            "Would you like to take a short break?"
          );
          if (shortBreak) {
            navigate("/shortBreak");
            // Pause the music after confirmation
            if (audio) {
              audio.pause();
            }
          }
          setMinute(workMinute);
          setActive(false);
        } else if (second === 0) {
          setMinute((prevMinute) => prevMinute - 1);
          setSecond(59);
        } else {
          setSecond((prevSecond) => prevSecond - 1);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      // Pause the music when component unmounts
      if (audio) {
        audio.pause();
      }
    };
  }, [minute, second, active, navigate, workMinute, audio]); // Include audio in the dependency array

  function timeFormat() {
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    const formattedSecond = second < 10 ? `0${second}` : `${second}`;
    return `${formattedMinute}:${formattedSecond}`;
  }

  function handleStart() {
    setActive(true);
  }

  function handlePause() {
    setActive(false);
  }

  function handleStop() {}

  function playMusic() {
    const audio = new Audio(music); // Adjust the path if necessary
    audio.play();
    setAudio(audio); // Store the audio object in state
  }

  return (
    <div className="container">
      <div onClick={() => navigate('/shortBreak')} className="link">
        <MdOutlineFreeBreakfast className='icon'/>
      </div>
      <h1>Pomodoro</h1>
      <span>{timeFormat()}</span>
      <div className="circle">
      </div>
      <div className="buttons">
      <button onClick={handleStart}>< MdNotStarted className='btn-icon'/></button>
        <button onClick={handlePause}><FaPauseCircle className='btn-icon'/></button>
      </div>
    </div>
  );
}

export default Home;
