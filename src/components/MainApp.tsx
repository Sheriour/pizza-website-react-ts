import { useState } from "react";
import NewPizzaPage from "./NewPizzaPage";
import PizzaListPage from "./PizzaListPage";
import TopMenuButton from "./TopMenuButton";
import { Pizza } from "../Types";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MainApp() {
  //Can be initial, newpizza, pizzalist
  const [appMode, setAppMode] = useState("initial");

  const onSelectAppMode = (newAppMode: string) => {
    setAppMode(newAppMode);
  };

  //Global list of pizzas
  const [createdPizzas, setCreatedPizzas] = useState<Pizza[]>([]);

  const onAddCreatedPizza = (newPizza: Pizza) => {
    setCreatedPizzas((previousCreatedPizzas) => [
      ...previousCreatedPizzas,
      newPizza,
    ]);

    console.log(createdPizzas);
  };

  return (
    //Top level container
    <div
      className="container"
      style={{ maxWidth: 600, backgroundColor: "beige" }}
    >
      <ToastContainer />

      {/*Header*/}
      <div className="row text-center border-bottom">
        <h1>Pizza Maker Deluxe</h1>
      </div>

      {/*Button container*/}
      <div className="mt-2 pb-2 row">
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
          <NewPizzaPage
            currentPizzas={createdPizzas}
            onAddCreatedPizza={onAddCreatedPizza}
          />
        ) : appMode == "pizzalist" ? (
          <PizzaListPage createdPizzas={createdPizzas} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MainApp;
