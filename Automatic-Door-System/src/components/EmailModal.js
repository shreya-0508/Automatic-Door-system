import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
export default function EmailModal(props) {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [Error, setErrors] = useState({ Message: "", Subject: "" });
  const handleValidation = () => {
    let Errors = { Message: "", Subject: "" };
    let formIsValid = true;
    //Subject
    if (subject.trim().length === 0) {
      formIsValid = false;
      Errors.Subject = "Cannot Be Empty!!";
    }

    //Message
    if (text.trim().length === 0) {
      formIsValid = false;
      Errors.Message = "Cannot Be Empty!!";
    }
    Error.Message = Errors.Message;
    Error.Subject = Errors.Subject;
    return formIsValid;
  };
  const handleClose = () => {
    setText("");
    setSubject("");
    props.onHide();
  };
  const handleSend = async (e) => {
    e.preventDefault();
    console.log("ashutosh");
    if (handleValidation()) {
      try {
        const id = toast.loading("Sending....");
        await axios
          .post("http://localhost:4000/send_mail", {
            text,
            subject,
          })
          .then(() => {
            toast.update(id, {
              render: "Email Sent",
              autoClose: 3000,
              hideProgressBar: true,
              type: "success",
              isLoading: false,
            });
            props.onHide();
            setText("");
            setSubject("");
            // toast.success("Email Sent", {
            //   hideProgressBar: true,
            //   autoClose: 2000,
            // });
          })
          .catch((err) => {
            setText("");
            setSubject("");
            toast.update(id, {
              render: "Something Went Wrong",
              autoClose: 2000,
              hideProgressBar: true,
              type: "error",
              isLoading: false,
            });
          });
      } catch (err) {
        setText("");
        setSubject("");
        toast.error("Something Went Wrong", {
          hideProgressBar: true,
          autoClose: 2000,
        });
      }
    } else {
      for (const property in Error) {
        if (Error[property].trim().length > 0) {
          toast.error(`${property}:${Error[property]}`, {
            hideProgressBar: true,
            autoClose: 2000,
          });
        }
      }
    }
  };
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Message Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSend}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              value={text}
              placeholder="Message"
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Send Mail
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
