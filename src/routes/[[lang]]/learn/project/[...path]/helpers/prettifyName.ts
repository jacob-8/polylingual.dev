const DO_NOT_CAPITALIZE = ['of', 'in', 'to', 'for', 'the'];

export function prettifyName(name: string): string {
  const parts = name.split('-');
  const withoutNumbers = parts.filter((part) => !part.match(/^\d+$/));
  const capitalized = withoutNumbers.map((part, index) => {
    if (index > 0 && DO_NOT_CAPITALIZE.includes(part)) return part;
    return part[0].toUpperCase() + part.slice(1)
  });
  const joined = capitalized.join(' ');
  return joined;
}


if (import.meta.vitest) {
  describe('prettifyName', () => {
    test('removes numbers and hyphens and capitalizes', () => {
      const input = '02-add-frame';
      const expected = 'Add Frame';
      expect(prettifyName(input)).toEqual(expected);
    });

    test('does not capitalize simple words', () => {
      const input = '01-proof-of-concept';
      const expected = 'Proof of Concept';
      expect(prettifyName(input)).toEqual(expected);
    });

    test('Always capitalize first word', () => {
      const input = '01-to-be-written';
      const expected = 'To Be Written';
      expect(prettifyName(input)).toEqual(expected);
    });
  });
}

