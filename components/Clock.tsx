import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Clock = ({ defaultTime = 25*60 }) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [overallTimeLeft, setOverallTimeLeft] = useState(defaultTime);
  const [startTime, setStartTime] = useState(Date.now());
  const [isDone, setDone] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const EPSILON = 0.0001;

  const reset = () => {
    setStartTime(Date.now());
    setTimeLeft(defaultTime);
    setOverallTimeLeft(defaultTime);
    setDone(false);
    // setPaused(false);
  };

  const pause = () => {
    setPaused(true);
    setOverallTimeLeft(timeLeft);
  };

  const stop = () => {
    reset();
    setPaused(true);
  }
  const start = () => {
    reset();
    setPaused(false);
  }
  const resume = () => {
    setPaused(false);
    setStartTime(Date.now());
  };

  useEffect(() => {
    const timer = setTimeout(
      () =>
        !isDone &&
        !isPaused &&
        setTimeLeft(
          overallTimeLeft - Math.floor((Date.now() - startTime) / 1000)
        ),
      1000
    );
    if (timeLeft <= 0 + EPSILON) {
      clearTimeout(timer);
      // setTimeLeft(defaultTime);
      setDone(true);
    }
    return () => timer && clearTimeout(timer);
  }, [timeLeft, setDone, reset]);

  return (
    <View style={styles.container}>
      <Text>{timeLeft}</Text>
      <View style={styles.buttonContainer}>
        {/* <Button onPress={reset} title="Reset"></Button> */}
        <Button onPress={pause} title="Pause"></Button>
        <Button onPress={resume} title="Resume"></Button>
        <Button onPress={stop} title="Stop"></Button>
        <Button onPress={start} title="Start"></Button>
        {/* <Button title="Pause"></Button> */}
        {/* <Button title="Start"></Button> */}
        {/* <Button title="Stop"></Button> */}
      </View>
      {isDone && <Text>Done</Text>}
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
