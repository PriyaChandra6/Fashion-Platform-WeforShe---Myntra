// add-on-me.js  

// Image source selection
 
 document.getElementById('uploadOption').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    imageInput.removeAttribute('capture');  // Ensure 'capture' attribute is removed for gallery upload
    imageInput.accept = "image/*";
    imageInput.click();
});

document.getElementById('cameraOption').addEventListener('click', function() {
    const constraints = { video: { facingMode: "environment" }, audio: false };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        // Use the stream from the camera
        const video = document.createElement('video');
        video.autoplay = true;
        video.srcObject = stream;

        const preview = document.getElementById('preview');
        preview.innerHTML = '';
        preview.appendChild(video);

        // Capture the image when the video is clicked
        video.addEventListener('click', function() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            preview.innerHTML = '';
            preview.appendChild(img);
            document.getElementById('submitImage').style.display = 'block';

            // Stop the video stream
            stream.getTracks().forEach(track => track.stop());
        });
    })
    .catch(function(error) {
        console.error("Error accessing camera: ", error);
        alert("Camera access is not available. Please check your device and browser settings.");
    });
});

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
