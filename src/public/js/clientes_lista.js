
var editarBtn = document.getElementById("editarBtn");
editarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum cliente para editar.");
        return;
    }

    // preenche o form com os dados do cliente selecionado
    var form = document.getElementById("form-editar");
    var inputs = form.getElementsByTagName("input");
    form.action += dados.id;
    inputs[0].value = dados.nome;
    inputs[1].value = dados.endereco;
    inputs[2].value = dados.telefone;
})

var deletarBtn = document.getElementById("deletarBtn");
deletarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum cliente para deletar.");
        return;
    }
    window.location.href = "http://localhost:3000/clientes/delete/" + dados.id;
})
