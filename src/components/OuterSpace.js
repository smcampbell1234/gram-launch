import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import moon from "../assets/moon.png";
import mars from "../assets/mars.png";
import astroid from "../assets/astroid.png";
import spacestation from "../assets/spacestation.png";
import restaurant from "../assets/restaurant.png";
import rocket from "../assets/rocket.png";
import satellite from "../assets/satellite.png";
import explode from "../assets/explode.png";



const colors = [
  "#F0F8FF", "#FAEBD7", "#F0FFFF", "#F5F5DC",
  "#6495ED", "#00FFFF", "#FFF8DC", "#FF8C00",
  "#E9967A", "#8FBC8F", "#00BFFF", "#FFFAF0",
  "#FFD700", "#F0FFF0", "#F0E68C", "#E6E6FA",
  "#FFF0F5", "#FFFACD", "#ADD8E6", "#F08080",
  "#E0FFFF", "#FAFAD2", "#D3D3D3", "#D3D3D3",
  "#90EE90", "#FFB6C1", "#FFA07A", "#20B2AA",
  "#87CEFA",
]

function getRandNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

const OuterSpace = ({loadMissionForEdit}) => {
  let dispatch = useDispatch();
  let { grams } = useSelector((store) => store);
  console.log("... grams : ",grams)
  return (
    <main className="outerspace-container">
      {
        !!grams.length && grams.map((gram,idx) => {
          let milesTraveled = parseInt(gram.views) + (parseInt(gram.likes) * 10)
          let max = window.innerWidth - 250;
          let min = 50;
          let randHorz = getRandNumber(min, max)
          let rCol = getRandNumber(0,colors.length - 1)

          // get proper image for rocket
          let properImg = rocket // greater than 2500
          if (milesTraveled < 600)
            properImg = explode
          else if (milesTraveled < 2500)
            properImg = satellite

          const shipLocation = {
            // color: "black",
            // color: `${colors[rCol]}`,
            color: "white",
            textAlign: "center",
            backgroundColor: "transparent",
            position: "relative",
            left: randHorz,
            top: `${milesTraveled}px`,
            padding: "5px",
            zIndex: idx,
            fontSize: "1.1rem",
            borderRadious: "25px",
            // background: `${colors[rCol]}`,
            maxWidth: "150px"
          }

          const imgStyle = {
            width: "100px",
            height: "100px"
          }

          return (
              <div style={shipLocation} key={gram.gramId}>
                <img src={properImg} style={imgStyle}/>
                <h2 className="outerspace-ship-text">{gram.name}</h2>
                <p className="outerspace-ship-text">views: {gram.views}</p>
                <p className="outerspace-ship-text">likes: {gram.likes}</p>
                <p className="outerspace-ship-text">miles: {milesTraveled}</p>
                {
                  !!gram.url ?
                    <a className="outerspace-href" href={gram.url}>View on Gram</a>
                    :
                    <p className="outerspace-href">No URL</p>
                }
                <p className="outerspae-edit-mission" onClick={() => loadMissionForEdit(gram)}>Edit Mission</p>
              </div>
            )
        })
      }
      <div id="stratosphere" className="space-assets">
        Stratosphere 600  miles


      </div>
      <div id="moon" className="space-assets">
        <h2>MOON - 3,400 miles</h2>
        <img src={moon} />
      </div>
      <div id="astroid" className="space-assets">
        <h2>Armegedon Astroid 1,200 miles</h2>
        <img src={astroid} width="200px"/>
      </div>
      <div id="space-station" className="space-assets">
        <h2>Space Station 1,600 miles</h2>
        <img src={spacestation} />
      </div>
      <div id="void" className="space-assets">
        <h2>Space Void 10,000</h2>
      </div>
      <div id="restaurant" className="space-assets">
        <h2>Alien Restaurant 15,000</h2>
        <img src={restaurant}   width="150px" height="150px"/>
      </div>
      <div id="mars" className="space-assets">
        <h2>Mars 20,000 miles</h2>
        <img src={mars} />
      </div>
    </main>
  )
}

export default OuterSpace;