import { Screen } from "../shared/models/Screen";

export interface NavBarProps {
  setScreen: (screen: Screen) => void;
}

const NavBar = ({ setScreen }: NavBarProps) => {

  return (
    <div className="navbar">
      <button
        className="navbar-button"
        onClick={() => setScreen(Screen.Weather)}
      >
        <i className={"bi-cloud"}></i>
      </button>
      <button
        className="navbar-button"
        onClick={() => setScreen(Screen.Bus)}
      >
        <i className={"bi-train-front"}></i>
      </button>
      <button className="navbar-button">
        <i className={"bi-cone-striped"}></i>
      </button>
      <button className="navbar-button">
        <i className={"bi-cone-striped"}></i>
      </button>
    </div>
  )
}

export default NavBar;