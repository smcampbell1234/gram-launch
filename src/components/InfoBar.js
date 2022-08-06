import rocket from "../assets/rocket.png";
import { useSelector, useDispatch } from "react-redux";

const InfoBar = () => {
  let dispatch = useDispatch();
  let store = useSelector((store) => store);

  return (
    <div className="App">
      <div>
        Forbidden Runes Gram Launch
      </div>
      <header className="App-header">
        <img src={rocket} className="App-logo" alt="logo" />
        <p className="subheader-blue">
          LAUNCHED 127
        </p>
        <p className="subheader-blue">
          RECORD 15,900 MILES
        </p>
        <p className="subheader-blue">
          AVERAGE 2,200 MILES
        </p>
        <a
          className="App-link subhead-blue"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Store
        </a>
      </header>
    </div>
  )
}

export default InfoBar