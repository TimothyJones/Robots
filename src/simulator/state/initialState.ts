import { WorldState, RobotFacing } from './types';

export const initialState = (): WorldState => ({
  board: { sizeX: 5, sizeY: 5 },
  robot: { x: 0, y: 0, facing: RobotFacing.North },
});
