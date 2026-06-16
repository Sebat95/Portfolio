import { Vector3 } from 'three';

export const numsToVector3 = (nums: readonly [number, number, number]) =>
  new Vector3(nums[0], nums[1], nums[2]);

export const isEmpty = (input: string | undefined) =>
  input == null || input === '';

export const isNotEmpty = (input: string | undefined) => !isEmpty(input);
