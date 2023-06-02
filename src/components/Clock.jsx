import { useEffect, useState } from "react";
import "./css/clock.css";
const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [intervalId, setIntervalId] = useState(0);
  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000)
    );
  }, []);
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  return <span>{time}</span>;
};

export default Clock;
