let QR_Download_BTN = document.querySelector('#DOWNLOAD_QRcode');
let qrContentInput = document.getElementById("qr-content");
let QR_CONTAINER = document.querySelector('#qr-code');
let dimension = QR_CONTAINER.getBoundingClientRect().height;
let newDimension = (dimension - 10)
QR_CONTAINER.style.width = `${dimension}px`;
let qrCode;


function generateQrCode(qrContent) {
    const qr_code = new QRCode("qr-code", {
            text: qrContent,
            width: newDimension,
            height: newDimension,
            colorDark: "#009965",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    return qr_code;
}


const GenerateQR = (qrContent) => {
    // let qrContentInput = document.getElementById("qr-content");
    if (qrCode == null) {
        // Generate code initially
        qrCode = generateQrCode(qrContent);
    } 
    else {
        // If code already generated then make
        // again using same object
        qrCode.makeCode(qrContent);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    GenerateQR(qrContentInput.value);
});
qrContentInput.addEventListener('input', ()=>{
    GenerateQR(qrContentInput.value);
})

// ADD DOWNLOAD BUTTON
QR_Download_BTN.addEventListener('click', (e) => {
    e.preventDefault();
    // console.warn(QR_CONTAINER.firstElementChild)

    if (QR_CONTAINER.firstElementChild){
        let canvas = QR_CONTAINER.firstElementChild;
        var fileURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        // var fileURL = QR_CONTAINER.lastElementChild.src;
        fetch(fileURL)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.style.display = 'none';
            downloadLink.href = url;
            // the filename you want
            downloadLink.download = 'qr_code.png';
            downloadLink.target = '_blank';

            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove(); // remove the element


            const DisplayText = document.createElement('em');
            DisplayText.innerText = url;
            DisplayText.style.position = 'absolute';
            DisplayText.style.top = '50';
            DisplayText.style.left = '0';

            document.body.appendChild(DisplayText);
            setTimeout(() => {
              DisplayText.remove()  
            }, 5000);

            setTimeout(() => 
            URL.revokeObjectURL(
                downloadLink.href
            ), 3000);
        });
    }
 
    
})
