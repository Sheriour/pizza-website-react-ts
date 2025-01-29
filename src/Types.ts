export type Ingredient = {
    id: number;
    name: string;
    portion: number; //not included (0), single portion (1), double portion (2)
    diet: IngredientDiet;
  };

export type IngredientDiet = "animal" | "vegetarian" | "vegan"

export type Pizza = {
    pizzaName: string;
    crust: string;
    ingredients: Ingredient[];
}