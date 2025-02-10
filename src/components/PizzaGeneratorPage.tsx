import { ChangeEvent, useState } from "react";
import { IngredientDiet, NullablePizza, Pizza } from "../Types";
import { GeneratePizza } from "../utils/PizzaGenerator";
import SimpleButton from "./SimpleButton";
import PizzaAppDropdown from "./PizzaAppDropdown";
import { ToastSuccess } from "../utils/PizzaToast";
import CreatedPizzaListItem from "./CreatedPizzaListItem";

type PizzaGeneratorProps = {
  onAddCreatedPizza: (newPizza: Pizza) => void;
  currentPizzas: Pizza[];
};

function PizzaGeneratorPage({
  onAddCreatedPizza,
  currentPizzas,
}: PizzaGeneratorProps) {
  let innerMargins: string = "mt-3";

  const [generateCount, setGenerateCount] = useState(1);
  const [pizzaDiet, setPizzaDiet] = useState<IngredientDiet>("all");
  const [generatedPizzas, setGeneratedPizzas] = useState<Pizza[]>([]);

  const handleGenerateCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let count: number = +e.currentTarget.value;
    if (count > 10) count = 10;
    else if (count < 1) count = 1;
    setGenerateCount(count);
  };

  const handlePizzaTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPizzaDiet(e.currentTarget.value as IngredientDiet);
  };

  const handleDeletePizza = (pizza: Pizza) => {
    setGeneratedPizzas((previousGeneratedPizzas) => [
      ...previousGeneratedPizzas.filter((x) => x.pizzaName !== pizza.pizzaName),
    ]);
  };

  const handleAddGeneratedPizzaToPreview = (newPizza: Pizza) => {
    setGeneratedPizzas((previousGeneratedPizzas) => [
      ...previousGeneratedPizzas,
      newPizza,
    ]);
  };

  const handleGenerateWithCallback = (
    count: number,
    handleGeneratedPizza: (pizza: Pizza) => void
  ) => {
    let generatedPizzaCount: number = 0;

    let generatedPizza: NullablePizza = null;
    for (let i = 0; i < count; i++) {
      generatedPizza = GeneratePizza(currentPizzas, pizzaDiet);
      if (generatedPizza !== null) {
        handleGeneratedPizza(generatedPizza as Pizza);
        generatedPizzaCount++;
      }
    }
    if (generateCount > 0) {
      if (generateCount == 1) ToastSuccess("Generated one pizza.");
      else ToastSuccess("Generated " + generateCount + " pizzas.");
    }
  };

  return (
    <>
      <div className="container border mt-2 pb-3">
        <h4 className={"text-center mt-3"}>Pizza Generator</h4>

        <div className={"container row " + innerMargins}>
          <label htmlFor="pizzaNameInput">How many pizzas to generate?</label>
          <input
            id="pizzaCountInput"
            type="number"
            min="1"
            max="10"
            className={"form-control "}
            onChange={handleGenerateCountChange}
            value={generateCount}
          ></input>

          <PizzaAppDropdown
            label="What kind of pizzas?"
            stateList={["all", "vegetarian", "vegan"]}
            stateUpdateFunction={handlePizzaTypeChange}
            stateVar={pizzaDiet}
          ></PizzaAppDropdown>
        </div>

        <div className={"container row " + innerMargins}>
          <SimpleButton
            buttonText="Generate & Add"
            handleOnClick={() =>
              handleGenerateWithCallback(generateCount, onAddCreatedPizza)
            }
          ></SimpleButton>
          <SimpleButton
            buttonText="Generate & Preview"
            handleOnClick={() =>
              handleGenerateWithCallback(
                generateCount,
                handleAddGeneratedPizzaToPreview
              )
            }
          ></SimpleButton>
        </div>

        <div className={"container row " + innerMargins}>
          {generatedPizzas.length > 0 ? (
            <SimpleButton
              buttonText="Add generated pizzas"
              handleOnClick={() =>
                handleGenerateWithCallback(generateCount, onAddCreatedPizza)
              }
            ></SimpleButton>
          ) : null}
        </div>

        <div className={"container mt-2"}>
          <div className="list-group" id="pizza-list">
            {generatedPizzas.map((x) => (
              <CreatedPizzaListItem
                key={x.pizzaName}
                pizza={x}
                handleDelete={handleDeletePizza}
              ></CreatedPizzaListItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PizzaGeneratorPage;
