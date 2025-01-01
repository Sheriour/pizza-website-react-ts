import WelcomeMessage from "./WelcomeMessage";

function MainApp() {
  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <div className="row text-center border-bottom bg-warning-subtle">
        <h3>Pizza Maker Deluxe</h3>
      </div>

      <div className="mt-2 row">
        <div className="col">
          <div className="row">
            <button type="button" className="mx-2 btn btn-success col">
              New Pizza
            </button>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <button type="button" className="mx-2 btn btn-warning col">
              Pizza Archive
            </button>
          </div>
        </div>
      </div>

      <div className="text-center"></div>
    </div>
  );
}

export default MainApp;
