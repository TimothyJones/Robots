import * as actions from './state/actions';
import { WorldState } from './state/types';
import {
  Instruction,
  InstructionType,
  PlaceInstruction,
} from '../instructions/types';
export { initialState } from './state/initialState';

export const simulate = (
  state: WorldState,
  instruction: Instruction
): WorldState => {
  switch (instruction.type) {
    case InstructionType.NoOp:
      return state;
    case InstructionType.Left:
      return actions.rotateLeft(state);
    case InstructionType.Right:
      return actions.rotateRight(state);
    case InstructionType.Move:
      return actions.moveForward(state);
    case InstructionType.Place:
      return actions.place(state, (instruction as PlaceInstruction).position);
    case InstructionType.Report:
      return actions.report(state);
    default:
      throw new Error(
        `Simulator received unknown instruction type '${instruction.type}'`
      );
  }
};
