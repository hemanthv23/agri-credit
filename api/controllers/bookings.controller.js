import mongoose from "mongoose";
import Booking from "../models/bookings.model.js";
import Manure from "../models/organicManure.model.js";

import { io } from "../index.js";

import { updateManure } from "./organicManure.controller.js";

export const newBooking = async (req, res) => {
  const { itemId, itemType, requesterId, providerId, quantity } = req.body;
  if (!itemId || !itemType || !requesterId || !providerId || !quantity) {
    res.json("All fields are mandatory");
  }

  try {
    const booking = await Booking.create({
      itemId,
      itemType,
      requesterId,
      providerId,
      requested_quantity: +quantity,
    });
    res.json(booking);
  } catch (error) {
    console.log(error);
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const response = await Booking.find({
      $or: [
        { providerId: req.params.userId },
        { requesterId: req.params.userId },
      ],
    })
      .populate("itemId") // Populates itemId based on itemType
      .populate("providerId") // Populates provider details
      .populate("requesterId"); // Populates requester details

    res.json(response);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: req.params.bookingId },
      { $set: { status: "accepted" } },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    updateManureByBooking(
      updatedBooking.itemId,
      updatedBooking.requested_quantity
    );

    // Notify clients about the updated booking
    // io.emit("bookingUpdated", updatedBooking);

    res.status(200).json({
      message: "Booking status updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ error: "Error accepting booking.", details: error });
  }
};

const updateManureByBooking = async (manureId, new_quantity) => {
  try {
    // Find the manure by its ID
    const manure = await Manure.findById(manureId);

    if (!manure) {
      console.log("Manure not found");
      return { error: "Manure not found" };
    }

    // Ensure new quantity does not exceed available quantity
    if (new_quantity > manure.quantity) {
      console.log("Insufficient quantity available");
      return { error: "Insufficient quantity available" };
    }

    // Update the quantity
    const updatedManure = await Manure.findByIdAndUpdate(
      manureId,
      { $set: { quantity: manure.quantity - new_quantity } },
      { new: true }
    );

    return updatedManure; // Return the updated manure object
  } catch (error) {
    console.log(error);
    return { error: "Failed to update manure quantity" };
  }
};

export const rejectRequest = async (req, res) => {
  try {
    // Validate the request ID
    if (!mongoose.Types.ObjectId.isValid(req.params.bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    // Find and update the booking status to 'accepted'
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: req.params.bookingId },
      { $set: { status: "rejected" } },
      { new: true } // Return the updated document
    );

    // Handle case where the booking does not exist
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Send success response
    res.status(200).json({
      message: "Booking status updated to rejected successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      error: "An error occurred while rejecting the booking.",
      details: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const response = await Booking.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const tractorBooking = async (req, res) => {
  const {
    itemId,
    itemType,
    requesterId,
    providerId,
    date,
    purpose,
    attachment,
    acres,
    cost,
  } = req.body;
  if (
    !itemId ||
    !itemType ||
    !requesterId ||
    !providerId ||
    !date ||
    !purpose ||
    !attachment ||
    !acres ||
    !cost
  ) {
    res.json("All fields are mandatory");
  }

  try {
    const booking = await Booking.create({
      itemId,
      itemType,
      requesterId,
      providerId,
      date,
      purpose,
      attachment,
      acres,
      cost,
    });
    console.log(booking);

    res.json(booking);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const response = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!response) {
      res.status(400);
      res.json("Booking doesn.t exist");
    }
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
