import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import { Container, Button, Row, Col, Table } from "react-bootstrap";
import leaderboardImage from "../assets/icons/genshin_leaderboard.svg";
import landingImage from "../assets/icons/genshin_landing.svg";
import listImage from "../assets/icons/genshin_list.svg";
import { getUserFromAPI } from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { getGameFromAPI } from "../redux/action/gameAction";

const Home = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);
  const { games } = useSelector((state) => state.gameReducer);
  const { user } = useSelector((state) => state.globalReducer);
  // console.log("google", user);
  useEffect(() => {
    dispatch(getUserFromAPI());
    dispatch(getGameFromAPI());
  }, []);
  return (
    <Layout title={process.env.appName}>
      <div>
        <Container>
          <div className="d-flex align-items-center my-5">
            <div>
              <h1> Traditional Games</h1>
              <div className="mt-3">
                Rewind the old times by playing traditional games!
              </div>
              <Link href="/games">
                <Button className="btn-primary mt-4 px-5" variant="success">
                  Get Started
                </Button>
              </Link>
            </div>
            <div>
              <Image src={landingImage} alt="Landing" />
            </div>
          </div>
        </Container>
        <div className="d-flex align-items-center my-5">
          <Image src={listImage} alt="List" />
          <Container>
            <h1 style={{ fontWeight: "600" }} className="mb-4">
              Play to Win
            </h1>
            <div>
              <Row className="justify-content-center">
                {games.map((game) => {
                  return (
                    <Col
                      key={game.id}
                      lg="4"
                      md="12"
                      sm="12"
                      xs="12"
                      className="mb-4"
                    >
                      <div>
                        <img
                          src={`${process.env.api}/images/${game.image}`}
                          alt="Background"
                          height="180"
                          width="100%"
                          style={{
                            borderRadius: "5px",
                          }}
                        />
                        <center>
                          <div className="mt-3">{game.name}</div>
                        </center>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <center>
              <Link href="/games">
                <Button
                  className="btn-primary py-2 px-4 mt-5"
                  variant="success"
                >
                  See More
                </Button>
              </Link>
            </center>
          </Container>
        </div>
        <div>
          <Row className="justify-content-center align-items-center m-0">
            <Col xl="8" md="8" lg="8" sm="8" xs="8">
              <Container className="ml-5">
                <h1 style={{ fontWeight: "600" }}>Leaderboard</h1>
                <h2 style={{ fontWeight: "400" }}>Top Scores</h2>
                <Table
                  bordered
                  hover
                  className="bg-white mt-4"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => {
                      return (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.total_score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Col>
            <Col
              xl="4"
              md="4"
              lg="4"
              sm="4"
              xs="4"
              className="d-flex justify-content-end align-items-end p-0"
            >
              <Image src={leaderboardImage} alt="Leaderboard" />
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
