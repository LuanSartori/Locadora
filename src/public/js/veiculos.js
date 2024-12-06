

var editarBtn = document.getElementById("editarBtn");
editarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum veículo para editar.");
        return;
    }
    
    // busca os dados do veículo
    axios.get('/veiculos/buscar_um', {
        params: {
            veicPlaca: dados[0]
        }
    }).then( (response) => {
        var veic = response.data;

        // preenche o form com os dados do veículo selecionado
        var form = document.getElementById("form-editar");
        var inputs = form.getElementsByTagName("input");
        var selectComb = document.getElementById("veicComb")
        var selectCat = document.getElementById("veicCat")

        form.action = "/veiculos/update/" + veic.veicPlaca;
        inputs[0].value = veic.veicMarca;
        inputs[1].value = veic.veicModelo;
        inputs[2].value = veic.veicCor;
        inputs[3].value = veic.veicAno;
        inputs[4].checked = veic.veicStatusAlocado;
        selectComb.value = veic.veicComb;
        selectCat.value = veic.veicCat;
    })
})

var deletarBtn = document.getElementById("deletarBtn");
deletarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum veículo para deletar.");
        return;
    }
    window.location.href = "http://localhost:3000/veiculos/delete/" + dados[0];
})
