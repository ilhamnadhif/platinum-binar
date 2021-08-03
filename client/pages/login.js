import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GoogleButton from "react-google-button";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import Img from "../assets/icons/genshin_leaderboard.svg";
import Layout from "../components/Layout";
import axios from "axios";
import router, { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      router.push("/");
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.api}/auth/login`, { email, password })
      .then((result) => {
        localStorage.setItem("jwtToken", result.data.token);
        router.push("/");
      })
      .catch((err) => {
        setErrMsg(err.response.data.msg);
      });
  };
  const googleSignUp = () => {
    const googleLoginURL = "http://localhost:8000/v1/auth/google";
    window.open(googleLoginURL, "_self");
  };

  return (
    <Layout title="Login">
      <Container>
        <Row>
          <Col className="d-md-6">
            <Card className="p-5 mt-5">
              {errMsg && <h3 style={{ color: "red" }}>{errMsg}</h3>}
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> Email Address </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We 'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label> Password </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  onClick={handleLogin}
                  variant="success"
                  type="submit"
                  className="w-100 mt-3"
                >
                  Submit
                </Button>
                <Form.Group>
                  <Link href="/" passHref>
                    <Button
                      variant="outline-dark"
                      className="mt-3 float-left w-25"
                    >
                      Back
                    </Button>
                  </Link>
                  <Link href="/register" passHref>
                    <Button
                      variant="outline-success"
                      className="mt-3 float-right w-25"
                    >
                      Register
                    </Button>
                  </Link>
                  <GoogleButton
                    // type="light" //
                    onClick={googleSignUp}
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>
          <Col className="d-md-6">
            <Image src={Img} alt="logo" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
