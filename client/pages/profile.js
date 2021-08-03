import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import profileImage from "../assets/icons/man 1.svg";
import imageBackground from "../assets/icons/Polygon 1.svg";
import Link from "next/link";
import { useSelector } from "react-redux";

const Profile = () => {
  const router = useRouter();
  const { hasLogin, user } = useSelector((state) => state.globalReducer);
  console.log(user);
  useEffect(() => {
    if (!hasLogin) {
      router.push("/login");
    }
  });
  return (
    <Layout title="Profile">
      <div style={{ height: "100vh" }}>
        <Container className="div-center">
          <Row className="justify-content-center align-items-center">
            <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              className="d-flex justify-content-center"
            >
              <div className="d-flex flex-column align-items-center">
                {user.provider === "local" && (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                      }}
                    >
                      <Image src={imageBackground} alt="Polygon" />
                    </div>
                    <Image
                      src={profileImage}
                      alt="Profile"
                      className="absolute-center"
                    />
                  </div>
                )}
                {user.provider === "google" && (
                  <img src={user.picture} />
                )}
                <Link href="profile-edit">
                  <Button
                    variant="success"
                    className="btn-primary mt-3"
                    style={{
                      paddingRight: "5rem",
                      paddingLeft: "5rem",
                    }}
                  >
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </Col>
            <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              className="flex-breakpoint"
            >
              <div>
                <h1
                  style={{
                    fontWeight: "600",
                  }}
                  className="card-text-breakpoint"
                >
                  My Profile
                </h1>
                <Card className="card-breakpoint shadow-sm bg-white rounded">
                  <Card.Body>
                    <Card.Text>Username: {user.username}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text
                      className="mt-3"
                      style={{
                        fontWeight: "600",
                        fontSize: 20,
                      }}
                    >
                      Total Games Point:
                      <span
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {user.total_score}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Profile;
