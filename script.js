document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("contact.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById("contactForm").reset();
  })
  .catch(error => {
    alert("Error sending message.");
  });
});
