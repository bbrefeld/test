window.onload = async function() {
  if (cookiesToObject().reviewID) {
    await getReview();
    reviewLogic()
  } else {
    await getReview();
    reviewLogic();
  };
}

let reviewObject = {};

const cookiesToObject = () => {
  let cookieObject = {};
  const cookieArray = document.cookie.split('; ');
  for (i=0; i<cookieArray.length; i++) {
    const currentItem = cookieArray[i].split('=')
    cookieObject[currentItem[0]] = currentItem[1];
  };
  return cookieObject;
};

const getReview = async () => {
  await fetch('http://localhost:8888/confirmReview')
  .then(res => res.json())
  .then(myJSON => {
    console.log(myJSON);
    reviewObject = myJSON[0];
  });
};

const reviewLogic = () => {
  document.getElementById('dynamicReview').style.display = "block";
  document.getElementById('rating').innerHTML = reviewObject.rating;
  document.getElementById('reviewContent').innerHTML = reviewObject.reviewContent;
  document.getElementById('rName').innerHTML = reviewObject.name;
  document.getElementById('date').innerHTML = reviewObject.date;
};
