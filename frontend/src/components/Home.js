import React, { useState } from "react";
import Chat from "./Chat";
import TinderCard from "react-tinder-card";
import "../extras/style.css";

const customStyle = {
  height: 550,
  width: 400,
};

const customStyle2 = {
  height: 300,
  width: 400,
};

const Home = () => {
  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://i.imgur.com/oPj4A8u.jpg",
      sport: "Gym",
      bio: "Hey, we can hit our target!",
    },
    {
      name: "Erlich Bachman",
      url: "https://i.imgur.com/oPj4A8u.jpg",
      sport: "Cycling",
      bio: "Hey, we can hit our target!",
    },
    {
      name: "Monica Hall",
      url: "https://i.imgur.com/oPj4A8u.jpg",
      sport: "Running",
      bio: "Hey, we can hit our target!",
    },
    {
      name: "Jared Dunn",
      url: "https://i.imgur.com/oPj4A8u.jpg",
      sport: "Cycling",
      bio: "Hey, we can hit our target!",
    },
  ];

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <div className="flex justify-between ">
      <Chat />
      <div className="sm:w-4/6 flex flex-col justify-center pl-64 h-screen">
        <div style={customStyle}>
          <div className="relative w-full flex justify-center mb-8">
            {lastDirection ? (
              <p className="font-bold text-black absolute top-0 left-0 right-0 text-center text-xl">
                You swiped {lastDirection}{" "}
              </p>
            ) : (
              <p />
            )}
          </div>
          <div className="relative">
            {characters.map((character) => (
              <TinderCard
                className="absolute shadow-md shadow-sky-600 rounded-3xl"
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name)}
                onCardLeftScreen={() => outOfFrame(character.name)}
              >
                <div className="relative" style={customStyle}>
                  <div
                    style={{
                      backgroundImage: "url(" + character.url + ")",
                      ...customStyle2,
                    }}
                    className="rounded-t-3xl bg-cover bg-center"
                  >
                    <div className="absolute bottom-0 left-0 h-64 w-full bg-slate-100 p-3 rounded-b-3xl">
                      <h3 className="font-bold text-black text-center m-0">
                        {character.name}
                      </h3>
                      <p className="font-bold text-black text-center m-0 pt-5">
                        {character.sport}
                      </p>
                      <p className="font-bold text-black text-center m-0 pt-5">
                        {character.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
