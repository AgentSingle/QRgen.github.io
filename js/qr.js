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
    
    if (QR_CONTAINER.lastElementChild){
        var fileURL = QR_CONTAINER.lastElementChild.src;
        // console.warn(fileURL+';base64,')
        // fetch(fileURL)
        // .then(response => response.blob())
        // .then(blob => {
        //     const url = URL.createObjectURL(blob);
        //     const downloadLink = document.createElement('a');
        //     downloadLink.style.display = 'none';
        //     downloadLink.href = url;
        //     // the filename you want
        //     downloadLink.download = 'qr_code.png';
        //     downloadLink.target = '_blank';

        //     document.body.appendChild(downloadLink);
        //     downloadLink.click();
        //     URL.revokeObjectURL(url);
        //     downloadLink.remove(); // remove the element
        // });
        downloadImage(fileURL, 'qr_png.png');
    }
 
    
})

const downloadImage = (linkSource, fileName) => {
    fetch(linkSource)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const img = document.createElement("img");
            img.style.display = "none";
            img.src = url;
            document.body.appendChild(img);
            img.addEventListener("load", () => {
                URL.revokeObjectURL(url);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                document.body.removeChild(img);
            });
        });
};
// const downloadBase64Image = (base64, fileName) => {
//     const linkSource = `data:image/png;base64,${base64}`;
//     const downloadLink = document.createElement("a");
//     downloadLink.href = linkSource;
//     downloadLink.download = fileName;

//     if (navigator.msSaveOrOpenBlob) {
//         const byteCharacters = atob(base64);
//         const byteNumbers = new Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//             byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);
//         const blob = new Blob([byteArray], { type: "image/png" });
//         navigator.msSaveOrOpenBlob(blob, fileName);
//     } else {
//         downloadLink.style.display = "none";
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);
//     }
// };