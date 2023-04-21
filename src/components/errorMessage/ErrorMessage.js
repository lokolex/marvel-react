import img from "./error.gif";
import "./errorMessage.scss";

const ErrorMessage = () => {
  return (
    <div className="errorMessage">
      <img className="errorMessage__img" src={img} alt="error" />
    </div>
  );
};

export default ErrorMessage;
