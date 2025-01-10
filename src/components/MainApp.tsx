import { useState } from "react";
import NewPizzaPage from "./NewPizzaPage";
import PizzaListPage from "./PizzaListPage";
import TopMenuButton from "./TopMenuButton";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function MainApp() {
  //Can be initial, newpizza, pizzalist
  const [appMode, setAppMode] = useState("initial");

  const onSelectAppMode = (newAppMode: string) => {
    setAppMode(newAppMode);
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
          <NewPizzaPage />
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
