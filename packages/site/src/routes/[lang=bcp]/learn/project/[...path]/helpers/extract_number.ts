export function extract_number(name:string): number {
  const parts = name.split('-');
  const first = parts[0];
  const number = parseInt(first, 10);
  return number;
}

if (import.meta.vitest) {
  describe('extract_number', () => {
    test('pulls from leading 01- and 10-', () => {
      expect(extract_number('01-introduction')).toEqual(1);
      expect(extract_number('10-foo')).toEqual(10);
    });
  });
}


// const DO_NOT_CAPITALIZE = ['of', 'in', 'to', 'for', 'the'];

// export function prettifyName(name: string): string {
//   const parts = name.split('-');
//   const withoutNumbers = parts.filter((part) => !part.match(/^\d+$/));
//   const capitalized = withoutNumbers.map((part, index) => {
//     if (index > 0 && DO_NOT_CAPITALIZE.includes(part)) return part;
//     return part[0].toUpperCase() + part.slice(1)
//   });
//   const joined = capitalized.join(' ');
//   return joined;
// }


// if (import.meta.vitest) {
//   describe('prettifyName', () => {
//     test('removes numbers and hyphens and capitalizes', () => {
//       const input = '02-add-frame';
//       const expected = 'Add Frame';
//       expect(prettifyName(input)).toEqual(expected);
//     });

//     test('does not capitalize simple words', () => {
//       const input = '01-proof-of-concept';
//       const expected = 'Proof of Concept';
//       expect(prettifyName(input)).toEqual(expected);
//     });

//     test('Always capitalize first word', () => {
//       const input = '01-to-be-written';
//       const expected = 'To Be Written';
//       expect(prettifyName(input)).toEqual(expected);
//     });
//   });
// }

