import "../styles/pizzaMain.css";
import { AppMode } from "../Types";

type topMenuButtonProps = {
  buttonIdentifier: AppMode;
  currentAppMode: string;
  buttonText: string;
  onClick: (anewAppMode: AppMode) => void;
};

function TopMenuButton({
  buttonIdentifier,
  currentAppMode,
  buttonText,
  onClick,
}: topMenuButtonProps) {
  return (
    <div className="col">
      <div className="row">
        <button
          onClick={() => onClick(buttonIdentifier)}
          type="button"
          className={
            "mx-2 btn col " +
            (currentAppMode == buttonIdentifier
              ? "btn-pizza-active"
              : "btn-pizza-clickable")
          }
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TopMenuButton;
