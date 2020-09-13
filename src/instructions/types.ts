import { RobotPosition } from '../simulator/state/types';

export enum InstructionType {
  NoOp = '',
  Place = 'PLACE',
  Move = 'MOVE',
  Left = 'LEFT',
  Right = 'RIGHT',
  Report = 'REPORT',
}

export interface Instruction {
  type: InstructionType;
}

export interface PlaceInstruction extends Instruction {
  position: RobotPosition;
}
