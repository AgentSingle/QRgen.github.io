let QR_Download_BTN = document.querySelector('#DOWNLOAD_QRcode');
let qrContentInput = document.getElementById("qr-content");
let QR_CONTAINER = document.querySelector('#qr-code');
let QR_Display_CONTAINER = document.querySelector('#qrcode');
let dimension = QR_Display_CONTAINER.getBoundingClientRect().height;
let newDimension = (dimension - 10)
let LOGO = `${window.location.origin}/dummy/QR_icon_144x144.png`; // Development
// let LOGO = `https://ataota.github.io/QRgen.github.io/dummy/QR_icon_144x144.png`; // production
QR_CONTAINER.style.height = `${dimension}`;
QR_CONTAINER.style.width = `${dimension}`;
QR_Display_CONTAINER.style.width = `${dimension -10}px`;
QR_Display_CONTAINER.style.height = `${dimension - 10}px`;
let qrCode;
newDimension=720
// DRAW QR CODE
function generateQrCode(qrContent) {
    const qr_code = new QRCode("qr-code", {
            text: qrContent,
            width: newDimension,
            height: newDimension,
            colorDark: "#2c3e50",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    return qr_code;
}

// INITIALIZE QR CODE
const GenerateQR = (qrContent) => {
    // let qrContentInput = document.getElementById("qr-content");
    if (qrCode == null) {
        // Generate code initially
        qrCode = generateQrCode(qrContent);
        AddLogoInQR(LOGO);
    } 
    else {
        // If code already generated then make
        // again using same object
        qrCode.makeCode(qrContent);
        AddLogoInQR(LOGO);
    }
}

// AFTER LOADING WINDOW CALL INITIALIZATION FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    GenerateQR(qrContentInput.value);
});

// CHANGE QR CODE ACCORDING TO USER INPUT
qrContentInput.addEventListener('input', ()=>{
    GenerateQR(qrContentInput.value);
})

// DRAW LOGON INSIDE CANVAS
const AddLogoInQR = (LOGO) =>{
    if (QR_CONTAINER.firstElementChild){
        let NewCanvas = QR_CONTAINER.firstElementChild;
        var img = new Image();
        img.src = LOGO;
        img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var img2 = new Image();
            img2.src = NewCanvas.toDataURL();
            img2.onload = function() {
                var canvas2 = document.createElement("canvas");
                canvas2.width = img2.width;
                canvas2.height = img2.height;
                canvas2.style.display = 'none';
                var ctx2 = canvas2.getContext("2d");
                ctx2.drawImage(img2, 0, 0);
                ctx2.drawImage(img, (canvas2.width-img.width)/2, (canvas2.height-img.height)/2);


                let NewImage = document.createElement('img');
                NewImage.src = canvas2.toDataURL();
                NewImage.style.display = 'block';
                NewImage.height = (dimension - 20);
                NewImage.width = (dimension - 20);
                QR_Display_CONTAINER.innerHTML = "";
                QR_Display_CONTAINER.prepend(canvas2);
                QR_Display_CONTAINER.append(NewImage);
            }
        }
    }
}


// ADD DOWNLOAD BUTTON
QR_Download_BTN.addEventListener('click', (e) => {
    e.preventDefault();
    // console.warn(QR_CONTAINER.firstElementChild)

    if (QR_Display_CONTAINER.firstElementChild){
        let NewCanvas = QR_Display_CONTAINER.firstElementChild;

        var fileURL = NewCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
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

            setTimeout(() => 
            URL.revokeObjectURL(
                downloadLink.href
            ), 3000);
        });
    }
})
