// src/utils/random.utils.ts
export const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
