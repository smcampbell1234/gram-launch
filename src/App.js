// libraries
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// store
import { getGrams, deleteGram, addGram, adjustGram } from "./actions";
// components
import InfoBar from './components/InfoBar'
import OuterSpace from "./components/OuterSpace";
import AdminForm from "./components/AdminForm";
import MissionControl from "./components/MissionControl";
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
      setError("Name/Date Required")
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("in HANDLE EDIT")
    // call Put API
    dispatch(adjustGram(mission))
    handleReset()
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

  const missionControlProps = {
    isEditMode, mission, handleEdit, handleDelete, handleAddGram, error, handleReset, setLogin, setIsAdmin, setMission
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
          <MissionControl props={missionControlProps}/>
        }
      </div>
      <AdminForm />
      <OuterSpace loadMissionForEdit={loadMissionForEdit}/>

    </main>
  );
}

export default App;
