// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// import {  } from "../utils/queries";
import { MAKE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [carType, setCarType] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [transmission, setTransmission] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [post, { error }] = useMutation(MAKE_POST);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "davswvpty",
        uploadPreset: "hwu5iwft",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setImage(result.info.secure_url);
          console.log(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(
      make,
      model,
      year,
      carType,
      location,
      mileage,
      price,
      transmission,
      image,
      description
    );
    try {
      const { data } = await post({
        variables: {
          make: make,
          model: model,
          year: year,
          carType: carType,
          price: price,
          mileage: mileage,
          transmission: transmission,
          location: location,
          description: description,
          image: image,
          createdAt: "Default",
        },
      });

      // navigate(`/mylistings`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h4> Create a post! </h4>
      {Auth.loggedIn() ? (
        <div>
          <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
            <label>Add make</label>
            <input
              required
              className=""
              name="make"
              onChange={(e) => setMake(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add model</label>
            <input
              required
              className=""
              name="model"
              onChange={(e) => setModel(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>year</label>
            <input
              required
              className=""
              name="year"
              onChange={(e) => setYear(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add carType</label>
            <input
              required
              className=""
              name="carType"
              onChange={(e) => setCarType(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add location</label>
            <input
              required
              className=""
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add price</label>
            <input
              required
              className=""
              name="price"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="text"
              placeholder="Name"
            />
            <label>Add mileage</label>
            <input
              required
              className=""
              name="mileage"
              onChange={(e) => setMileage(parseInt(e.target.value))}
              type="text"
              placeholder="Name"
            />
            <label>Add transmission</label>
            <input
              required
              className=""
              name="transmission"
              onChange={(e) => setTransmission(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add image</label>
            <div>
              <button onClick={() => widgetRef.current.open()}>Upload</button>
            </div>
            <label>Add description</label>
            <input
              required
              className=""
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <button type="submit"> Submit </button>
          </form>
        </div>
      ) : (
        <div>yolo</div>
      )}
    </>
  );
};

export default CreatePost;
