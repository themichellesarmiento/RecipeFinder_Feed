interface ParsedContent {
  ingredients: string[];
  instructions: string[];
}

export const parseRecipeContent = (content: string | null): ParsedContent => {

  const [, ingredientsText = '', instructionsText = ''] = content?.match(/Ingredients:\s*([\s\S]*?)\s*Instructions:\s*([\s\S]*)/) ?? [];

  const ingredients = ingredientsText
    .split('-')
    .map(item => item.trim())
    .filter(Boolean);

  const instructions = instructionsText
    .split(/\d+\.\s*/)
    .map(step => step.trim())
    .filter(Boolean);

  return { ingredients, instructions };
}