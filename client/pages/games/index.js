import React, { useEffect } from "react";
import { Container, Col, Row, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getGameFromAPI } from "../../redux/action/gameAction";

const Games = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gameReducer);
  const router = useRouter();
  useEffect(() => {
    dispatch(getGameFromAPI());
  }, []);
  return (
    <Layout title="Games">
      <div className="mb-5 pb-5">
        <Container className="mb-5 pb-5">
          <Row className="my-5 py-5">
            <Col md={6}>
              <h3 className="float-left">All Games</h3>
            </Col>
            <Col md={6}>
              <Form inline className="float-right">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
              </Form>
            </Col>
          </Row>
          <Row>
            {games.map((game) => {
              return (
                <Col key={game.id} onClick={() => router.push(`games${game.game_url}`)}>
                  <center>
                    <div style={{ cursor: "pointer" }} className="wrapper">
                      <div className="img-thum">
                        <img
                          src={`${process.env.api}/images/${game.image}`}
                          alt=""
                          width="auto"
                          height="120"
                        />
                      </div>
                      <h4 className="title mt-2">{game.name}</h4>
                      <p className="desc">{game.play_count} dimainkan</p>
                    </div>
                  </center>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Games;
