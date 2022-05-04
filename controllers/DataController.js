function addZero(n){
    if(n <= 9){
        return "0" + n;
    }else{
          return n;
    }
}

function formatarData(dia){
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let data = new Date(dia);
    let dFormato = meses[data.getMonth()] + " " + addZero(data.getDate()) + ", " + data.getFullYear();

    return dFormato;
}