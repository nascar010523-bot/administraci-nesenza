import { studyTest } from './study.js';
import { foodTest } from './food.js';
import { anxietyTest } from './anxiety.js';
import { selfesteemTest } from './selfesteem.js';

export const TESTS = {
  study: studyTest,
  food: foodTest,
  anxiety: anxietyTest,
  selfesteem: selfesteemTest,
};

export const TEST_LIST = Object.values(TESTS);
