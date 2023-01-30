export function filesObjectsAreSame(current: Record<string, string>, target: Record<string, string>): boolean {
  return normalize(JSON.stringify(current)) === normalize(JSON.stringify(target));
}

function normalize(code: string) {
  const whitespace = /\s+/g;
  const whiteSpaceRemoved = code.replace(whitespace, '');
  return whiteSpaceRemoved.replace(/;/g, '').trim();
}