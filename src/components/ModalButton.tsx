type ModalButtonProps = {
  buttonText: string;
  modalTarget: string;
  dataTestId: string;
};

export default function ModalButton({
  buttonText,
  modalTarget,
  dataTestId,
}: ModalButtonProps) {
  return (
    <>
      <div className="col">
        <div className="text-center">
          <button
            data-test-id={dataTestId}
            type="button"
            className="btn btn-pizza-clickable col"
            data-bs-toggle="modal"
            data-bs-target={modalTarget}
            style={{ width: 200 }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
