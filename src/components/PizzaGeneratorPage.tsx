import { ChangeEvent, useState } from "react";
import { IngredientDiet, Pizza } from "../Types";
import { generatePizza } from "../utils/PizzaGenerator";
import SimpleButton from "./SimpleButton";
import PizzaAppDropdown from "./PizzaAppDropdown";
import { toastSuccess } from "../utils/PizzaToast";
import CreatedPizzaListItem from "./CreatedPizzaListItem";

type PizzaGeneratorProps = {
  onAddCreatedPizza: (newPizza: Pizza) => void;
  currentPizzas: Pizza[];
};

function PizzaGeneratorPage({
  onAddCreatedPizza,
  currentPizzas,
}: PizzaGeneratorProps) {
  let innerMargins = "mt-3";

  const [generateCount, setGenerateCount] = useState(1);
  const [pizzaDiet, setPizzaDiet] = useState<IngredientDiet>("all");
  const [generatedPreviewPizzas, setgeneratedPreviewPizzas] = useState<Pizza[]>(
    []
  );

  const handleGenerateCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let count = +e.currentTarget.value;
    if (count > 10) count = 10;
    else if (count < 1) count = 1;
    setGenerateCount(count);
  };

  const handlePizzaDietChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPizzaDiet(e.currentTarget.value as IngredientDiet);
  };

  const handleDeletePizza = (pizza: Pizza) => {
    setgeneratedPreviewPizzas((previousgeneratedPreviewPizzas) => [
      ...previousgeneratedPreviewPizzas.filter(
        (x) => x.pizzaName !== pizza.pizzaName
      ),
    ]);
  };

  const handleAddGeneratedPizzaToPreview = (newPizza: Pizza) => {
    setgeneratedPreviewPizzas((previousgeneratedPreviewPizzas) => [
      ...previousgeneratedPreviewPizzas,
      newPizza,
    ]);
  };

  const clearPreviewPizas = () => {
    setgeneratedPreviewPizzas([]);
  };

  /**
   * Generates a pizza and processes it further based on the passed callback function
   * To avoid name duplication, the utils function generatePizza() will be given a concatenation
   * of existing pizzas and any preview pizzas currently on screen.
   *
   * @param count                 Number of pizzas to generate
   * @param handleGeneratedPizza  A call back function defining pizza treatment after creation
   */
  const handleGenerateWithCallback = (
    count: number,
    handleGeneratedPizza: (pizza: Pizza) => void
  ) => {
    let generatedPizzaCount = 0;

    let generatedPizza = null;
    for (let i = 0; i < count; i++) {
      generatedPizza = generatePizza(
        [...currentPizzas, ...generatedPreviewPizzas],
        pizzaDiet
      );
      if (generatedPizza !== null) {
        handleGeneratedPizza(generatedPizza as Pizza);
        generatedPizzaCount++;
      }
    }
    if (generateCount > 0) {
      if (generateCount == 1) toastSuccess("Generated one pizza.");
      else toastSuccess("Generated " + generateCount + " pizzas.");
    }
  };

  /**
   * Adds all pizzas listed in preview to archive and clears the preview list
   */
  const handleAddAllPreviewToArchive = () => {
    let count = generatedPreviewPizzas.length;
    for (const pizza of generatedPreviewPizzas) onAddCreatedPizza(pizza);
    clearPreviewPizas();
    toastSuccess("Added " + count + " pizzas to Archive.");
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
            stateUpdateFunction={handlePizzaDietChange}
            stateVar={pizzaDiet}
          ></PizzaAppDropdown>
        </div>

        <div className="container border mt-2 pb-3">
          <div className={innerMargins}>
            <SimpleButton
              buttonText="Generate & Archive"
              handleOnClick={() =>
                handleGenerateWithCallback(generateCount, onAddCreatedPizza)
              }
            ></SimpleButton>
          </div>
        </div>
        <div className="container border mt-2 pb-3">
          <div className={"container " + innerMargins}>
            <SimpleButton
              buttonText="Generate & Preview"
              handleOnClick={() => {
                clearPreviewPizas();
                handleGenerateWithCallback(
                  generateCount,
                  handleAddGeneratedPizzaToPreview
                );
              }}
            ></SimpleButton>
          </div>

          <div className={"container " + innerMargins}>
            {generatedPreviewPizzas.length > 0 ? (
              <SimpleButton
                buttonText="Archive All"
                handleOnClick={handleAddAllPreviewToArchive}
              ></SimpleButton>
            ) : null}
          </div>

          {generatedPreviewPizzas.length === 0 ? (
            <p className="text-center">No pizzas generated for preview.</p>
          ) : null}

          <div className={"container mt-2"}>
            <div className="list-group" id="pizza-list">
              {generatedPreviewPizzas.map((x) => (
                <CreatedPizzaListItem
                  key={x.pizzaName}
                  pizza={x}
                  handleDelete={handleDeletePizza}
                ></CreatedPizzaListItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PizzaGeneratorPage;
