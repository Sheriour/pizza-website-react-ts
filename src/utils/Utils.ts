import { IngredientDiet, Ingredient } from "../Types";

export function GetDietFromIngredientList(ingredients: Ingredient[]): IngredientDiet {
    if (ingredients.some(x => x.diet === "animal")) return "animal";
    if (ingredients.some(x => x.diet === "vegetarian")) return "vegetarian";
    return "vegan";
}

export function IngredientMatchesDiet(ingredient: Ingredient, diet: IngredientDiet): boolean {
    //Anything goes if this is chosen
    if (diet === "animal") return true;
    
    //For vegan and vegetarian, we compare score
    let score: number = ingredient.diet === "vegan" ? 2 : ingredient.diet === "vegetarian" ? 1 : 0;
    if (diet === "vegetarian") return score > 0;
    if (diet === "vegan") return score > 1;

    //Default route
    return false;
}