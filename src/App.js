import {
  FastBackwardOutlined,
  FastForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./App.css";
const fileMp3 = require("./test.mp3");
const App = () => {
  const audioRef = useRef();
  const timeLine = useRef();
  const [isPlay, setIsPlay] = useState(false);
  const [time, setTime] = useState({
    startTime: 0,
    endTime: 100000,
  });
  const [position, setPosition] = useState({
    start: 0,
    end: 0,
  });
  useEffect(() => {
    console.log(time);
  }, [time]);

  const handleStartTime = () => {
    let positionTimeLine =
      (100 * audioRef.current.currentTime) / audioRef.current.duration;
    let value = `${positionTimeLine % 100}%`;
    setPosition({ ...position, start: value });
    audioRef.current.play();
    setTime({ ...time, startTime: audioRef.current.currentTime });
  };
  const handleEndTime = () => {
    let positionTimeLine =
      (100 * audioRef.current.currentTime) / audioRef.current.duration;
    let value = `${positionTimeLine % 100}%`;
    setPosition({ ...position, end: value });
    setTime({ ...time, endTime: audioRef.current.currentTime });
  };

  const handleTimeUpdate = (event) => {
    let positionTimeLine =
      (100 * audioRef.current.currentTime) / audioRef.current.duration;
    timeLine.current.style.backgroundSize = `${positionTimeLine % 100}%`;
    if (Math.abs(time.endTime - event.target.currentTime) < 0.2) {
      audioRef.current.currentTime = time.startTime;
    }
  };

  const handleReset = () => {
    setTime({ ...time, endTime: audioRef.current.duration, startTime: 0 });
    setPosition({ ...position, start: "0%", end: "100%" });
  };
  const handleIsPlay = () => {
    if (isPlay) {
      audioRef.current.pause();
      setIsPlay(false);
    } else {
      audioRef.current.play();
      setIsPlay(true);
    }
  };

  const handleNextTime = () => {
    if (audioRef.current.currentTime + 5 < time.endTime)
      audioRef.current.currentTime += 5;
  };
  const handleBackTime = () => {
    if (audioRef.current.currentTime - 5 > time.startTime)
      audioRef.current.currentTime -= 5;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        flexDirection: "column",
      }}
    >
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source src={fileMp3}></source>
      </audio>
      <div>
        {isPlay ? (
          <PauseCircleOutlined onClick={handleIsPlay} className="cursor" />
        ) : (
          <PlayCircleOutlined onClick={handleIsPlay} className="cursor" />
        )}
        <div style={{ position: "relative" }}>
          <input
            type="range"
            className="timeline"
            max="100"
            value="0"
            style={{ width: "500px" }}
            ref={timeLine}
          />
          <p
            style={{
              position: "absolute",
              top: "-14px",
              left: `${position.start}`,
            }}
          >
            I
          </p>
          <p
            style={{
              position: "absolute",
              top: "-14px",
              left: `${position.end}`,
            }}
          >
            I
          </p>
        </div>
      </div>
      <div
        style={{
          border: "1px solid red",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div>
          <div>
            <p>Time Jump</p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "12px" }}
            >
              <button>
                <FastBackwardOutlined
                  style={{ fontSize: "20px" }}
                  onClick={handleBackTime}
                />
              </button>
              <button>
                <FastForwardOutlined
                  style={{ fontSize: "20px" }}
                  onClick={handleNextTime}
                  className="cursor"
                />
              </button>
            </div>
          </div>
          <div>
            <p>Play Back Speed</p>
            <div style={{ display: "flex", gap: "4px" }}>
              <button style={{ padding: "2px 10px" }}>Default</button>
              <button style={{ padding: "2px 10px" }}>Slow</button>
              <button style={{ padding: "2px 10px" }}>Fast</button>
            </div>
          </div>
        </div>
        <div
          style={{ height: "100px", width: "1px", backgroundColor: "red" }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <p>Repeat</p>
          <div>
            <span style={{ fontSize: "14px" }}>
              {`${time.startTime} ~ ${time.endTime}`}{" "}
            </span>
            <div style={{ display: "flex", gap: "4px", marginTop: "10px" }}>
              <button style={{ padding: "2px 20px" }} onClick={handleStartTime}>
                Start
              </button>
              <button style={{ padding: "2px 20px" }} onClick={handleEndTime}>
                End
              </button>
            </div>
          </div>
          <button onClick={handleReset} style={{ padding: "2px 20px" }}>
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
