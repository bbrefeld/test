// Load dynamic reviews when page finished loading
window.onload = async function() {
  await getReviews();
  calculateAverageRating();
  loadReviews();
}

// Asynchronous function that waits 0,5s (for review slide animation)
function waitForAnimation() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 500);
  });
}

// Making elements interactable with javascript
const nextReview = document.getElementById("reviewNext");
const prevReview = document.getElementById("reviewPrev");
let reviewScreen = document.getElementsByClassName("visibleReviews")[0];
let currentRatingStars = document.getElementsByClassName("currentRatingStars");
const ratingInputs = document.getElementById("reviewScore").getElementsByTagName("input");
let ratingInputLabels = document.getElementById("reviewScore").getElementsByTagName("label");

// Reviews placeholder (will be replaced by server response)
const reviewArray = []

// Calculate average rating of all reviews
const calculateAverageRating = () => {
  let totalScore = 0;
  for (i=0; i<reviewArray.length; i++) {
    totalScore = totalScore + reviewArray[i].rating;
  }
  const averageRating = Math.round((totalScore/reviewArray.length)*10)/10;
  document.getElementById("numberOfReviews").innerHTML=reviewArray.length;
  document.getElementById("averageRating").innerHTML=averageRating;
  document.getElementsByClassName("full")[0].style.width=(averageRating*20)+"%";
}

// Click counter to determine when to reset review view
let reviewSwitch = 0;

// On clicking next button
nextReview.onclick = async function() {
  // Add animation to review container
  reviewScreen.classList.add("visibleReviews-translate-next");
  // wait for animation to finish
  await waitForAnimation();
  // add 1 to click counter
  reviewSwitch--;
  // Reload dynamic reviews with the new counter
  loadReviews();
  // Reset review container to original position
  reviewScreen.classList.remove("visibleReviews-translate-next")
}

// Same as above but animation goes opposite direction and counter goes -1
prevReview.onclick = async function() {
  reviewScreen.classList.add("visibleReviews-translate-prev");
  await waitForAnimation();
  reviewSwitch++;
  loadReviews();
  reviewScreen.classList.remove("visibleReviews-translate-prev")
}

// Function to correctly place reviews
const loadReviews = () => {
  // Get all review elements
  let reviewElements = document.getElementsByClassName("review");
  // Loop through all review elements
  for (i=0; i<reviewElements.length; i++) {
    let reviewSpans = reviewElements[i].getElementsByTagName("span");

    // Show first review after last one has shown
    if (i+reviewSwitch >= reviewArray.length) {
      reviewElements[i].getElementsByTagName("p")[0].innerHTML = reviewArray[i+reviewSwitch-reviewArray.length].reviewContent;
      reviewSpans[0].innerHTML = reviewArray[i+reviewSwitch-reviewArray.length].name;
      reviewSpans[1].innerHTML = reviewArray[i+reviewSwitch-reviewArray.length].date;
    // Show last review after showing first one
    } else if (reviewSwitch < 0) {
      // Make sure to keep showing first reviews even when last enters container
      if (reviewArray.length+reviewSwitch+i >= reviewArray.length) {
        reviewElements[i].getElementsByTagName("p")[0].innerHTML = reviewArray[reviewSwitch+i].reviewContent;
        reviewSpans[0].innerHTML = reviewArray[reviewSwitch+i].name;
        reviewSpans[1].innerHTML = reviewArray[reviewSwitch+i].date;
      } else {
      reviewElements[i].getElementsByTagName("p")[0].innerHTML = reviewArray[reviewArray.length+reviewSwitch+i].reviewContent;
      reviewSpans[0].innerHTML = reviewArray[reviewArray.length+reviewSwitch+i].name;
      reviewSpans[1].innerHTML = reviewArray[reviewArray.length+reviewSwitch+i].date;
    };
  } else {
      // Put in the correct review tekst (calculated based on counter)
      reviewElements[i].getElementsByTagName("p")[0].innerHTML = reviewArray[i+reviewSwitch].reviewContent;
      reviewSpans[0].innerHTML = reviewArray[i+reviewSwitch].name;
      reviewSpans[1].innerHTML = reviewArray[i+reviewSwitch].date;
    };
  };
  // Reset complete review logic when reviews are back in original position
  if (reviewSwitch === reviewArray.length || reviewSwitch === -reviewArray.length) {
    reviewSwitch = 0;
  };
};

// Check which star is clicked
const checkStar = () => {
  starFill(event.target.id);
}

// Make clicked rating orange and other stars grey
const starFill = starId => {
  for (i=0; i<ratingInputs.length; i++) {
    if (i<starId.replace(/[^\d.]/g, '')) {
      ratingInputLabels[ratingInputs.length-1-i].style.filter = "invert(59%) sepia(73%) saturate(1397%) hue-rotate(1deg) brightness(106%) contrast(102%)";
    } else {
      ratingInputLabels[ratingInputs.length-1-i].style.filter = "invert(86%) sepia(9%) saturate(21%) hue-rotate(10deg) brightness(100%) contrast(86%)";
    }
  }
}

// Add onclick to all stars
for (i=0; i<ratingInputs.length; i++) {
  ratingInputs[i].onclick = checkStar;
};

// Get request for reviews
const getReviews = async () => {
  await fetch('http://localhost:8888/reviews')
  .then(res => res.json())
  .then(reviewresponse => {
    console.log(reviewresponse);
    for (i=0; i<reviewresponse.length; i++) {
      reviewArray.push(reviewresponse[reviewresponse.length-i-1]);
    };
  });
};

// Get request for footer
const getFooter = async () => {
  const xhr= new XMLHttpRequest();
  xhr.open('GET', './resources/html/footer.html', true);
  xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
    document.getElementById('testx').innerHTML= this.responseText;
  };
  xhr.send();
};
