import { IngredientDiet, Ingredient, Pizza } from "../Types";

/**
 * Judge overall diet of a list of ingredients (eg. if the list has at least one meat item, it will return "all")
 *
 * @param ingredients List of ingredients
 * @returns           Overall diet of the ingredients
 */
export function getDietFromIngredientList(
  ingredients: Ingredient[]
): IngredientDiet {
  if (ingredients.some((x) => x.diet === "all")) return "all";
  else if (ingredients.some((x) => x.diet === "vegetarian"))
    return "vegetarian";
  else return "vegan";
}

/**
 * Verifies whether a given ingredient matches given diet restrictions
 *
 * @param ingredient  Ingredient in question
 * @param diet        Diet to compare against
 * @returns           True if ingredient is within the diet requirement
 */
export function ingredientMatchesDiet(
  ingredient: Ingredient,
  diet: IngredientDiet
): boolean {
  //Anything goes if this is chosen
  if (diet === "all") return true;

  //For vegan and vegetarian, we compare score
  let score: number =
    ingredient.diet === "vegan" ? 2 : ingredient.diet === "vegetarian" ? 1 : 0;
  if (diet === "vegetarian") return score > 0;
  if (diet === "vegan") return score > 1;

  //Default route
  return false;
}

/**
 * Verifies whether a given pizza matches given diet restrictions
 *
 * @param pizza       Pizza in question
 * @param diet        Diet to compare against
 * @returns           True if pizza is within the diet requirement
 */
export function pizzaMatchesDiet(pizza: Pizza, diet: IngredientDiet): boolean {
  for (const ingredient of pizza.ingredients) {
    if (!ingredientMatchesDiet(ingredient, diet)) return false;
  }
  return true;
}

/**
 * Verifies whether a given pizza matches given string partial search term
 * Search is done against pizza name, crust and ingredients
 *
 * @param pizza       Pizza in question
 * @param searchTerm  Text to compare against
 * @returns           True if pizza contains the search term
 */
export function pizzaMatchesSearchTerm(
  pizza: Pizza,
  searchTerm: string
): boolean {
  const searchTermLower = searchTerm.toLowerCase();
  if (pizza.crust.toLowerCase().includes(searchTermLower)) return true;
  if (pizza.pizzaName.toLowerCase().includes(searchTermLower)) return true;
  for (const ingredient of pizza.ingredients) {
    if (ingredient.name.toLowerCase().includes(searchTermLower)) return true;
  }
  return false;
}

/**
 * Comparer function to sort ingredients alphabtically
 *
 * @param a First ingredient
 * @param b Second ingredient
 * @returns Comparison result
 */
export function compareIngredientsAlphabetically(a: Ingredient, b: Ingredient) {
  return compareStringsAlphabetically(a.name, b.name);
}

/**
 * Comparer function to sort pizzas alphabtically
 *
 * @param a First pizza
 * @param b Second pizza
 * @returns Comparison result
 */
export function comparePizzasAlphabetically(a: Pizza, b: Pizza) {
  return compareStringsAlphabetically(a.pizzaName, b.pizzaName);
}

/**
 * Comparer function to sort strings alphabetically
 *
 * @param a
 * @param b
 * @returns
 */
function compareStringsAlphabetically(a: string, b: string) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Comparer function to sort ingredients by type
 *
 * @param a First ingredient
 * @param b Second ingredient
 * @returns Comparison result
 */
export function compareIngredientsByType(a: Ingredient, b: Ingredient) {
  if (a.type === "sauce") {
    return -1;
  }
  if (a.type === "cheese" && b.type !== "sauce") {
    return -1;
  }
  if (a.type === "meat" || a.type === "plant") {
    return 1;
  }

  return 0;
}

/**
 * Gets a random element from an array of items
 *
 * @param array Any array
 * @returns     A random item from the array
 */
export function getRandomArrayElement(array: any[]): any {
  return array[(array.length * Math.random()) | 0]; //The "| 0" truncates the floating point to an integer
}

/**
 * Gets a number of unique random elements from an array of items
 *
 * @param array Any array
 * @returns     An array of unique items from the array
 */
export function getRandomArrayElements(array: any[], count: number): any[] {
  if (count > array.length) {
    console.error(
      "Requested a count of random elements from array that was higher than array length!"
    );
    return [];
  }

  const newArray = [];
  for (let i = 0; i < count; i++) {
    let randomItem = getRandomArrayElement(array);
    newArray.push(randomItem);
    array = array.filter((x) => x !== randomItem);
  }
  return newArray;
}
