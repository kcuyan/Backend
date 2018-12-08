'use strict'

var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);//parseFloat para convertir de string a numero
var numero2 = parseFloat(params[1]);
var plantilla = `
la suma es: ${numero1+numero2}
La resta es: ${numero1-numero2}
La multiplicacion es: ${numero1*numero2}
La division es: ${numero1/numero2}
`;

console.log(plantilla);