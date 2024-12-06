

var editarBtn = document.getElementById("editarBtn");
editarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum usuário para editar.");
        return;
    }
    
    // busca os dados do usuário no banco
    axios.get('/usuarios/buscar_um', {
        params: {
            id: dados[0]
        }
    }).then( (response) => {
        var usuario = response.data;

        // preenche o form com os dados do usuário selecionado
        var form = document.getElementById("form-editar");
        var inputs = form.getElementsByTagName("input");
        var selectSetor = document.getElementById("usuarioSetor");

        form.action = "/usuarios/update/" + usuario.usuarioID;
        inputs[0].value = usuario.usuarioLogin;
        inputs[2].checked = usuario.usuarioStatus;
        selectSetor.value = usuario.usuarioDepto;
    })
})

var deletarBtn = document.getElementById("deletarBtn");
deletarBtn.addEventListener("click", () => {
    var dados = capturarDados();
    if (!dados) {
        alert("Por favor selecione algum usuário para deletar.");
        return;
    }
    window.location.href = "http://localhost:3000/usuarios/delete/" + dados[0];
})
