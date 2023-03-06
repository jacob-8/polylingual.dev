/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return param === 'zh-TW' || param === 'en';
}