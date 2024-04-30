import "./Spinner.scss"; // Assuming you have a CSS file named Spinner.css where you put your CSS

function Spinner() {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}

export default Spinner;
