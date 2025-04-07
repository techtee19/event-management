"use strict";

let events = []; // Global variable to store events
let currentPage = 1; // Track the current page
const eventsPerPage = 6; // Number of events to display per page

const fetchEvents = async function () {
  try {
    const res = await fetch("data.json");
    if (!res.ok) {
      throw new Error(`Failed to fetch events. Status: ${res.status}`);
    }
    const data = await res.json();
    events = data.events; // Store events in the global variable
    renderEvents(events); // Render all events initially
  } catch (error) {
    console.error("Error fetching events:", error);
    alert("Something went wrong. Please try again later.");
  }
};

const renderEvents = function (eventsToRender) {
  const catalog = document.getElementById("eventCatalog");
  catalog.innerHTML = ""; // Clear the catalog before rendering

  // If no events match the filter, show a message
  if (eventsToRender.length === 0) {
    catalog.innerHTML = `<p>No events found.</p>`;
    return;
  }

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;

  // Get the events for the current page
  const paginatedEvents = eventsToRender.slice(startIndex, endIndex);

  // Render each event
  paginatedEvents.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "col-md-4 mb-4";
    eventCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${event.image}" class="card-img-top" alt="${event.title}" />
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text">
            <strong>Date:</strong> ${event.date}<br>
            <strong>Location:</strong> ${event.location}<br>
            ${event.description}
          </p>
          <a href="${event.link}" class="btn btn-primary">Register</a>
        </div>
      </div>`;
    catalog.appendChild(eventCard);
  });

  // Render pagination controls
  renderPaginationControls(eventsToRender.length);
};

const renderPaginationControls = function (totalEvents) {
  const paginationContainer = document.getElementById("paginationControls");
  paginationContainer.innerHTML = ""; // Clear existing controls

  const totalPages = Math.ceil(totalEvents / eventsPerPage); // Calculate total pages

  // Create "Previous" button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className = "btn btn-secondary me-2";
  prevButton.disabled = currentPage === 1; // Disable if on the first page
  prevButton.addEventListener("click", () => {
    currentPage--;
    renderEvents(events); // Re-render events
  });
  paginationContainer.appendChild(prevButton);

  // Create "Next" button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className = "btn btn-secondary";
  nextButton.disabled = currentPage === totalPages; // Disable if on the last page
  nextButton.addEventListener("click", () => {
    currentPage++;
    renderEvents(events); // Re-render events
  });
  paginationContainer.appendChild(nextButton);
};

const filterEvents = function () {
  const searchInput = document.getElementById("searchInput");
  const locationFilter = document.getElementById("locationFilter");

  const searchText = searchInput.value.toLowerCase(); // Get the search text
  const locationValue = locationFilter.value; // Get the selected location

  // Filter the events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText) ||
      event.date.toLowerCase().includes(searchText);

    const matchesLocation = !locationValue || event.location === locationValue;

    return matchesSearch && matchesLocation;
  });

  renderEvents(filteredEvents); // Render the filtered events
};

// Add event listeners for search and filter
document.getElementById("searchInput").addEventListener("input", filterEvents);
document
  .getElementById("locationFilter")
  .addEventListener("change", filterEvents);

fetchEvents();
