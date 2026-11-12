const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloaBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
generateBtn.addEventListener('click' , ()=>{
    e.preventDefault();
    generateQRCode();
});

function generateQRCode(){
    new QRCode(qrContainer,{
        text:qrText.ariaValueMax,
        height:size,
        colorLight:"#fff",
        colorDark:"#000",
    });
}