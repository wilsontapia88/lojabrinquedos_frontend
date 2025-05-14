/**
 * Finds the first letter of the alphabet that doesn't appear in the given string
 * @param text The text to check
 * @returns The first missing letter, or "-" if all letters are present
 */
export function findFirstMissingLetter(text: string): string {
  if (!text) return 'a';
  
  const normalized = text.toLowerCase().replace(/[^a-z]/g, '');
  const letterSet = new Set(normalized);
  
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    if (!letterSet.has(letter)) {
      return letter;
    }
  }
  
  return "-";
}