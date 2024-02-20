import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { saveRecipientRequest } from "../../services/RecipientApiService";

//dependent on RecipientLandingPage
const DonationForm = () => {
  const [recipientRequestDetails, setRecipientRequestDetails] = useState({
    rawFoodQuantityRequired: "0",
    clothesQuantityRequired: "0",
    stationaryQuantityRequired: "0",
  });
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleConfirmationSubmit = async () => {
    const formData = {
      recipientId: recipientObj.recipientId,
      rawFoodQuantityRequired: recipientRequestDetails.rawFoodQuantityRequired,
      clothesQuantityRequired: recipientRequestDetails.clothesQuantityRequired,
      stationaryQuantityRequired:
        recipientRequestDetails.stationaryQuantityRequired,
    };

    const response = await saveRecipientRequest(formData);
    //console.log(response.data);

    if (response.status === 200) {
      setShowConfirmation(true);
      setRecipientRequestDetails({
        rawFoodQuantityRequired: "0",
        clothesQuantityRequired: "0",
        stationaryQuantityRequired: "0",
      });
    }

    setShowConfirmationModal(false);
  };

  const handleChange = (e) => {
    setRecipientRequestDetails({
      ...recipientRequestDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data

    if (
      recipientRequestDetails.rawFoodQuantityRequired.trim() === "" ||
      recipientRequestDetails.clothesQuantityRequired.trim() === "" ||
      recipientRequestDetails.stationaryQuantityRequired.trim() === ""
    ) {
      alert("Please enter 0 for empty fields.");
      return;
    }
    if (
      parseInt(recipientRequestDetails.rawFoodQuantityRequired) === 0 &&
      parseInt(recipientRequestDetails.clothesQuantityRequired) === 0 &&
      parseInt(recipientRequestDetails.stationaryQuantityRequired) === 0
    ) {
      alert("Please enter quantity for at least one item.");
      return;
    }
    setShowConfirmationModal(true);
  };

  return (
    <div
      className="d-flex justify-content-center p-5 mx-auto"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #ced4da",
        borderRadius: "10px",
        maxWidth: "855px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="foodQty" className="mb-5">
          <Form.Label>Enter raw food quantity (in kg.)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="rawFoodQuantityRequired"
            value={recipientRequestDetails.rawFoodQuantityRequired}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="stationeryQty" className="mb-5">
          <Form.Label>Enter Stationary quantity (in nos.)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="stationaryQuantityRequired"
            value={recipientRequestDetails.stationaryQuantityRequired}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="clothingQty" className="mb-5">
          <Form.Label>Enter Clothing quantity (in nos.)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="clothesQuantityRequired"
            value={recipientRequestDetails.clothesQuantityRequired}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Modal
          show={showConfirmationModal}
          onHide={() => setShowConfirmationModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Request Amount</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please confirm that you want to generate request for following
              items:
            </p>
            <ul>
              <li>
                Raw food: {recipientRequestDetails.rawFoodQuantityRequired}
              </li>
              <li>
                Stationery: {recipientRequestDetails.stationaryQuantityRequired}
              </li>
              <li>
                Clothing: {recipientRequestDetails.clothesQuantityRequired}
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmationModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmationSubmit}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Request Confirmed</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};

export default DonationForm;
