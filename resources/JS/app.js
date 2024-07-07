/**
 * Las "llaves" de encriptación que utilizaremos son las siguientes:
 * La letra "e" es convertida para "enter"
 * La letra "i" es convertida para "imes"
 * La letra "a" es convertida para "ai"
 * La letra "o" es convertida para "ober"
 * La letra "u" es convertida para "ufat"
 */

/**
 * Requisitos:

Debe funcionar solo con letras minúsculas
No deben ser utilizados letras con acentos ni caracteres especiales
Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.
 */
/**
 * La página debe tener campos para
inserción del texto que será encriptado o desencriptado, y el usuario debe poder escoger entre as dos opciones.
El resultado debe ser mostrado en la pantalla.
 */

/**
 * Un botón que copie el texto encriptado/desencriptado para la sección de transferencia, o sea que tenga la misma funcionalidad del ctrl+C o de la opción "copiar" del menú de las aplicaciones.
 */

//cadena de prueba

//Vamos a crear las llaves que seran las constantes en una lista


/*const textConvertido = encryptString(cadena);
console.log(textConvertido);
//let textoPorDescibrir = "fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!";
const decrypted = decryptString(textConvertido);
console.log(decrypted); // Salida esperada: "maleta mala"
*/

document.addEventListener("DOMContentLoaded", () => {
    const inputTextarea = document.getElementById("inputTextarea");
    const outputTextarea = document.getElementById("ouputTextarea");
    const encryptButton = document.getElementById("encryptButton");
    const decryptButton = document.getElementById("decryptButton");
    const copyButton = document.getElementById("copyButton");
    //const pasteButton = document.getElementById("pasteButton");

    const key = [
        ["a", "enter"],
        ["e", "imes"],
        ["i", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    /**
     * Hoberlaimesntaimesr cobermober aimesstaimesntaimesrs
     * h[ober]l[enter]
     * 
     */
    //let cadena = "hola soy una persona amigable";

    function asignaTextoElemento(elemento, texto) {
        let elementoHtml = document.querySelector(elemento);
        elementoHtml.innerHTML = texto;
        return;
    }

    function startDesafio() {
        document.querySelector('#inputTextarea').setAttribute('placeholder', "Ingrese Texto aqui");
        asignaTextoElemento("#pInfo", `<img src="../../public/images/info.png" alt=""> Solo letras minisculas sin acento`);
        asignaTextoElemento("#encryptButton", "Encriptar");
        asignaTextoElemento("#decryptButton", " Desencriptar");
    }

    function encryptString(input) {
        let encryptedString = "";
        //se crea un for en Of donde muestra los valores de entra de input 
        for (let char of input) {
            console.log(char);
            let replaced = false;
            //vamos a comparar los caracteres del imput con la key donde original es (vocales) y replacemnet es el valor doficicado
            for (const [original, replacement] of key) {
                //se pregunta si el caracter es igual a alguna vocal de la key
                if (char === original) {
                    //concatenamos el valor codificado en el string vacio
                    encryptedString += replacement;
                    //colocamos un flag o bandera donde nos indica que fue remplazado el caracter
                    replaced = true;
                    //salimos de la secuencia luego de reemplazar
                    break;
                }
            }
            //Se coloca el carácter original si no hay reemplazo
            if (!replaced) {
                encryptedString += char;
            }
        }
        //retornamos el valor codificado
        return encryptedString;
    }


    function decryptString(input) {
        let decryptedString = input;
        for (const [original, replacement] of key) {
            const regex = new RegExp(replacement, "gi");
            decryptedString = decryptedString.replace(regex, original);
        }
        return decryptedString;
    }

    function processInput(input) {
        // Convertir a minúsculas
        input = input.toLowerCase();
        // Remover caracteres no permitidos (todo lo que no sea letra minúscula o espacio)
        const sanitizedInput = input.replace(/[^a-z\s]/g, '');
        return sanitizedInput;
    }

    function displayMessage(message, isError = false) {
        asignaTextoElemento("#message", message);
        document.querySelector('#message').setAttribute('style', `color: ${isError ? 'red' : 'green'}`);
    }



    inputTextarea.addEventListener("input", () => {
        // Validar y limpiar la entrada en tiempo real
        const regex = /[^a-z\s]/g;
        const sanitizedValue = inputTextarea.value.replace(regex, '');

        if (sanitizedValue !== inputTextarea.value) {
            // Si se encontraron caracteres no permitidos, se muestra un mensaje
            displayMessage("Solo se permiten letras y espacios.", true);
            document.querySelector('#imgMunieco').removeAttribute('hidden');
            document.querySelector('#mensajeNoEncontrado').removeAttribute('hidden');
            document.querySelector('#parrafoInfo').removeAttribute('hidden');
            document.querySelector('#ouputTextarea').setAttribute('hidden', true);
            document.querySelector('#copyButton').setAttribute('hidden', true);
        } else {
            // Si no hay caracteres no permitidos, se limpia el mensaje
            displayMessage("");
        }

        // Se actualiza el valor del input con el valor sanitizado
        inputTextarea.value = sanitizedValue;
    });

    encryptButton.addEventListener("click", (event) => {
        event.preventDefault();
        let inputText = inputTextarea.value;
        inputText = processInput(inputText);
        if (inputText === '') {
            displayMessage('Por favor, ingrese texto válido para encriptar.', true);
        } else {
            const encryptedText = encryptString(inputText);
            outputTextarea.value = encryptedText;
            displayMessage('Texto encriptado con éxito.');
            document.querySelector('#imgMunieco').setAttribute('hidden', true);
            document.querySelector('#mensajeNoEncontrado').setAttribute('hidden', true);
            document.querySelector('#parrafoInfo').setAttribute('hidden', true);
            document.querySelector('#ouputTextarea').removeAttribute('hidden');
            document.querySelector('#copyButton').removeAttribute('hidden');
            inputTextarea.value = '';
        }


    });
    decryptButton.addEventListener("click", (event) => {
        event.preventDefault();
        let inputText = inputTextarea.value;
        inputText = processInput(inputText);
        if (inputText === '') {
            displayMessage('Por favor, ingrese texto válido para Desencriptar.', true);
        } else {
            const decryptedText = decryptString(inputText);
            outputTextarea.value = decryptedText;
            displayMessage('Texto Desencriptado con éxito.');
            document.querySelector('#imgMunieco').setAttribute('hidden', true);
            document.querySelector('#mensajeNoEncontrado').setAttribute('hidden', true);
            document.querySelector('#parrafoInfo').setAttribute('hidden', true);
            document.querySelector('#ouputTextarea').removeAttribute('hidden');
            document.querySelector('#copyButton').removeAttribute('hidden');
        }
    });

    copyButton.addEventListener("click", () => {
        // Selecciona el texto del textarea
        outputTextarea.select();
        // Copia el texto al portapapeles
        document.execCommand("copy");
    });




    startDesafio();

    /*pasteButton.addEventListener("click", async() => {
        // Pega el texto desde el portapapeles al textarea
        const text = await navigator.clipboard.readText();
        textarea.value = text;
    });*/


});