import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Carousel, Container, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import { getGameDetailFromAPI } from "../../../redux/action/gameAction";

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { name } = router.query;
  const { hasLogin } = useSelector((state) => state.globalReducer);
  const { gameDetail } = useSelector((state) => state.gameReducer);
  useEffect(() => {
    if (!hasLogin) {
      router.push("/login");
    }
  });
  useEffect(() => {
    dispatch(getGameDetailFromAPI(name));
  }, [name]);
  const handlePlayGame = () => {
    axios
      .patch(`${process.env.api}/game${gameDetail.game_url}`, {
        play_count: gameDetail.play_count + 1,
      })
      .then((res) => console.log(res));
    router.push(`/games${gameDetail.game_url}/play`);
  };
  return (
    <Layout title="Detail Game">
      <Container>
        <Row className="mt-5 py-5">
          <Col md={6}>
            <img
              src={`${process.env.api}/images/${gameDetail.image}`}
              className="w-100 "
              alt="Thumbnail"
            />
          </Col>
          <Col md={6}>
            <div className="mt-3">
              <h3 className="font-weight-bold">{gameDetail.name}</h3>
              <p>{gameDetail.description}</p>
              <Button onClick={handlePlayGame} variant="success">
                Play Game
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="my-5 p-5">
          <Col>
            <h3 className="font-weight-bold mb-4">Preview Game</h3>
            <div>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`${process.env.api}/images/${gameDetail.image}`}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>Suit Game</h3>
                    <p>Andalkan keberuntunganmu untuk kalahkan musuhmu!</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Game;
