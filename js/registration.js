"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const eventSelect = document.getElementById("eventSelect");

  // Populate dropdown with events
  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = `${event.name} (Seats Left: ${event.availableSeats})`;
    eventSelect.appendChild(option);
  });

  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const eventId = parseInt(document.getElementById("eventSelect").value);

    if (!fullName || !email || !eventId) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Get registrations and filter by selected event
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];
    const selectedEvent = events.find((e) => e.id === eventId);
    const registeredCount = registrations.filter(
      (reg) => reg.eventId === eventId
    ).length;

    if (registeredCount >= selectedEvent.availableSeats) {
      alert("Sorry, this event is fully booked!");
      return;
    }

    // Save registration
    registrations.push({ fullName, email, eventId });
    localStorage.setItem("registrations", JSON.stringify(registrations));

    alert("Registration successful!");
    this.reset();
    location.reload();
  });

  // updateEventDropdown();
});

const updateEventDropdown = function () {
  const eventSelect = document.getElementById("eventSelect");
  eventSelect.innerHTML = '<option value="">Choose an event...</option>';

  events.forEach((event) => {
    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    let registeredCount = registrations.filter(
      (reg) => reg.eventId === event.id
    ).length;
    let availableSeats = event.availableSeats - registeredCount;

    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = `${event.name} (Seats Left: ${availableSeats})`;

    if (availableSeats === 0) {
      option.disabled = true;
    }

    eventSelect.appendChild(option);
  });
};
