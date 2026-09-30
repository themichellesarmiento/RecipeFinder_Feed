export const slugify = (text: string) => {
  return text.trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}