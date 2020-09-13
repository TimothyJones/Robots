import { isOnBoard } from './board';
import * as robot from './robot';
import { WorldState, RobotPosition } from './types';

export const place = (state: WorldState, robot: RobotPosition) => {
  if (!isOnBoard(state.board, robot)) {
    console.warn(
      `Cannot place: position '${robot.x},${robot.y}' is out of bounds`
    );
    return state;
  }
  return {
    ...state,
    robot,
  };
};

export const report = (state: WorldState) => {
  if (!state.robot) {
    console.warn('Cannot report: Robot is not on the board');
  } else {
    console.log(`${state.robot?.x},${state.robot?.y},${state.robot?.facing}`);
  }
  return state;
};

export const rotateLeft = (state: WorldState) => {
  if (!state.robot) {
    console.warn('Cannot rotate: Robot is not on the board');
    return state;
  }
  return {
    ...state,
    robot: robot.rotateLeft(state.robot),
  };
};

export const rotateRight = (state: WorldState) => {
  if (!state.robot) {
    console.warn('Cannot rotate: Robot is not on the board');
    return state;
  }
  return {
    ...state,
    robot: robot.rotateRight(state.robot),
  };
};

export const moveForward = (state: WorldState) => {
  if (!state.robot) {
    console.warn('Cannot move: Robot is not on the board');
    return state;
  }
  const movedRobot = robot.moveForward(state.robot);
  if (!isOnBoard(state.board, movedRobot)) {
    console.warn('Cannot move forward: Robot is at edge of board');
    return state;
  }
  return { ...state, robot: movedRobot };
};
