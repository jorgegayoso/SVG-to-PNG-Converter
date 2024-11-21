function loadSvg(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Display the SVG
            const svgContainer = document.getElementById('svgContainer');
            svgContainer.innerHTML = e.target.result;

            // Enable the convert button
            document.getElementById('convertBtn').disabled = false;
        };
        reader.readAsText(file);
    }
}

function convertToPng() {
    // Get the SVG element from the container
    const svg = document.querySelector('#svgContainer svg');
    if (!svg) {
        alert('No SVG loaded!');
        return;
    }

    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = 1000;  // You might want to adjust these dimensions
    canvas.height = 1000; // based on your SVG size
    const ctx = canvas.getContext("2d");

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);

    // Create an image element
    const img = new Image();
    
    // When the image loads, draw it on canvas and trigger download
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click(); // This will trigger the download
        
        // Clean up
        URL.revokeObjectURL(url);
    };

    img.src = url;
}