
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
    form.action += dados[0];
    inputs[0].value = dados[1];
    inputs[1].value = dados[2];
    inputs[2].value = dados[3];
})

var deletarBtn = document.getElementById("deletarBtn");
deletarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum cliente para deletar.");
        return;
    }
    window.location.href = "http://localhost:3000/clientes/delete/" + dados[0];
})
