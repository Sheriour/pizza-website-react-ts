import { Ingredient, Pizza } from "../Types";
import { GetRandomArrayElement, GetRandomArrayElements } from "./Utils";
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

export function GeneratePizza(currentPizzas: Pizza[]): Pizza {
  return {
    crust: GetRandomArrayElement(crustTypes),
    pizzaName: GenerateUniquePizzaName(currentPizzas.map((x) => x.pizzaName)),
    ingredients: GeneratePizzaIngredients(),
  };
}

function GeneratePizzaIngredients(): Ingredient[] {
  //Start with one sauce and one cheese
  const ingredients = [
    { ...GetRandomArrayElement(sauceIngredients), portion: 1 },
    { ...GetRandomArrayElement(cheeseIngredients), portion: 1 },
  ];
  //And add random number of toppings (between 1 and 4)
  const randomToppingIngredients = GetRandomArrayElements(
    toppingIngredients.map((x) => {
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
function GenerateUniquePizzaName(currentNames: string[]): string {
  const maxRetries = 10;
  let retries = 0;

  let newName = GeneratePizzaName();
  while (currentNames.includes(newName) && retries < 10) {
    retries++;
    newName = GeneratePizzaName();
  }
  if (retries === 10)
    console.error(
      "Reached 10 retries while trying to generate a unique pizza name. Bailing out."
    );

  return newName;
}

/**
 * @returns a random pizza name from the two arrays of strings like "Heavenly Symphony"
 */
function GeneratePizzaName(): string {
  return (
    GetRandomArrayElement(firstNamePart) +
    " " +
    GetRandomArrayElement(secondNamePart)
  );
}
