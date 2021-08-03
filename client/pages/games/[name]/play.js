import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import SuitGame from "../../../components/SuitGame";
import CounterGame from "../../../components/CounterGame";

const Play = () => {
  const router = useRouter();
  const { name } = router.query;
  const { hasLogin } = useSelector((state) => state.globalReducer);
  useEffect(() => {
    if (!hasLogin) {
      router.push("/login");
    }
  });
  switch (name) {
    case "suitgame":
      return (
        <Layout title="Play">
          <SuitGame />
        </Layout>
      );
      break;
    case "countergame":
      return (
        <Layout title="Play">
          <CounterGame />
        </Layout>
      );
      break;
    default:
      return <h1>Tidak ada Game</h1>;
      break;
  }
};

export default Play;
