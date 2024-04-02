import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddressModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update state with the selected value
  };

  const handleSubmitAddress = async () => {
    try {
    //   const houseNumber = document.getElementById("houseNumber").value;
    //   console.log("houseNumber", houseNumber);
    //   const street = document.getElementById("street").value;
    //   console.log("street", street);
    //   const city = document.getElementById("city").value;
    //   console.log("city", city);
    //   const state = formData.state;
    //   console.log("state", state);
    //   const zip = document.getElementById("zip").value;
    //   console.log("zip:", zip);
    //   const country = document.getElementById("country").value;
    //   console.log("country: ", country);
    const { houseNumber, street, city, state, zip, country } = formData;
    console.log("houseNumber", houseNumber);
      console.log("street", street);
      console.log("city", city);
      console.log("state", state);
      console.log("zip:", zip);
      console.log("country: ", country);

      const data = {
        houseNumber,
        street,
        city,
        state,
        zip,
        country,
      };

      console.log("formData:", data);

      //   const response = await fetch("http://localhost:4000/api/v1/users/add-address", {
      //     method: "POST",
      //     credentials: 'include',
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData)
      //   });
      //   const data = await response.json();
      //   if (data.success) {
      //     console.log("Address added successfully");
      //   } else {
      //     console.error("Error adding address: ", data.message);
      //   }
    } catch (error) {
      console.error("Error adding address: ", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address Line 1#: </Form.Label>
              <Form.Control
                type="text"
                placeholder="apt/ suite/ house number"
                autoFocus
                id="houseNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address Line 2#: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Street"
                autoFocus
                id="street"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City: </Form.Label>
              <Form.Control type="text" placeholder="City" id="city" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label column sm={2}>
                State:
              </Form.Label>
              <Form.Control
                as="select"
                name="state"
                value={formData.state} // Set value to formData.state
                onChange={handleChange} // Call handleChange on change
              >
                <option value="">Choose...</option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Northwest Territories">
                  Northwest Territories
                </option>
                <option value="Nunavut">Nunavut</option>
                <option value="Yukon">Yukon</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code: </Form.Label>
              <Form.Control type="text" placeholder="Zip Code" id="zipCode" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country: </Form.Label>
              <Form.Control type="text" placeholder="Country" id="country" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAddress}>
            Add Address
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddressModal;
