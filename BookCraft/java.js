//-------------LIAMS CODE----------

// header sticky
$(document).ready(function () {
  $(window).on('scroll', function () {
    if ($(window).scrollTop()) {
      $("header").addClass('bgc');
    } else {
      $("header").removeClass('bgc');
    }
  });
});

// Scroll down feature
$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 50) {
      $(".scroll-down").css("opacity", "0");
    } else {
      $(".scroll-down").css("opacity", "1");
    }
  });
});


//-------- Code Combined of Liam and Aaron-----

fetch("books.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (books) {
    let originalBooks = books; // Save a copy of all books for filtering

    function renderBooks(booksToRender) {
      let container = $('.book-container');
      let out = "";
      for (let book of booksToRender) {
        out += `
          <div class="book">
            <img src='${book.image}' alt='${book.title}'>
            <h4>${book.title}</h4>
            <p>${book.author.join(', ')}</p>
          </div>
        `;
      }
      container.html(out);
    }

    renderBooks(books); // Initial rendering

    // Search functionality
    $('.input').on('input', function () {
      let searchText = $(this).val().toLowerCase();
      let filteredBooks = originalBooks.filter(book => {
        return (
          book.title.toLowerCase().includes(searchText) ||
          book.author.join(', ').toLowerCase().includes(searchText)
        );
      });
      renderBooks(filteredBooks);
    });

    // Filter functionality
    $('.genreFilter').on('change', function () {
      let selectedGenre = $(this).val();
      let filteredBooks;

      if (selectedGenre === 'all') {
        filteredBooks = originalBooks;
      } else {
        filteredBooks = originalBooks.filter(book => book.genre === selectedGenre);
      }

      renderBooks(filteredBooks);
    });
  });






//--------------------------AARON CODE-------------------------------

// Variable to track subscription status
let isSubscribed = false;

// Add an event listener to the subscribe button
document.querySelector('.btn').addEventListener('click', function () {
  // Check if the user is subscribed
  if (isSubscribed) {
    alert('You are already subscribed, thank you!');
  } else {
    alert('You are now subscribed to our mailing list!');
    // Update the subscription status
    isSubscribed = true;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Wait for the DOM to be fully loaded

  // Get the send button element by its class
  var sendButton = document.querySelector('.sendbtn');

  // Add a click event listener to the send button
  sendButton.addEventListener('click', function() {
    // Display an alert when the button is clicked
    alert('Message sent!');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Wait for the DOM to be fully loaded

  // Get all radio buttons with the name "rate"
  var ratingInputs = document.querySelectorAll('input[name="rate"]');

  // Add a change event listener to each radio button
  ratingInputs.forEach(function(input) {
    input.addEventListener('change', function() {
      // Get the selected rating
      var selectedRating = this.value;

      // Display an alert with the selected rating
      alert('You rated us ' + selectedRating + ' stars, thank you!');
    });
  });
});


//--------------------------MICHAEL CODE-------------------------------
function updateDublinTime() {
   // Fetch the current time for Dublin from the WorldTimeAPI
   fetch('http://worldtimeapi.org/api/timezone/Europe/Dublin')
     .then(response => response.json())
     .then(data => {
       var currentTime = new Date(data.utc_datetime).toLocaleTimeString();
       document.getElementById("time").innerText = `Current time in Dublin: ${currentTime}`;
     })
     .catch(error => {
       console.error('Error fetching time data:', error);
       document.getElementById("time").innerText = "Error fetching time data";
     });
 }

 // Initial update
 updateDublinTime();

 // Update the time every 1 second (1000 milliseconds)
 setInterval(updateDublinTime, 1000);
