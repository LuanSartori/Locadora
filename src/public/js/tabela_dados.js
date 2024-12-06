// permite as linhas da tabela serem selecionadas
var tabela = document.getElementById("tabela");
var linhas = tabela.getElementsByTagName("tr");

Array.from(linhas).forEach(linha => {
    // 
    linha.addEventListener("click", () => {
        selecionarLinha(linha);
    })
});


function selecionarLinha(linha){
    // remove outras linhas selecionadas
    var linhaSelecionada = tabela.getElementsByClassName("selecionado");
    if (linhaSelecionada.length && linhaSelecionada[0] != linha) linhaSelecionada[0].classList.toggle("selecionado");

    // seleciona a linha
    linha.classList.toggle("selecionado");
}


function capturarDados () {
    var linha = tabela.getElementsByClassName("selecionado");

    // verica se há uma linha selecionada
    if (linha.length) {

        // acessa as colunas do linha selecionada
        linha = linha[0].getElementsByTagName("td")
        var dados = {
            id: linha[0].innerHTML,
            nome: linha[1].innerHTML,
            endereco: linha[2].innerHTML,
            telefone: linha[3].innerHTML,
        }
        return dados;
    }
    return false;
}