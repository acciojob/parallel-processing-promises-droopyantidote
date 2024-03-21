const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", () => {
  downloadAndDisplayImages(images);
});

function downloadAndDisplayImages(images) {
  // Map each image URL to a promise that resolves when the image is loaded
  const promises = images.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
      img.src = image.url;
    });
  });

  // Execute all promises concurrently and handle results
  Promise.all(promises)
    .then(images => {
      // Clear existing content
      output.innerHTML = '';
      // Display each image
      images.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
