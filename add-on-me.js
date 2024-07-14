
    const compareOutfitsButton = document.getElementById('compareOutfitsButton');
    const outfitRecommendation = document.getElementById('outfitRecommendation');
    const outfitComparisonSection = document.getElementById('outfitComparisonSection');
    const viewFullButtons = document.querySelectorAll(".view-full-button");


    document.getElementById('uploadOption').addEventListener('click', function() {
        const imageInput = document.getElementById('imageInput');
        imageInput.removeAttribute('capture');
        imageInput.accept = "image/*";
        imageInput.click();
    });
    
    document.getElementById('imageInput').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                const preview = document.getElementById('preview');
                preview.innerHTML = '';
                preview.appendChild(img);
                document.getElementById('submitImage').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    let currentStream;
    let isUsingFrontCamera = false;
    
    document.getElementById('cameraOption').addEventListener('click', function() {
        startCamera();
    });
    
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
    
                const switchButton = createIconButton('switchCam', 'fa-camera-rotate', 'Switch Camera');
                const captureButton = createIconButton('takePhoto', 'fa-circle-stop', 'Take Photo');
                preview.appendChild(switchButton);
                preview.appendChild(captureButton);
    
                switchButton.addEventListener('click', function() {
                    isUsingFrontCamera = !isUsingFrontCamera;
                    switchCamera();
                });
    
                captureButton.addEventListener('click', function() {
                    captureImage(video);
                });
            })
            .catch(function(error) {
                console.error("Error accessing camera: ", error);
                alert("Camera access is not available. Please check your device and browser settings.");
            });
    }
    
    function switchCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        startCamera();
    }
    
    function createIconButton(id, iconClass, altText) {
        const button = document.createElement('button');
        button.id = id;
        button.classList.add('icon-button');
        const icon = document.createElement('i');
        icon.className = `fa-solid ${iconClass}`;
        icon.setAttribute('aria-label', altText);
        button.appendChild(icon);
        return button;
    }
    
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
    
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
    }
    
    document.getElementById('submitImage').addEventListener('click', function() {
        document.getElementById('resultSection').classList.remove('hidden');
        document.getElementById('compareOutfitsButton').style.display = 'block';
    });
    
    document.getElementById('answerQuestions').addEventListener('click', function() {
        document.getElementById('questions').style.display = 'block';
    });
    
    document.getElementById('submitAnswers').addEventListener('click', function() {
        const gender = document.getElementById('gender').value;
        const bodyType = document.getElementById('bodyType').value;
        const complexion = document.getElementById('complexion').value;
        const style = document.getElementById('style').value;
        const occasion = document.getElementById('occasion').value;
        const colors = Array.from(document.getElementById('colors').selectedOptions).map(option => option.value).join(', ');
    
        const outfitRecommendation = `
            Gender: ${gender}, 
            Body Type: ${bodyType}, 
            Complexion: ${complexion}, 
            Style: ${style}, 
            Occasion: ${occasion}, 
            Colors: ${colors}
        `;
        
        document.getElementById('mannequin').innerText = outfitRecommendation;
        document.getElementById('resultSection').classList.remove('hidden');
        document.getElementById('compareOutfitsButton').style.display = 'block'; // Show the comparison button
    }); 
   // Show the comparison section
    document.getElementById('compareOutfitsButton').addEventListener('click', function() {
        // Compare outfits button event
        outfitComparisonSection.classList.remove('hidden');
        displayOutfitsForComparison();
    });
   // Display outfits for comparison
   function displayOutfitsForComparison() {
    outfitComparisonSection.innerHTML = `
        <div class="outfit">
            <img src="outfit1.jpg" alt="Outfit 1">
            <p>Name:</p>
            <p>Price:</p>
            <p>Quality:</p>
            <button class="view-full-button">View Full</button>
        </div>
        <p>OR</p>
        <div class="outfit">
            <img src="outfit2.jpg" alt="Outfit 2">
            <p>Name:</p>
            <p>Price:</p>
            <p>Quality:</p>
            <button class="view-full-button">View Full</button>
        </div>
       
       <div class="skip-next">
            <button class="SkipBtn">skip to next</button>
        </div>
   `;}
    // View full button functionality
    viewFullButtons.forEach(button => {
        button.addEventListener("click", () => {
            const outfitImageSrc = button.previousElementSibling.src;
            window.open(outfitImageSrc, '_blank');
        });
    });

   

  
