import { useState } from "react";
import NewPizzaPage from "./NewPizzaPage";
import PizzaListPage from "./PizzaListPage";
import TopMenuButton from "./TopMenuButton";
import { Pizza } from "../Types";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function MainApp() {

  //Can be initial, newpizza, pizzalist
  const [appMode, setAppMode] = useState("initial");

  //Global list of pizzas
  const [createdPizzas, setCreatedPizzas] = useState<Pizza[]>();

  const onSelectAppMode = (newAppMode: string) => {
    setAppMode(newAppMode);
  };

  const onAddCreatedPizza = (newPizza: Pizza) => {
    createdPizzas?.push(newPizza);

    console.log(newPizza);
  };

  return (
    //Top level container
    <div
      className="container"
      style={{ maxWidth: 600, backgroundColor: "beige" }}
    >
      {/*Header*/}
      <div className="row text-center border-bottom">
        <h1>Pizza Maker Deluxe</h1>
      </div>

      {/*Button container*/}
      <div className="mt-2 row">
        {/*New Pizza Button*/}
        <TopMenuButton
          currentAppMode={appMode}
          buttonIdentifier="newpizza"
          buttonText="New Pizza"
          onClick={onSelectAppMode}
        />

        {/*Pizza List Button*/}
        <TopMenuButton
          currentAppMode={appMode}
          buttonIdentifier="pizzalist"
          buttonText="Pizza Archive"
          onClick={onSelectAppMode}
        />

        {/*Main App body*/}
        {appMode == "newpizza" ? (
          <NewPizzaPage onAddCreatedPizza={onAddCreatedPizza} />
        ) : appMode == "pizzalist" ? (
          <PizzaListPage />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MainApp;
