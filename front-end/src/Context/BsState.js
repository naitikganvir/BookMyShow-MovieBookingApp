import React, { useState, useEffect } from "react";
import BsContext from "./BsContext";

// 🔥 IMPORTANT: Change this if needed
const BASE_URL = "https://bookmyshow-moviebookingapp.onrender.com/api";

const BsState = (props) => {

  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [time, changeTime] = useState("");
  const [movie, changeMovie] = useState("");

  const [noOfSeat, changeNoOfSeats] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });

  const [lastBookingDetails, setLastBookingDetails] = useState(null);

  // ============================
  // POST BOOKING
  // ============================
  const handlePostBooking = async () => {
    console.log("BOOK BUTTON CLICKED 🔥");

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: movie,
          slot: time,
          seats: noOfSeat,
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      setErrorPopup(true);
      setErrorMessage(data.message);

      if (response.status === 200 || response.status === 201) {
        changeTime("");
        changeMovie("");
        changeNoOfSeats({
          A1: "",
          A2: "",
          A3: "",
          A4: "",
          D1: "",
          D2: "",
        });

        setLastBookingDetails(data.data);
        window.localStorage.clear();
      }

    } catch (error) {
      console.error("FETCH ERROR:", error);
      setErrorPopup(true);
      setErrorMessage("Server is not responding. Please try again.");
    }
  };

  // ============================
  // GET LAST BOOKING
  // ============================
  const handleGetLastBooking = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
      });

      const data = await response.json();
      console.log("Last Booking:", data);

      setLastBookingDetails(data.data);

    } catch (error) {
      console.error("GET ERROR:", error);
    }
  };

  // ============================
  // LOCAL STORAGE LOAD
  // ============================
  useEffect(() => {
    const movie = window.localStorage.getItem("movie");
    const slot = window.localStorage.getItem("slot");
    const seats = JSON.parse(window.localStorage.getItem("seats"));

    if (movie) changeMovie(movie);
    if (slot) changeTime(slot);
    if (seats) changeNoOfSeats(seats);
  }, []);

  return (
    <BsContext.Provider
      value={{
        handlePostBooking,
        handleGetLastBooking,
        movie,
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        changeNoOfSeats,
        lastBookingDetails,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </BsContext.Provider>
  );
};

export default BsState;