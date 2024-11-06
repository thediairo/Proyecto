document.getElementById('form-signup').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nombre = document.getElementById('Nombre').value;
    const username = document.getElementById('username-signup').value;
    const password = document.getElementById('password-signup').value;
    const confirmTerms = document.getElementById('confirm-terms').checked;

    if (!nombre || !username || !password || !confirmTerms) {
        agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'Por favor, completa todos los campos y acepta los términos.', autoCierre: true });
        return;
    }

    
    const datosRegistro = {
        nombre: nombre,
        username: username,
        password: password,
        rol: 'usuario' 
    };

    fetch('../php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(datosRegistro)
    })
    .then(response => response.text())  
    .then(text => {
        console.log("Respuesta cruda del servidor:", text);  
        try {
            const data = JSON.parse(text);  
            return data;
        } catch (error) {
            console.error("Error al analizar JSON:", error);
            console.error("Respuesta cruda:", text);
            throw new Error("La respuesta del servidor no es JSON válido");
        }
    })
    .then(data => {
        console.log(data.status);
        if (data.status === 'success') {    
            agregarToast({ tipo: 'exito', titulo: 'Éxito', descripcion: 'Usuario registrado con éxito', autoCierre: true });
            
            document.getElementById('Nombre').value = '';
            document.getElementById('username-signup').value = '';
            document.getElementById('password-signup').value = '';
            document.getElementById('confirm-terms').checked = false;
            
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        } else {
            agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'Error en el registro: ' + data.message, autoCierre: true });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        agregarToast({ tipo: 'error', titulo: 'Error', descripcion: error.message, autoCierre: true });
    });
    
});
document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;

    if (!username || !password) {
        agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'Por favor, ingresa tu usuario y contraseña.', autoCierre: true });
        return;
    }

    const datosLogin = {
        username: username,
        password: password
    };

    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(datosLogin)
    })
    .then(response => response.text())
    .then(text => {
        console.log("Respuesta cruda del servidor:", text);
        try {
            const data = JSON.parse(text);
            return data;
        } catch (error) {
            console.error("Error al analizar JSON:", error);
            console.error("Respuesta cruda:", text);
            throw new Error("La respuesta del servidor no es JSON válido");
        }
    })
    .then(data => {
        console.log(data.status);
        if (data.status === 'success' && data.id) {  
            agregarToast({ tipo: 'exito', titulo: 'Éxito', descripcion: 'Inicio de sesión exitoso', autoCierre: true });

            const encryptionKey = "mi_clave_secreta";

            const encryptedUsername = CryptoJS.AES.encrypt(username, encryptionKey).toString();
            const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();
            const encryptedId = CryptoJS.AES.encrypt(data.id.toString(), encryptionKey).toString();

            sessionStorage.setItem('encryptedUsername', encryptedUsername);
            sessionStorage.setItem('encryptedPassword', encryptedPassword);
            sessionStorage.setItem('encryptedId', encryptedId);

            setTimeout(function() {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'Error en el inicio de sesión: ' + data.message, autoCierre: true });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        agregarToast({ tipo: 'error', titulo: 'Error', descripcion: error.message, autoCierre: true });
    });
});
