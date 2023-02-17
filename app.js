const form = document.querySelector('.qr-form');
const qrContainer = document.querySelector('.qrcode-container');
const spinner = document.querySelector('.spinner');
const buttons = document.querySelector('.buttons');
const qr = document.getElementById('qrcode');

// Function declarations 
const showContainer = () => {
    qrContainer.style.display = 'flex';
}
const hideContainer = () => {
    qrContainer.style.display = 'none';
}
const showSpinner = () => {
    spinner.style.display = 'block';
}
const hideSpinner = () => {
    spinner.style.display = 'none';
}
const generateQR = (url, size) => {
    const qrcode = new QRCode(document.getElementById('qrcode'), {
        text: url,
        height:size,
        width: size,
        colorDark: '#2B478B'
    })
    return qrcode;
}
const clearQR = () => {
    qr.innerHTML ='';
    hideContainer();
    buttons.innerHTML ='';
}
const createLink = (saveUrl) => {
    const aTag = document.createElement('a');
    aTag.classList.add = 'link';
    aTag.download = 'qrcode'
    aTag.href = saveUrl;
    aTag.innerHTML = 'Download'
    buttons.appendChild(aTag)
}

hideSpinner();

// Handling the submit of the form 
handleSubmit = (e) => {
    e.preventDefault();
    clearQR();
    url = document.getElementById('url-input').value;
    size = document.getElementById('size').value;
    if (url === ''){
        alert('Please provide an URL for your website')
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQR(url, size);
            showContainer();
            const img = qr.querySelector('img');
            img.style.height = '180px';
            img.style.width = '180px'
            setTimeout(() => {
                const saveUrl = img.src;
                createLink(saveUrl);
            }, 50);
        }, 1000);
    }
}


// Event Listeners 
form.addEventListener('submit',handleSubmit)
