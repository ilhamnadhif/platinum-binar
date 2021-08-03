import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
const ProfileEdit = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const { hasLogin, user } = useSelector((state) => state.globalReducer);
  useEffect(() => {
    if (!hasLogin) {
      router.push("/login");
    }
  });
  const handleSubmit = () => {
    axios
      .put(`${process.env.api}/user/${user.id}`, { username: username })
      .then(() => {
        router.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
    router.push("profile");
  };
  return (
    <Layout name="edit profile">
      <div className="py-5 my-5">
        <Container className="d-flex align-items-center flex-column py-5 my-5">
          <h1>Edit Profile</h1>
          <Card className="p-5 mt-2 edit-profile-card-container">
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="mr-3">Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              onClick={handleSubmit}
              variant="success"
              type="submit"
              className="w-100 mt-3"
            >
              Save
            </Button>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
