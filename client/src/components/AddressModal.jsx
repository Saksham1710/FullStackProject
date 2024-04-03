import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddressModal({ show, handleClose }) {
  const [userId, setUserId] = useState(''); // State to store the user's ID
    //fetch the current user
    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/current-user', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                const parseData= JSON.parse(responseData.data);
                setUserId(parseData._id);
                console.log('User ID:', userId);
                
            }
        } catch (error) {
            console.error('Error fetching user login status:', error);
        }
    }
    fetchUser();

  const [formData, setFormData] = useState({
    userId:"",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update state with the selected value
  };

  const handleSubmitAddress = async () => {
    try {
      const { userId,houseNumber, street, city, state, zip, country } = formData;
      const data = {
        userId,
        houseNumber,
        street,
        city,
        state,
        zip,
        country,
      };

      console.log("formData:", data);

        const response = await fetch("http://localhost:4000/api/v1/users/add-address", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const info = await response.json();
        console.log("Response: ", info);
        if (info.success) {
          console.log("Address added successfully");
          handleClose();
        } else {
          console.error("Error adding address: ", info.message);
        }
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
                name="houseNumber"
                value={formData.houseNumber} // Set value from formData
                onChange={handleChange} // Set onChange to handleChange
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address Line 2#: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Street"
                name="street"
                value={formData.street} // Set value from formData
                onChange={handleChange} // Set onChange to handleChange
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City: </Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={formData.city} // Set value from formData
                onChange={handleChange} // Set onChange to handleChange
              />
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
              <Form.Control
                type="text"
                placeholder="Zip Code"
                name="zip" // Ensure this matches your formData property
                value={formData.zip} // Set value from formData
                onChange={handleChange} // Set onChange to handleChange
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country} // Set value from formData
                onChange={handleChange} // Set onChange to handleChange
              />
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
