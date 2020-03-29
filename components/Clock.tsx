import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Colors,
  ProgressBar,
  Subheading,
  Surface,
  Text,
  Title
} from "react-native-paper";
import { ICategory } from "../interfaces";
import { useTasks } from "../hooks/useTasks";

interface ClockProps {
  title: string;
  category?: ICategory;
  defaultTime?: number;
  defaultBreakTime?: number;
}

enum ClockTypes {
  WORK = "Working",
  BREAK = "On Break"
}
enum ClockState {
  INIT,
  RUNNING,
  PAUSED,
  DONE
}

const Clock = ({
  title,
  category,
  defaultTime = 10,
  // defaultBreakTime = 5
}: ClockProps) => {
  const [curType, setCurType] = useState(ClockTypes.WORK);
  const [clockState, setClockState] = useState(ClockState.INIT);
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [overallTimeLeft, setOverallTimeLeft] = useState(defaultTime);
  const [startTime, setStartTime] = useState(Date.now());
  const EPSILON = 0.0001;
  const { addTask: completeTask } = useTasks();

  const reset = () => {
    setStartTime(Date.now());
    if (curType === ClockTypes.WORK) {
      setTimeLeft(defaultTime);
      setOverallTimeLeft(defaultTime);
      return;
    }
    // setTimeLeft(defaultBreakTime);
    // setOverallTimeLeft(defaultBreakTime);
  };

  const pause = () => {
    setClockState(ClockState.PAUSED);
    setOverallTimeLeft(timeLeft);
  };

  const stop = () => {
    reset();
    setClockState(ClockState.INIT);
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
    setClockState(ClockState.DONE);
  };

  useEffect(() => {
    if (clockState === ClockState.DONE) {
      curType === ClockTypes.WORK &&
        completeTask(title, defaultTime, category?.id);
      // setCurType(
      //   curType === ClockTypes.WORK ? ClockTypes.BREAK : ClockTypes.WORK
      // );
      start();
    }
  }, [clockState]);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        clockState === ClockState.RUNNING &&
        setTimeLeft(
          overallTimeLeft - Math.floor((Date.now() - startTime) / 1000)
        ),
      1000
    );
    if (clockState === ClockState.DONE) {
      return () => clearTimeout(timer);
    }
    if (timeLeft <= 0 + EPSILON) {
      clearTimeout(timer);
      setClockState(ClockState.DONE);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, clockState]);

  const displayTime = (secondsIn: number): string => {
    const seconds: number = secondsIn % 60;
    const minutes: number = Math.floor(secondsIn / 60);
    const minStr: string = minutes < 10 ? `0${minutes}` : minutes.toString();
    const secStr: string = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${minStr}:${secStr}`;
  };

  const renderButtons = () => {
    switch (clockState) {
      case ClockState.INIT:
        return (
          <React.Fragment>
            <Button onPress={start}>Start</Button>
            <Button onPress={stop}> Stop</Button>
          </React.Fragment>
        );
      case ClockState.RUNNING:
        return (
          <React.Fragment>
            <Button onPress={pause}>Pause</Button>
            <Button onPress={stop}>Stop</Button>
          </React.Fragment>
        );
      case ClockState.PAUSED:
        return (
          <React.Fragment>
            <Button onPress={resume}>Resume</Button>
            <Button onPress={registerDone}>Complete</Button>
          </React.Fragment>
        );
      case ClockState.DONE:
        return (
          <React.Fragment>
            <Button onPress={start}>Start</Button>
          </React.Fragment>
        );
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.timerContainer}>
        <Title>{title}</Title>
        <Subheading>{category?.name}</Subheading>
        <Subheading>{curType}</Subheading>
        <Text>{displayTime(timeLeft)}</Text>
        <ProgressBar progress={0.8} color={Colors.blue800} />
      </View>
      <View style={styles.buttonContainer}>{renderButtons()}</View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 8,
    width: "50%",
    minHeight: 200,
    maxHeight: 200,
    padding: 8
    // borderColor: 'green',
    // borderWidth: 2,
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
    justifyContent: "space-between"
  }
});
export default Clock;
