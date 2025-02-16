import { Ingredient, IngredientDiet, NullablePizza, Pizza } from "../Types";
import {
  getRandomArrayElement,
  getRandomArrayElements,
  ingredientMatchesDiet,
} from "./Utils";
import ingredients from "../data/ingredients.json";

const crustTypes: string[] = ["Thin", "Thick"];
const defaultIngredients = ingredients as Ingredient[];

const sauceIngredients = defaultIngredients.filter((x) => x.type === "sauce");
const cheeseIngredients = defaultIngredients.filter((x) => x.type === "cheese");
const toppingIngredients = defaultIngredients.filter(
  (x) => x.type === "meat" || x.type === "plant"
);

const firstNamePart = [
  "Tasty",
  "Indulgent",
  "Savory",
  "Succulent",
  "Flavorful",
  "Mouthwatering",
  "Delicious",
  "Hearty",
  "Zesty",
  "Delectable",
  "Scrumptious",
  "Aromatic",
  "Tempting",
  "Luscious",
  "Appetizing",
  "Rich",
  "Satisfying",
  "Exquisite",
  "Spicy",
  "Wholesome",
  "Piquant",
  "Toothsome",
  "Heavenly",
  "Sumptuous",
  "Creamy",
];

const secondNamePart = [
  "Feast",
  "Delight",
  "Banquet",
  "Treat",
  "Indulgence",
  "Savor",
  "Pleasure",
  "Joy",
  "Spread",
  "Symphony",
  "Extravaganza",
  "Experience",
  "Celebration",
  "Bounty",
  "Adventure",
  "Tapestry",
  "Revelry",
  "Euphoria",
  "Essence",
  "Melody",
  "Masterpiece",
  "Luxury",
  "Bliss",
  "Haven",
  "Paradise",
];

/**
 * Genereates a random pizza with a unique random name
 *
 * @param currentPizzas The list of all current pizzas
 * @returns             A randomly generated pizza
 */
export function generatePizza(
  currentPizzas: Pizza[],
  diet: IngredientDiet
): NullablePizza {
  const name = generateUniquePizzaName(currentPizzas.map((x) => x.pizzaName));

  //If sent diet is "all", randomise the diet, but skew towards general pizzas
  if (diet == "all")
    diet = getRandomArrayElement([
      "all",
      "all",
      "all",
      "all",
      "vegetarian",
      "vegan",
    ]);

  if (name !== "") {
    return {
      crust: getRandomArrayElement(crustTypes),
      pizzaName: name,
      ingredients: generatePizzaIngredients(diet),
    };
  } else return null;
}

/**
 * Generates a list of ingredients for a pizza with given diet
 * Non-vegan pizzas will not be generated with vegan cheese
 *
 * @param diet  Desired pizza diet
 * @returns     An array of ingredients matching the desired diet
 */
function generatePizzaIngredients(diet: IngredientDiet): Ingredient[] {
  //First let's filter out based on normal diet matching
  const filteredSauceIngredients = sauceIngredients.filter((x) =>
    ingredientMatchesDiet(x, diet)
  );
  let filteredCheeseIngredients = cheeseIngredients.filter((x) =>
    ingredientMatchesDiet(x, diet)
  );
  //Given that non-vegan people despise "vegan cheeze", we need to make sure
  //that generating non-vegan pizzas avoids using any vegan cheese substitutes
  if (diet !== "vegan")
    filteredCheeseIngredients = filteredCheeseIngredients.filter(
      (x) => x.diet !== "vegan"
    );

  //Start with one sauce and one cheese
  const ingredients = [
    { ...getRandomArrayElement(filteredSauceIngredients), portion: 1 },
    { ...getRandomArrayElement(filteredCheeseIngredients), portion: 1 },
  ];
  //And add random number of toppings (between 1 and 4)
  const randomToppingIngredients = getRandomArrayElements(
    toppingIngredients
      .filter((x) => ingredientMatchesDiet(x, diet))
      .map((x) => {
        return { ...x }; //Generate a shallow copy
      }),
    Math.floor(Math.random() * 4) + 1
  );

  for (const ingr of randomToppingIngredients) {
    ingr.portion = Math.floor(Math.random() * 2) + 1;
  }
  return ingredients.concat(randomToppingIngredients);
}

/**
 * Generates a random unique pizza name by comparing it to the array of passed names
 *
 * @param currentNames  Current names of pizzas to avoid
 * @returns             Random name of a pizza which does not exist in array of current names
 */
function generateUniquePizzaName(currentNames: string[]): string {
  const maxRetries = 10;
  let retries = 0;

  let newName = generatePizzaName();
  while (currentNames.includes(newName) && retries < maxRetries) {
    retries++;
    newName = generatePizzaName();
  }
  if (retries === 10) {
    console.error(
      "Reached 10 retries while trying to generate a unique pizza name. Bailing out."
    );
    return "";
  }

  return newName;
}

/**
 * @returns a random pizza name from the two arrays of strings like "Heavenly Symphony"
 */
function generatePizzaName(): string {
  return (
    getRandomArrayElement(firstNamePart) +
    " " +
    getRandomArrayElement(secondNamePart)
  );
}
