

var editarBtn = document.getElementById("editarBtn");
editarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum funcionário para editar.");
        return;
    }
    
    // busca os dados do funcionario no banco
    axios.get('/funcionarios/buscar_um', {
        params: {
            funcMatricula: dados[0]
        }
    }).then( (response) => {
        var func = response.data;

        // preenche o form com os dados do funcionário selecionado
        var form = document.getElementById("form-editar");
        var inputs = form.getElementsByTagName("input");
        var selectDepto = document.getElementById("funcDepto");

        form.action = "/funcionarios/update/" + func.funcMatricula;
        inputs[0].value = func.funcNome;
        inputs[1].value = func.funcSalario;
        inputs[2].value = func.funcFilho;
        inputs[3].checked = func.funcAtivo;
        selectDepto.value = func.funcDepto;
    })
})

var deletarBtn = document.getElementById("deletarBtn");
deletarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum funcionário para deletar.");
        return;
    }
    window.location.href = "http://localhost:3000/funcionarios/delete/" + dados[0];
})
