
var editarBtn = document.getElementById("editarBtn");
editarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione alguma ordem para editar.");
        return;
    }
    console.log('TA AQUII');
    

    // busca os dados do veículo
    axios.get('/ordensdeservico/buscar_um', {
        params: {
            osNum: dados[0]
        }
    }).then( (response) => {
        var ordem = response.data;

        // preenche o form com os dados do veículo selecionado
        var form = document.getElementById("form-editar");
        var inputs = form.getElementsByTagName("input");
        console.log("AOBAA");
        console.log(form);
        console.log(inputs);
        
        
        form.action = "/ordensdeservico/update/" + ordem.osNum;
        inputs[0].value = ordem.osDataRetirada ? ordem.osDataRetirada : "Data de devolução";
        inputs[1].value = ordem.osKMDevolucao ? ordem.osKMDevolucao : "KM de devolução";
        inputs[2].checked = ordem.osStatus;
    })
})

var deletarBtn = document.getElementById("deletarBtn");
deletarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione alguma ordem para deletar.");
        return;
    }
    window.location.href = "http://localhost:3000/ordensdeservico/delete/" + dados[0];
})
