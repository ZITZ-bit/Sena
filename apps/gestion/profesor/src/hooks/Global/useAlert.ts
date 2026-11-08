import { useState } from "react";

export function useAlert() {

  const [alert, setAlert] = useState({

    show: false,
    type: "",
    message: "",

  });

  const showSuccess = (message: string) => {

    setAlert({

      show: true,
      type: "success",
      message,

    });

  };

  const showWarning = (message: string) => {

    setAlert({

      show: true,
      type: "warning",
      message,

    });

  };

  const showError = (message: string) => {

    setAlert({

      show: true,
      type: "error",
      message,

    });

  };

  return {

    alert,
    showSuccess,
    showWarning,
    showError,

  };

}