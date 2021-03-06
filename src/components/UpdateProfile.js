import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const UpdateProfile = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();
    const { updateEmail, updatePassword, currentUser } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPassRef.current.value) {
            return setError("Passwords do not match!");
        }

            setLoading(true);
            setError("");
            const promises = [];
            if (emailRef.current.value !== currentUser.email) {
                promises.push(updateEmail(emailRef.current.value));
            }
            if (passwordRef.current.value) {
                promises.push(updatePassword(passwordRef.current.value));
            }
            Promise.all(promises).then(() => {
                history.push("/");
            }).catch(
                (error) => {
                    setError(error)
                }
            ).finally(
                () => {
                    setLoading(false);
                }
            );
    }
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error ? <Alert variant="danger">{JSON.stringify(error)}</Alert>: ""}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={nameRef} type="text"/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control ref={confirmPassRef} type="password" placeholder="Leave blank to keep the same"  className="mb-4"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Cencle</Link>
            </div>
        </div>
        </Container>
    )
}