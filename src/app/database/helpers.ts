export function formatTags(tags: string): string[] {
  return tags.split(',').map((tag) => tag.trim());
};
