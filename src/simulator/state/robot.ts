import { RobotFacing, RobotPosition } from './types';

const leftRotations = {
  [RobotFacing.North]: RobotFacing.West,
  [RobotFacing.West]: RobotFacing.South,
  [RobotFacing.South]: RobotFacing.East,
  [RobotFacing.East]: RobotFacing.North,
};

const rightRotations = {
  [RobotFacing.North]: RobotFacing.East,
  [RobotFacing.East]: RobotFacing.South,
  [RobotFacing.South]: RobotFacing.West,
  [RobotFacing.West]: RobotFacing.North,
};

export const rotateLeft = (position: RobotPosition) => ({
  ...position,
  facing: leftRotations[position.facing],
});

export const rotateRight = (position: RobotPosition) => ({
  ...position,
  facing: rightRotations[position.facing],
});

export const moveForward = (position: RobotPosition) => {
  switch (position.facing) {
    case RobotFacing.North:
      return { ...position, y: position.y + 1 };
    case RobotFacing.East:
      return { ...position, x: position.x + 1 };
    case RobotFacing.South:
      return { ...position, y: position.y - 1 };
    case RobotFacing.West:
      return { ...position, x: position.x - 1 };
    default:
      throw new Error(
        `Moving robot: Unknown robot facing '${position.facing}'`
      );
  }
};
