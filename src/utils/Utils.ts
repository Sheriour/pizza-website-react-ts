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

export function CompareIngredientsAlphabetically(a: Ingredient, b: Ingredient) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  export function CompareIngredientsByType(a: Ingredient, b: Ingredient) {
    if ( a.type === "sauce" ){
      return -1;
    }
    if ( a.type === "cheese" && b.type !== "sauce"){
        return -1;
      }
      if (a.type === "meat" || a.type === "plant"){
        return 1;
      }
   
return 0;
  }