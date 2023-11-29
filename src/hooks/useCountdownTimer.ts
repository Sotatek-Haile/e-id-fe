import dayjs from "dayjs";
import { useState, useEffect } from "react";

export default function useCountdownTimer(timestamp: number) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownComplete, setIsCountdownComplete] = useState(dayjs().unix() > timestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimestamp = dayjs().unix();
      const diff = timestamp - currentTimestamp;

      if (diff < 0) {
        setIsCountdownComplete(true);
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setIsCountdownComplete(false);
        setTime({
          days: Math.floor(diff / (60 * 60 * 24)),
          hours: Math.floor((diff / (60 * 60)) % 24),
          minutes: Math.floor((diff / 60) % 60),
          seconds: Math.floor(diff % 60),
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      setTime({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    };
  }, [timestamp]);

  return { time, isCountdownComplete };
}
