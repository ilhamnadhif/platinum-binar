import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/icons/games/logo.svg";
import paper from "../assets/icons/games/icon-paper.svg";
import rock from "../assets/icons/games/icon-rock.svg";
import scissors from "../assets/icons/games/icon-scissors.svg";
import { useSelector } from "react-redux";
import axios from "axios";

const SuitGame = () => {
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState("");
  const { user } = useSelector((state) => state.globalReducer);
  useEffect(() => {
    axios
      .get(`${process.env.api}/user/${user.id}`)
      .then((res) => {
        setScore(res.data.total_score);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .patch(`${process.env.api}/user/${user.id}`, { total_score: score })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }, [score]);
  const getPilihanCompoter = () => {
    const comp = Math.floor(Math.random() * 3);

    if (comp == 0) {
      console.log("comp", "batu");
      return "batu";
    } else if (comp == 1) {
      console.log("comp", "gunitng");
      return "gunting";
    } else {
      console.log("comp", "kertas");
      return "kertas";
    }
  };
  const getHasil = (comp, player) => {
    if (player == comp) {
      setPlayer("Draw");
    } else if (player == "batu") {
      if (comp == "gunting") {
        setPlayer("You Won");
        setScore(score + 10);
      } else {
        setPlayer("You Lose");
        setScore(score - 5);
      }
    } else if (player == "gunting") {
      if (comp == "kertas") {
        setPlayer("You Won");
        setScore(score + 10);
      } else {
        setPlayer("You Lose");
        setScore(score - 5);
      }
    } else if (player == "kertas") {
      if (comp == "batu") {
        setPlayer("You Won");
        setScore(score + 10);
      } else {
        setPlayer("You Lose");
        setScore(score - 5);
      }
    }
  };
  return (
    <div className="preload py-5 my-5">
      <div className="container">
        <header className="header d-flex justify-content-center">
          <Image src={logo} alt="logo" />
        </header>
        <h1>Score {score}</h1>
        <section className="game">
          <button
            className="choice-btn"
            data-choice="paper"
            onClick={() => {
              console.log("player", "kertas");
              getHasil(getPilihanCompoter(), "kertas");
            }}
          >
            <div className="choice paper">
              <Image src={paper} alt="Paper" />
            </div>
          </button>
          <button
            className="choice-btn"
            data-choice="scissors"
            onClick={() => {
              console.log("player", "gunting");
              getHasil(getPilihanCompoter(), "gunting");
            }}
          >
            <div className="choice scissors">
              <Image src={scissors} alt="Scissors" />
            </div>
          </button>
          <button
            className="choice-btn"
            data-choice="rock"
            onClick={() => {
              console.log("player", "batu");
              getHasil(getPilihanCompoter(), "batu");
            }}
          >
            <div className="choice rock">
              <Image src={rock} alt="rock" />
            </div>
          </button>
        </section>
        <section>
          <center>
            <div className="result-text">{player}</div>
          </center>
        </section>
      </div>
    </div>
  );
};

export default SuitGame;
