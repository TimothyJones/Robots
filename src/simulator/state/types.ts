export enum RobotFacing {
  North = 'NORTH',
  South = 'SOUTH',
  East = 'EAST',
  West = 'WEST',
}

export interface RobotPosition {
  x: number;
  y: number;
  facing: RobotFacing;
}

export interface Board {
  sizeX: number;
  sizeY: number;
}

export interface WorldState {
  board: Board;
  robot?: RobotPosition;
}
