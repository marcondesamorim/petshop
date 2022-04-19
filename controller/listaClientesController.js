import { clienteService } from "../service/clienteService.js";

const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement("tr");
    const conteudo = `
      <td class="td" data-td>${nome}</td>
                  <td>${email}</td>
                  <td>
                      <ul class="tabela__botoes-controle">
                          <li><a href="../telas/editaCliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                          <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                      </ul>
                  </td> 
                  `;
    linhaNovoCliente.innerHTML = conteudo;
    linhaNovoCliente.dataset.id = id;
    return linhaNovoCliente;
};

const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener("click", async(event) => {
    let ehBotaoDeDeleta =
        event.target.className === "botao-simples botao-simples--excluir";
    if (ehBotaoDeDeleta) {
        try {
            const linhaCliente = event.target.closest("[data-id]");
            let id = linhaCliente.dataset.id;
            await clienteService.removeCliente(id);
            linhaCliente.remove();
        } catch (erro) {
            console.log(erro);
            window.location.href = "../telas/erro.html";
        }
    }
});

const render = async() => {
    try {
        const listaClientes = await clienteService.listaClientes();
        listaClientes.forEach((elemento) => {
            tabela.appendChild(
                criaNovaLinha(elemento.nome, elemento.email, elemento.id)
            );
        });
    } catch (erro) {
        console.log(erro);
        window.location.href = "../telas/erro.html";
    }
};

render();