const imageInput = document.getElementById('imageInput');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

let image = null;

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!image) {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f9fafb';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Choose an image to start', canvas.width / 2, canvas.height / 2);
    return;
  }

  const imgWidth = 600;
  const imgHeight = 500;
  ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

  const topText = topTextInput.value.trim().toUpperCase();
  const bottomText = bottomTextInput.value.trim().toUpperCase();

  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 8;
  ctx.fillStyle = 'white';
  ctx.font = 'bold 36px Arial';

  ctx.strokeText(topText, canvas.width / 2, 50);
  ctx.fillText(topText, canvas.width / 2, 50);

  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
}

function handleImageUpload(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    image = new Image();
    image.onload = drawMeme;
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadMeme() {
  if (!image) {
    alert('Please choose an image first.');
    return;
  }

  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

imageInput.addEventListener('change', handleImageUpload);
generateBtn.addEventListener('click', drawMeme);
downloadBtn.addEventListener('click', downloadMeme);
[topTextInput, bottomTextInput].forEach((input) => {
  input.addEventListener('input', drawMeme);
});

drawMeme();
