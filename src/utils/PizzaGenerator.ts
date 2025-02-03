import { Ingredient, Pizza } from "../Types";
import { GetRandomArrayElement } from "./Utils";
import ingredients from "../data/ingredients.json";

const crustTypes: string[] = ["Thin", "Thick"];
const defaultIngredients = ingredients as Ingredient[];

const sauceIngredients = defaultIngredients.filter(x => x.type === "sauce");
const cheeseIngredients = defaultIngredients.filter(x => x.type === "cheese");
const toppingIngrdients = defaultIngredients.filter(x => x.type === "meat" || x.type === "plant");

export function GeneratePizza(currentPizzas: Pizza[]): Pizza {
    
    //Select random ingredients
    //  One sauce
    //  One cheese
    //  1-4 toppings of various portion sizes

    return {
      crust: GetRandomArrayElement(crustTypes),
      pizzaName: "Random",
      ingredients: defaultIngredients
    };
}