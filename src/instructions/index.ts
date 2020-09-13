import { InstructionType, PlaceInstruction, Instruction } from './types';
import { RobotFacing, RobotPosition } from '../simulator/state/types';

const parsePosition = (params: string) => {
  const tokens = params.split(',');
  if (tokens.length !== 3) {
    throw new Error(`Position expects 3 arguments, but got ${tokens.length}`);
  }
  const x = parseInt(tokens[0], 10);
  const y = parseInt(tokens[1], 10);
  const facing = tokens[2];
  if (
    isNaN(x) ||
    isNaN(y) ||
    !Object.values(RobotFacing).includes(facing as RobotFacing)
  ) {
    throw new Error(`Invalid position string '${params}'`);
  }
  return { x, y, facing };
};

type InstructionGenerator = ((str: string[]) => Instruction) | Instruction;

const instructions: { [idx: string]: InstructionGenerator } = {
  [InstructionType.Left]: { type: InstructionType.Left },
  [InstructionType.Right]: { type: InstructionType.Right },
  [InstructionType.Move]: { type: InstructionType.Move },
  [InstructionType.Report]: { type: InstructionType.Report },
  [InstructionType.Place]: (tokens: string[]) => {
    if (tokens.length !== 2) {
      throw new Error(
        "PLACE command takes exactly one argument of the form '<x>,<y>,<facing>' "
      );
    }
    return {
      type: InstructionType.Place,
      position: parsePosition(tokens[1]),
    };
  },
};

const generate = (generator: InstructionGenerator, tokens: string[]) => {
  if (typeof generator === 'undefined') {
    throw new Error('Unknown command');
  }
  if (typeof generator === 'function') {
    return generator(tokens);
  }
  return generator;
};

export const parseInstruction = (line: string) => {
  try {
    const tokens = line
      .trim()
      .split(' ')
      .filter((s) => s !== '');

    return generate(instructions[tokens[0]], tokens);
  } catch (e) {
    console.warn(`Parse error in '${line}': ${e.message}`);
  }
  return { type: InstructionType.NoOp };
};
