export function replaceMiddleWithDots(
  str: string,
  dotCount: number = 3
): string {
  const totalLength = str.length;

  if (totalLength <= dotCount) {
    return ".".repeat(dotCount); // Return only dots if string is too short
  }

  const remainingLength = totalLength - dotCount;
  const firstHalfLength = Math.floor(remainingLength / 2);
  const secondHalfLength = remainingLength - firstHalfLength;

  const start = str.substring(0, firstHalfLength);
  const end = str.substring(totalLength - secondHalfLength);
  const dots = ".".repeat(dotCount);

  return `${start}.....${end}`;
}
