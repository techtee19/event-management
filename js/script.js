document.addEventListener("DOMContentLoaded", function () {
  // Select modal elements
  const registerModal = document.getElementById("registerModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeModalBtn = document.querySelector(".btn--close-modal");
  const registerButtons = document.querySelectorAll(".btn-register"); // All "Register" buttons

  // Function to open the modal
  const openModal = function () {
    registerModal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
  };

  // Function to close the modal
  const closeModal = function () {
    registerModal.classList.add("hidden");
    modalOverlay.classList.add("hidden");
  };

  // Add event listeners to "Register" buttons
  registerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Add event listeners to close modal
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  // Handle form submission
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      // Save registration data to local storage
      const registration = { name, email, phone };
      const registrations =
        JSON.parse(localStorage.getItem("registrations")) || [];
      registrations.push(registration);
      localStorage.setItem("registrations", JSON.stringify(registrations));

      // Notify the user and close the modal
      alert("Registration successful!");
      closeModal();
    });
  }
});
