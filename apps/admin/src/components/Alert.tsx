type AlertProps = {

  type: string;
  message: string;

};

function Alert({ type, message }: AlertProps) {

  return (

    <div
      className={`lg:col-span-2 rounded-lg p-3 font-medium border ${
        type === "success"
          ? "bg-green-100 text-green-700 border-green-300"
          : type === "warning"
          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
          : "bg-red-100 text-red-700 border-red-300"
      }`}
    >

      {message}

    </div>

  );

}

export default Alert;