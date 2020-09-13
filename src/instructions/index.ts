import { InstructionType, PlaceInstruction } from './types';
import { RobotFacing, RobotPosition } from '../simulator/state/types';

const instructionsWithNoParameters = [
  InstructionType.Left,
  InstructionType.Right,
  InstructionType.Move,
  InstructionType.Report,
];

const parseNoParameterInstruction = (command: string) => {
  if (instructionsWithNoParameters.includes(command as InstructionType)) {
    return {
      type: command as InstructionType,
    };
  } else {
    throw new Error(`${command} is not a valid no-parameter command`);
  }
};

const parsePosition = (params: string) => {
  const A = params.split(',');
  if (A.length !== 3) {
    throw new Error(`Position expects 3 arguments, but got ${A.length}`);
  }
  const x = parseInt(A[0], 10);
  const y = parseInt(A[1], 10);
  const facing = A[2];
  if (
    isNaN(x) ||
    isNaN(y) ||
    !Object.values(RobotFacing).includes(facing as RobotFacing)
  ) {
    throw new Error(
      `Invalid position string '${params}' {${x},${y},${Object.values(
        RobotFacing
      )}}`
    );
  }
  return { x, y, facing };
};

export const parseInstruction = (line: string) => {
  try {
    const A = line.trim().split(' ');
    if (A.length === 1) {
      return parseNoParameterInstruction(A[0]);
    } else if (A.length === 2 && A[0] === InstructionType.Place) {
      return {
        type: InstructionType.Place,
        position: parsePosition(A[1]),
      } as PlaceInstruction;
    }
  } catch (e) {
    console.warn(`Unknown instruction '${line}': ${e.message}`);
  }
  return { type: InstructionType.NoOp };
};
