import { parseInstruction } from './instructions';
import { simulate, initialState } from './simulator';
import * as readLine from 'readline';
import { WorldState } from './simulator/state/types';

const readInterface = readLine.createInterface(process.stdin);

let state: WorldState = initialState();

readInterface.on('line', (line) => {
  state = simulate(state, parseInstruction(line));
});
