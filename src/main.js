'use strict'

// var openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
openpgp.initWorker({ path:'openpgp.worker.js' }) // set the relative web worker path
openpgp.config.aead_protect = true // activate fast AES-GCM mode (not yet OpenPGP standard)

encrypt.onclick = function(event) {
    var options;

    options = {
        data: document.getElementById('input').value,
        passwords: [document.getElementById("password").value]
    }

    openpgp.encrypt(options).then(function(ciphertext) {
        var encrypted = ciphertext.data
        document.getElementById('output').value = ""
        document.getElementById('output').value += encrypted
    })
}

decrypt.onclick = function(event) {
    var options
    document.getElementById('output').value = ":("

    options = {
        message: openpgp.message.readArmored(document.getElementById('input').value),
        password: document.getElementById("password").value
    }

    openpgp.decrypt(options).then(function(text) {
        var text = text.data
        document.getElementById('output').value = ""
        document.getElementById('output').value += text
    })
}

move_out_to_in.onclick = function (event) {
    document.getElementById('input').value = document.getElementById('output').value
    document.getElementById('output').value = ""
}
