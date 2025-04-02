// Sample event data array
const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "A day of innovation and networking.",
    location: "Lagos",
    date: "2025-05-20",
    image: "img/event1.jpeg",
    link: "registration.html",
  },
  {
    id: 2,
    title: "Startup Meetup 2025",
    description: "Meet the pioneers of tomorrow's startups.",
    location: "Abuja",
    date: "2025-06-10",
    image: "img/event2.jpeg",
    link: "registration.html",
  },
  {
    id: 3,
    title: "Music Fest",
    description: "Live performances by top artists.",
    location: "New York",
    date: "2025-07-15",
    image: "img/event3.jpeg",
    link: "registration.html",
  },
];

const catalog = document.getElementById("eventCatalog");

const renderEvents = function (eventsToRender) {
  catalog.innerHTML = "";

  if (!Array.isArray(eventsToRender) || eventsToRender.length === 0) {
    catalog.innerHTML = ` <div class="row" id="eventCatalog">
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img
              src="img/tech event.jpeg"
              class="card-img-top"
              alt="Event Image"
            />
            <div class="card-body">
              <h5 class="card-title">Tech Conference 2025</h5>
              <p class="card-text">
                Join us for a day of innovation and networking.
              </p>
              <a href="registration.html" class="btn btn-primary">Register</a>
            </div>
          </div>
        </div>
      </div>`;
    return;
  }

  eventsToRender.forEach((event) => {
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
          </div>
        `;
    catalog.appendChild(eventCard);
  });
};

const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");

const filterEvents = function () {
  searchInput.value.toLowerCase();
  locationFilter.value;

  const filtered = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText) ||
      event.date.includes(searchText);

    const matchesLocation =
      locationFilter === "" || event.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  renderEvents(filtered.length ? filtered : []);
};

searchInput.addEventListener("input", filterEvents);
locationFilter.addEventListener("change", filterEvents);

document.addEventListener("DOMContentLoaded", renderEvents);
