import { IngredientDiet, Ingredient } from "../Types";

/**
 * Judge overall diet of a list of ingredients (eg. if the list has at least one meat item, it will return "all")
 *
 * @param ingredients List of ingredients
 * @returns           Overall diet of the ingredients
 */
export function GetDietFromIngredientList(
  ingredients: Ingredient[]
): IngredientDiet {
  console.log(ingredients);
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
export function IngredientMatchesDiet(
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
 * Comparer function to sort ingredients aplhabtically
 *
 * @param a First ingredient
 * @param b Second ingredient
 * @returns Comparison result
 */
export function CompareIngredientsAlphabetically(a: Ingredient, b: Ingredient) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
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
export function CompareIngredientsByType(a: Ingredient, b: Ingredient) {
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
export function GetRandomArrayElement(array: any[]): any {
  return array[(array.length * Math.random()) | 0]; //The "| 0" truncates the floating point to an integer
}

/**
 * Gets a number of unique random elements from an array of items
 *
 * @param array Any array
 * @returns     An array of unique items from the array
 */
export function GetRandomArrayElements(array: any[], count: number): any[] {
  if (count > array.length) {
    console.error(
      "Requested a count of random elements from array that was higher than array length!"
    );
    return [];
  }

  const newArray: any[] = [];
  for (let i = 0; i < count; i++) {
    let randomItem = GetRandomArrayElement(array);
    newArray.push(randomItem);
    array = array.filter((x) => x !== randomItem);
  }
  return newArray;
}
