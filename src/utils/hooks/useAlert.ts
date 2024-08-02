import { useCallback } from "react";
import Swal, { SweetAlertOptions } from "sweetalert2";

const useAlert = () => {
  const showAlert = useCallback((options: SweetAlertOptions) => {
    Swal.fire(options);
  }, []);

  return showAlert;
};

export default useAlert;
