type SimpleButtonProps = {
  buttonText: string;
  handleOnClick: () => void;
};

export default function SimpleButton({
  buttonText,
  handleOnClick,
}: SimpleButtonProps) {
  return (
    <>
      <div className="col">
        <div className="row">
          <div className="text-center">
            <button
              onClick={handleOnClick}
              type="button"
              className="btn btn-pizza-clickable col"
              style={{ width: 200 }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
