import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

enum ClockState {
  INIT,
  RUNNING,
  PAUSED,
  DONE
}

enum ClockTypes {
  WORK = "Working",
  BREAK = "On Break"
}

const Clock = ({
  defaultTime = 25 * 60,
  title = "Developing",
  clockType = ClockTypes.WORK
}) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [overallTimeLeft, setOverallTimeLeft] = useState(defaultTime);
  const [startTime, setStartTime] = useState(Date.now());
  const [clockState, setClockState] = useState(ClockState.INIT);
  const EPSILON = 0.0001;

  const reset = () => {
    setStartTime(Date.now());
    setTimeLeft(defaultTime);
    setOverallTimeLeft(defaultTime);
    setClockState(ClockState.INIT);
  };

  const pause = () => {
    setClockState(ClockState.PAUSED);
    setOverallTimeLeft(timeLeft);
  };

  const stop = () => {
    reset();
  };
  const start = () => {
    reset();
    setClockState(ClockState.RUNNING);
  };
  const resume = () => {
    setClockState(ClockState.RUNNING);
    setStartTime(Date.now());
  };

  const registerDone = () => {
    setTimeLeft(0);
    setClockState(ClockState.DONE);
    // send data to backend/db etc here
  };

  function displayTime(secondsIn: number): string {
    const seconds: number = secondsIn % 60;
    const minutes: number = Math.floor(secondsIn / 60);
    const minStr: string = minutes < 10 ? `0${minutes}` : minutes.toString();
    const secStr: string = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${minStr}:${secStr}`;
  }

  useEffect(() => {
    const timer = setTimeout(
      () =>
        clockState === ClockState.RUNNING &&
        setTimeLeft(
          overallTimeLeft - Math.floor((Date.now() - startTime) / 1000)
        ),
      1000
    );
    if (timeLeft <= 0 + EPSILON) {
      clearTimeout(timer);
      setClockState(ClockState.DONE);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, clockState]);

  const renderButtons = () => {
    switch (clockState) {
      case ClockState.INIT:
        return (
          <React.Fragment>
            <Button onPress={start} title="Start"></Button>
            <Button onPress={stop} title="Stop"></Button>
          </React.Fragment>
        );
      case ClockState.RUNNING:
        return (
          <React.Fragment>
            <Button onPress={pause} title="Pause"></Button>
            <Button onPress={stop} title="Stop"></Button>
          </React.Fragment>
        );
      case ClockState.PAUSED:
        return (
          <React.Fragment>
            <Button onPress={resume} title="Resume"></Button>
            <Button onPress={registerDone} title="Complete"></Button>
          </React.Fragment>
        );
      case ClockState.DONE:
        return (
          <React.Fragment>
            <Button onPress={start} title="Start"></Button>
          </React.Fragment>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text>{title}</Text>
        <Text>{clockType}</Text>
        <Text>{displayTime(timeLeft)}</Text>
        {clockState === ClockState.DONE && <Text>Done</Text>}
      </View>
      <View style={styles.buttonContainer}>{renderButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  timerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Clock;
