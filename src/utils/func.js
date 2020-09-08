export function getRandom(min, max) {
  return 0 | (Math.random() * (max - min + 1) + min)
}