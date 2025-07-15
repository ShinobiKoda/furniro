import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimesCircle } from "react-icons/fa";

export const showSuccessToast = (message: string) => {
  toast.success(<div className="flex items-center gap-2">{message}</div>, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(
    <div className="flex items-center gap-2">
      <FaTimesCircle className="text-red-500" />
      {message}
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};

export const ToastProvider = () => <ToastContainer />;
