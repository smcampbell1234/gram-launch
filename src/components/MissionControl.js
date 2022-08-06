import React from "react";

const MissionControl = ({props}) => {
  const {isEditMode, mission, handleEdit, handleDelete, handleAddGram, error, handleReset, setLogin, setIsAdmin, setMission} = props;
  return(
    <div>
      {!!isEditMode ?
        <h2>Edit Mission</h2>
        :
        <h2>Mission</h2>
      }
      <form id="launch-form" className="launch-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Mission Name</label><br/>
        <input type="text" value={mission.name}
               onChange={(e) => setMission({...mission, name: e.target.value})}/><br/>
        <label htmlFor="views">Views</label><br/>
        <input type="text" value={mission.views}
               onChange={(e) => setMission({...mission, views: e.target.value})}/><br/>
        <label htmlFor="likes">Likes</label><br/>
        <input type="text" value={mission.likes}
               onChange={(e) => setMission({...mission, likes: e.target.value})}/><br/>
        <label htmlFor="date">Launch Date</label><br/>
        <input type="text" value={mission.date}
               onChange={(e) => setMission({...mission, date: e.target.value})}/><br/>
        <label htmlFor="url">URL</label><br/>
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
  )
}

export default MissionControl;