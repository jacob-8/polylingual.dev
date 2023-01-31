export function is中文(text: string): boolean {
  const 中文 = new RegExp('[\u4E00-\u9FA5]+');
  return 中文.test(text);
}
