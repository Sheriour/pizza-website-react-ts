import { IngredientDiet, Ingredient } from "../Types";

export function GetDietFromIngredientList(ingredients: Ingredient[]): IngredientDiet {
    if (ingredients.some(x => x.diet === "animal")) return "animal";
    if (ingredients.some(x => x.diet === "vegetarian")) return "vegetarian";
    return "vegan";
}