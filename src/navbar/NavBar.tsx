import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Screen } from "../shared/models/Screen";

export interface NavBarProps {
  setScreen: (screen: Screen) => void;
}

const NavBar = ({ setScreen }: NavBarProps) => {

  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("HH:mm"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [])

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
      <button
        className="navbar-button"
        onClick={() => setScreen(Screen.Electricity)}>
        <i className={"bi-lightning"}></i>
      </button>
      <button className="navbar-button">
        <i className={"bi-cone-striped"}></i>
      </button>
      <div className="navbar-clock">
        {time}
      </div>
    </div>
  )
}

export default NavBar;