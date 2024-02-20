import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { saveDonation } from "../../services/DonationApiService";

//dependent on DonationLandingPage

const DonationForm = () => {
  const [donationDetails, setDonationDetails] = useState({
    rawFoodQuantity: "0",
    clothesQuantity: "0",
    stationaryQuantity: "0",
    donationStatus: "toBeCollected",
  });
  const donorObj = JSON.parse(localStorage.getItem("donor"));

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleConfirmationSubmit = async () => {
    const formData = {
      rawFoodQuantity: donationDetails.rawFoodQuantity,
      clothesQuantity: donationDetails.clothesQuantity,
      stationaryQuantity: donationDetails.stationaryQuantity,
      donationStatus: donationDetails.donationStatus,
      donor: { donorId: donorObj.donorId },
    };

    const response = await saveDonation(formData);
    console.log(response.data);

    if (response.status === 200) {
      setShowConfirmation(true);
      setDonationDetails({
        rawFoodQuantity: "0",
        clothesQuantity: "0",
        stationaryQuantity: "0",
      });
    }

    setShowConfirmationModal(false);
  };

  const handleChange = (e) => {
    setDonationDetails({ ...donationDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data

    if (
      donationDetails.rawFoodQuantity.trim() === "" ||
      donationDetails.clothesQuantity.trim() === "" ||
      donationDetails.stationaryQuantity.trim() === ""
    ) {
      alert("Please enter 0 for empty fields.");
      return;
    }
    if (
      parseInt(donationDetails.rawFoodQuantity) === 0 &&
      parseInt(donationDetails.clothesQuantity) === 0 &&
      parseInt(donationDetails.stationaryQuantity) === 0
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
        maxWidth: "850px",
        
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="foodQty" className="mb-5">
          <Form.Label>Enter raw food quantity (in kg.)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="rawFoodQuantity"
            value={donationDetails.rawFoodQuantity}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="stationeryQty" className="mb-5">
          <Form.Label>Enter stationary quantity (in nos.)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="stationaryQuantity"
            value={donationDetails.stationaryQuantity}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="clothingQty" className="mb-5">
          <Form.Label>Enter clothing quantity (in nos.)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            name="clothesQuantity"
            value={donationDetails.clothesQuantity}
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
            <Modal.Title>Confirm Donation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please confirm that you want to donate following items:</p>
            <ul>
              <li>Raw food: {donationDetails.rawFoodQuantity}</li>
              <li>Stationery: {donationDetails.stationaryQuantity}</li>
              <li>Clothing: {donationDetails.clothesQuantity}</li>
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
            <Modal.Title>Donation Confirmed</Modal.Title>
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
