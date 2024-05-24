import React from "react";
import { useState } from "react";
import "./NewForm.css";

function NewForm() {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    contact: "",
    emailid: "",
    desc: "",
  });

  //As the data is entered in the form, the data is saved in formData
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        dob: formData.dob,
        contact: formData.contact,
        email: formData.emailid,
        desc: formData.desc,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data inserted successfully:", data);
      })
      .catch((error) => {
        console.error("Error inserting data into the database:", error);
      });
  
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>New User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              className="form-control"
              id="contact"
              placeholder="Contact no"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailid">Email ID</label>
            <input
              type="email"
              className="form-control"
              id="emailid"
              placeholder="Enter email ID"
              value={formData.emailid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Enter description"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewForm;
