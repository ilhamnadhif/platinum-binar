import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CounterGame = () => {
  const [score, setScore] = useState(0);
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
  return (
    <GameWrapper>
      <h1>{score}</h1>
      <ButtonWrapper>
        <button onClick={() => setScore(score - 1)}>kurang</button>
        <button onClick={() => setScore(score + 1)}>tambah</button>
      </ButtonWrapper>
    </GameWrapper>
  );
};

export default CounterGame;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  h1 {
    font-size: 90px;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 40px;
  button {
    background-color: #f14e4e;
    padding: 0.3em 1.2em;
     margin: 0 0.1em 0.1em 0;
     border: 0.16em solid rgba(255, 255, 255, 0);
     border-radius: 2em;
     box-sizing: border-box;
     text-decoration: none;
     font-family: "Roboto", sans-serif;
     font-weight: 300;
     color: #ffffff;
     text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
     text-align: center;
     transition: all 0.2s;
    margin: 0 20px;
  }
`;
