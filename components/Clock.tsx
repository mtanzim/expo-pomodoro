import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, AppState } from "react-native";

enum ClockState {
  INIT,
  RUNNING,
  PAUSED,
  DONE
}

const Clock = ({ defaultTime = 0.1 * 60 }) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [overallTimeLeft, setOverallTimeLeft] = useState(defaultTime);
  const [startTime, setStartTime] = useState(Date.now());
  const EPSILON = 0.0001;
  const [clockState, setClockState] = useState(ClockState.INIT);

  const reset = () => {
    setStartTime(Date.now());
    setTimeLeft(defaultTime);
    setOverallTimeLeft(defaultTime);
    setClockState(ClockState.INIT);
  };

  const pause = () => {
    // setPaused(true);
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
  };

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
    return () => timer && clearTimeout(timer);
  }, [timeLeft, clockState, reset]);

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
            <Text>Done</Text>
          </React.Fragment>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text>{timeLeft}</Text>
        {renderButtons()}
      </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Clock;
