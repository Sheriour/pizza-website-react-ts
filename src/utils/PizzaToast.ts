import { toast } from "react-toastify";

/**
 * Creates a "success" toast at the top of the screen which vanihses after 3 seconds
 */
export function ToastSuccess(text: string) {
  toast.success(text, {
    position: "top-center",
    autoClose: 3000,
  });
}

/**
 * Creates a "failure" toast at the top of the screen which vanihses after 3 seconds
 */
export function ToastFailure(text: string) {
  toast.error(text, {
    position: "top-center",
    autoClose: 3000,
  });
}
