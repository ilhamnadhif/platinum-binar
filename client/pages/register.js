import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import Img from "../assets/icons/genshin_leaderboard.svg";
import Layout from "../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.api}/auth/register`, {
        username,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        router.push("/login");
      })
      .catch((error) => {
        setErrMsg(error.response.data.msg);
      });
  };
  return (
    <Layout title="Register">
      <Container>
        <Row>
          <Col className="d-md-6">
            <Card className="p-5 mt-5">
              {errMsg && <h3 style={{ color: "red" }}>{errMsg}</h3>}
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  onClick={handleRegister}
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
                  <Link href="/login" passHref>
                    <Button
                      variant="outline-success"
                      className="mt-3 float-right w-25"
                    >
                      Login
                    </Button>
                  </Link>
                </Form.Group>
              </Form>
            </Card>
          </Col>
          <Col className="d-md-6">
            <Image src={Img} className="App-logo" alt="logo" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
