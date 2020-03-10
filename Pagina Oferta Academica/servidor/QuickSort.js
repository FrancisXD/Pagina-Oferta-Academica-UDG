var QuickSort = {}

function esMenor(cadenaUno,cadenaDos) {
    for(var i = 0;i < cadenaUno.length;i++) {
        if(cadenaUno[i] < cadenaDos[i]) {
            return true; 
        }
        else if(cadenaUno[i] > cadenaDos[i]) {
            return false;
        }
    }
    return false;
}

function intercambia(objetos,indiceIzq,indiceDer){
    var temp = objetos[indiceIzq];
    objetos[indiceIzq] = objetos[indiceDer];
    objetos[indiceDer] = temp;
}

function particion(objetos,izq,der) {
    var pivote = objetos[Math.floor((der+izq)/2)];
    var i = izq;
    var j = der;

    while (i <= j) {
        while (esMenor(objetos[i].horario.horaInicio,pivote.horario.horaInicio)) {
            i++;
        }
        while (esMenor(pivote.horario.horaInicio,objetos[j].horario.horaInicio)) {
            j--;
        }
        if (i <= j) {
            intercambia(objetos,i,j);
            i++;
            j--;
        }
    }
    return i;
}

function ordenar(grupos,izq,der) {
    var indice;

    if (grupos.length > 1) {
        indice = particion(grupos,izq,der);
        if (izq < indice-1) {
            ordenar(grupos,izq,indice-1);
        }
        if (indice < der) {
            ordenar(grupos,indice,der);
        }
    }
    return grupos;
}

QuickSort.ordenar = ordenar;

module.exports = QuickSort;