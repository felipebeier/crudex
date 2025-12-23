// Seleciona o contêiner onde os dados serão exibidos - GET
const BASE_URL = "https://crudcrud.com/api/24e01148e91249ac9b06b79da9f14d97/cadastro";
const tableContainer = document.getElementById("table-container");

fetch(BASE_URL)
    .then((response) => response.json())
    .then((datausers) => {
        // Opcional: Limpa o conteúdo estático que está no HTML antes de listar os novos
        tableContainer.innerHTML = ""; 

        datausers.forEach(cadastro => {
            const p = document.createElement("p");
            p.innerHTML = `${cadastro.nome} - ${cadastro['e-mail']} <button onclick="deleteUser('${cadastro._id}')">X</button>`;
            
            // CORREÇÃO: Anexa o parágrafo ao elemento do DOM, não ao objeto da API
            tableContainer.appendChild(p);
        });
    })
    .catch(error => console.error("Erro ao buscar dados:", error));

// Adicionar um novo usuario - POST
document.getElementById("cadastroForm").addEventListener("submit", (e) =>{
    e.preventDefault(); // Evita o comportamento padrão do formulário
    const nome = document.getElementById("nome").value;
    const emailValue = document.getElementById("email").value;

    fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            nome: nome,
            "e-mail": emailValue
        })  
    })
    .then(response => response.json())
    .then((cadastro)=>{
        const p = document.createElement("p");
        p.innerHTML = `${cadastro.nome} - ${cadastro['e-mail']} <button onclick="deleteUser('${cadastro._id}')">X</button>`;
        tableContainer.appendChild(p);
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
})
//remover usuario - DELETE
function deleteUser(id) {
    fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"})
    .then(response => {
        if (response.ok) {
            // Se deu certo na API, recarregamos a lista para atualizar a tela
            alert("Usuário deletado!");
            location.reload(); // Forma mais simples de atualizar a lista
        }
    })
    .catch(error => console.error("Erro ao deletar usuário:", error));

    }
