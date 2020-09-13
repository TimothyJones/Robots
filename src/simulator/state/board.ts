import { Board, RobotPosition } from './types';

export const isOnBoard = (board: Board, position: RobotPosition) =>
  position.x >= 0 &&
  position.x < board.sizeX &&
  position.y >= 0 &&
  position.y < board.sizeY;
