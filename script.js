const images = [
    "images/nationalConfBoard.JPG",
    "images/oSTEM Confrence 2019.jpg",
  ];
  
  let current = 0;
  const slide = document.getElementById("slide");
  
  setInterval(() => {
    current = (current + 1) % images.length;
    slide.src = images[current];
  }, 3000); // change every 3 seconds
  
  