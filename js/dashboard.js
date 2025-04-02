const loadAttendeeTable = function () {
  const attendeeTable = document.getElementById("attendeeTable");

  attendeeTable.innerHTML = "";

  // Get stored registrations and events from localStorage
  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Debugging: Check data structure
  console.log("Registrations:", registrations);
  // console.log("Events:", events);

  // Loop through each registration and add a row to the table
  registrations.forEach((reg) => {
    const event = events.find(
      (e) => e.id.toString() === reg.eventId.toString()
    ) || { title: "Unknown Event" };

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${reg.name ? reg.name : "No Name"}</td>
        <td>${reg.email ? reg.email : "No Email"}</td>
        <td>${event.title ? event.title : "Unknown Event"}</td>

      `;

    attendeeTable.appendChild(row);
  });
};

// Single DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function () {
  // Chart setup
  const canvas = document.getElementById("eventChart");

  const ctx = canvas.getContext("2d");

  const events = [
    { id: 1, title: "Tech Conference 2025" },
    { id: 2, title: "Startup Meetup 2025" },
    { id: 3, title: "Music Fest" },
  ];

  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  let eventNames = events.map((e) => e.title);
  let eventCounts = events.map(
    (e) => registrations.filter((reg) => reg.eventId === e.id).length
  );

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: eventNames,
      datasets: [
        {
          label: "Registrations",
          data: eventCounts,
          backgroundColor: ["#007bff", "#28a745", "#dc3545"],
        },
      ],
    },
    options: { responsive: true },
  });

  // Load the attendee table
  loadAttendeeTable();
});
