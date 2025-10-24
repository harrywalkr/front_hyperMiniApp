"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerOptions {
  initialSeconds?: number | null;
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

const secondsToTimeObject = (totalSeconds: number | null): TimeObject => {
  if (!totalSeconds || totalSeconds <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

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
  const onTimeDoneRef = useRef(onTimeDone);
  const initialSecondsRef = useRef(initialSeconds);

  // Update refs when props change
  useEffect(() => {
    onTimeDoneRef.current = onTimeDone;
    initialSecondsRef.current = initialSeconds;
  }, [onTimeDone, initialSeconds]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(
    (seconds?: number) => {
      clearTimer();

      if (seconds !== undefined) {
        setRemainingSeconds(seconds);
      }

      setIsTimeDone(false);

      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev === null || prev <= 0) return prev;

          if (prev <= 1) {
            clearTimer();
            setIsTimeDone(true);
            onTimeDoneRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clearTimer]
  );

  const reset = useCallback(() => {
    clearTimer();
    setRemainingSeconds(initialSecondsRef.current);
    setIsTimeDone(false);
  }, [clearTimer]);

  const restart = useCallback(() => {
    reset();
    start();
  }, [reset, start]);

  // Auto start
  useEffect(() => {
    if (autoStart && remainingSeconds && remainingSeconds > 0) {
      start();
    }

    return clearTimer;
  }, [autoStart, clearTimer, start]);

  // Handle looping
  useEffect(() => {
    if (
      loop &&
      isTimeDone &&
      initialSecondsRef.current &&
      initialSecondsRef.current > 0
    ) {
      reset();
      start();
    }
  }, [loop, isTimeDone, reset, start]);

  return {
    start,
    reset,
    restart,
    isTimeDone,
    remainingTime: secondsToTimeObject(remainingSeconds),
  };
};
