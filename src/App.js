// libraries
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// store
import { getGrams, deleteGram, addGram } from "./actions";
// components
import InfoBar from './components/InfoBar'
import OuterSpace from "./components/OuterSpace";
import AdminForm from "./components/AdminForm";
// assets & misc
import './App.css';
import earth from "./assets/fullearth.png"

let key = "runes"

function App() {
  // redux store
  let dispatch = useDispatch();
  let store = useSelector((store) => store);
  // from context
  const [isEditMode,setIsEditMode] = useState(false)
  // state
  const initialMission = { gramId: "", name: "", views: "", likes: "", date: "", url: "" }
  const [mission,setMission] = useState(initialMission)
  const [error,setError] = useState("");


  let currLogin = localStorage.getItem("gramlaunchkey");
  let currAdmin = false;
  if(currLogin === key) {
    currAdmin = true;
  }
  const [isAdmin,setIsAdmin] = useState(currAdmin);
  const [login,setLogin] = useState('');

  // load data on initial render
  useEffect(() => {
    dispatch(getGrams())
  },[])

  const handleAddGram = (e) => {
    e.preventDefault();
    let rand = Math.floor(Math.random() * 1000)
    // check numbers
    let myViews = !mission.views ? 0 : parseInt(mission.views)
    let myLikes = !mission.likes ? 0 : parseInt(mission.likes)
    if (isNaN(myViews) || isNaN(myLikes)) {
      setError("Views/Likes must be number")
      return;
    }
    if (myViews > 50000 ||  myLikes > 10000) {
      setError("Your mission is lost in space! Somewhere past Mars. - max views: 50,000, max likes: 10,000")
      return;
    }
    // load ack in data once chckd
    mission.views = myViews;
    mission.likes = myLikes;

    if (!!mission.name && !!mission.date) {
      setError(null)
      // submit -- convert strings intonumbers
      mission["gramId"] = mission.name + rand
      dispatch(addGram(mission))
      handleReset()
    } else {
      alert("set error")
      setError("Name/Date Required")
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();
    alert("editing")
    // call Put API
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteGram(mission.gramId))
  }

  const loadMissionForEdit = (gramObj) => {
    setMission({
      gramId: gramObj.gramId,
      name: gramObj.name,
      views: gramObj.views,
      likes: gramObj.likes,
      date: gramObj.date,
      url: gramObj.url
    })
    setIsEditMode(true)
    setError("")
    window.scrollTo(0, 0)
  }

  const handleReset = () => {
    setMission(initialMission)
    setError("")
    setIsEditMode(false)
  }

  const handleLogin = (e) => {
    let newLogin = login + e.target.value;
    if (e.target.value === key) {
      localStorage.setItem("gramlaunchkey", key);
      setIsAdmin(true)
    } else {
      setLogin(e.target.value)
    }
  }


  return (
    <main>
      <InfoBar />
      {
        !isAdmin &&
        <div className="login-container">
          <label className="login-header">Launch Code</label>
          <input className="login-input" type="text" value={login} onChange={(e) => handleLogin(e)}/>
        </div>
      }
      <div className="earth-holder">
        <div className="earth">
          <img src={earth} width="230px" />
        </div>
        {isAdmin &&
            <div>
              {!!isEditMode ?
                <h2>Edit Mission</h2>
                :
                <h2>Mission</h2>
              }
              <form id="launch-form" className="launch-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlform="name">Mission Name</label><br/>
                <input type="text" value={mission.name}
                       onChange={(e) => setMission({...mission, name: e.target.value})}/><br/>
                <label htmlform="views">Views</label><br/>
                <input type="text" value={mission.views}
                       onChange={(e) => setMission({...mission, views: e.target.value})}/><br/>
                <label htmlform="likes">Likes</label><br/>
                <input type="text" value={mission.likes}
                       onChange={(e) => setMission({...mission, likes: e.target.value})}/><br/>
                <label htmlform="date">Launch Date</label><br/>
                <input type="text" value={mission.date}
                       onChange={(e) => setMission({...mission, date: e.target.value})}/><br/>
                <label htmlform="url">URL</label><br/>
                <input type="text" value={mission.url} onChange={(e) => setMission({...mission, url: e.target.value})}/><br/>
                {!!isEditMode ?
                  <div>
                    <button onClick={handleEdit}>Edit Mission</button>
                    <br/>
                    <button onClick={handleDelete}>Delete Mission</button>
                  </div>

                  :
                  <button onClick={handleAddGram}>Launch</button>
                }

                {!!error &&
                <p className="launch-error">{error}</p>
                }
                <p >
                  <span className="launch-reset" onClick={handleReset}>Reset</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span  className="launch-reset"onClick={() => {
                    handleReset();
                    setLogin("")
                    setIsAdmin(false);
                    localStorage.setItem("gramlaunchkey", "");
                  }}>Logout</span>
                </p>
              </form>
            </div>
        }

      </div>







      <AdminForm />
      <OuterSpace loadMissionForEdit={loadMissionForEdit}/>

    </main>
  );
}

export default App;
