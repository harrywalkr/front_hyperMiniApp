"use client";

import { useState, useEffect, useRef } from "react";

interface UseTimerOptions {
  initialSeconds?: number;
  autoStart?: boolean;
  onTimeDone?: VoidFunction;
  loop?: boolean;
}

interface TimeObject {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface UseTimerReturn {
  start: (seconds?: number) => void;
  reset: () => void;
  restart: () => void;
  isTimeDone: boolean;
  remainingTime: TimeObject;
}

const secondsToTimeObject = (totalSeconds: number): TimeObject => {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export const useTimer = ({
  initialSeconds = 180,
  autoStart = true,
  onTimeDone,
  loop = false,
}: UseTimerOptions = {}): UseTimerReturn => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isTimeDone, setIsTimeDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = (seconds?: number) => {
    if (intervalRef.current) return;

    // Validate and set custom time
    if (seconds !== undefined) {
      if (seconds < 0) {
        console.warn("Timer cannot start with negative seconds");
        return;
      }
      setRemainingSeconds(Math.floor(seconds));
    }

    setIsTimeDone(false);
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsTimeDone(true);
          onTimeDone?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRemainingSeconds(initialSeconds);
    setIsTimeDone(false);
  };

  useEffect(() => {
    if (autoStart) start();
  }, [autoStart]);

  useEffect(() => {
    if (loop && isTimeDone) {
      reset();
      start(initialSeconds);
      setIsTimeDone(false);
    }
  }, [loop, isTimeDone]);

  const restart = () => {
    reset();
    start();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    start,
    reset,
    restart,
    isTimeDone,
    remainingTime: secondsToTimeObject(remainingSeconds),
  };
};
