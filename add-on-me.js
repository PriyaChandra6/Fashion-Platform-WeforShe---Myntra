// add-on-me.js  
// Image source selection

document.getElementById('uploadOption').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    imageInput.removeAttribute('capture');  // Ensure 'capture' attribute is removed for gallery upload
    imageInput.accept = "image/*";
    imageInput.click();
});

let currentStream;
let isUsingFrontCamera = false; // By default, use the back camera

document.getElementById('cameraOption').addEventListener('click', function() {
    startCamera();
});

// Function to start the camera
function startCamera() {
    const constraints = {
        video: { facingMode: isUsingFrontCamera ? "user" : "environment" },
        audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            currentStream = stream;
            const video = document.createElement('video');
            video.autoplay = true;
            video.srcObject = stream;

            const preview = document.getElementById('preview');
            preview.innerHTML = '';
            preview.appendChild(video);

            // Create switch camera button with FontAwesome icon
            const switchButton = createIconButton('switchCam', 'fa-camera-rotate', 'Switch Camera');
            // Create capture image button with FontAwesome icon
            const captureButton = createIconButton('takePhoto', 'fa-circle-stop', 'Take Photo');
            preview.appendChild(switchButton);
            preview.appendChild(captureButton);

            // Switch camera on button click
            switchButton.addEventListener('click', function() {
                isUsingFrontCamera = !isUsingFrontCamera;
                switchCamera();
            });

            // Capture the image when the capture button is clicked
            captureButton.addEventListener('click', function() {
                captureImage(video);
            });
        })
        .catch(function(error) {
            console.error("Error accessing camera: ", error);
            alert("Camera access is not available. Please check your device and browser settings.");
        });
}

// Function to switch the camera
function switchCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    startCamera();
}

// Function to create a button with a FontAwesome icon
function createIconButton(id, iconClass, altText) {
    const button = document.createElement('button');
    button.id = id;
    button.classList.add('icon-button'); // Add a class for styling
    const icon = document.createElement('i');
    icon.className = `fa-solid ${iconClass}`; // Updated to use FontAwesome solid class
    icon.setAttribute('aria-label', altText); // Add an aria-label for accessibility
    button.appendChild(icon);
    return button;
}

// Function to capture the image from the video stream
function captureImage(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    const preview = document.getElementById('preview');
    preview.innerHTML = '';
    preview.appendChild(img);
    document.getElementById('submitImage').style.display = 'block';

    // Stop the video stream
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
}

// Answer questions
document.getElementById('answerQuestions').addEventListener('click', function() {
    document.getElementById('questions').style.display = 'block';
});

// Submit answers
document.getElementById('submitAnswers').addEventListener('click', function() {
    const gender = document.getElementById('gender').value;
    const bodyType = document.getElementById('bodyType').value;
    const complexion = document.getElementById('complexion').value;
    const style = document.getElementById('style').value;
    const occasion = document.getElementById('occasion').value;
    const colors = Array.from(document.getElementById('colors').options)
                     .filter(option => option.selected)
                     .map(option => option.value);

    // Add functionality to process the selected answers
    const outfitRecommendation = `Gender: ${gender}, Body Type: ${bodyType}, Complexion: ${complexion}, Style: ${style}, Occasion: ${occasion}, Colors: ${colors.join(', ')}`;
    document.getElementById('outfitRecommendation').innerText = outfitRecommendation;
});
