
let id_user = null;

window.onload = () => {
    //get id_user
    const url = new URL(window.location.href);
    id_user = url.searchParams.get("id_user");

    // Adicionar event listener ao botão após o DOM estar completamente carregado
    document.querySelector("#btn_guardar").addEventListener("click", () => {
        let task_text = document.querySelector("#text_task_text").value;
        let error = document.querySelector("#error");

        if (task_text == null || task_text == "") {
            error.textContent = "Preencha o campo de texto.";
            error.classList.remove("d-none");
            return;
        }

        if (task_text.length > 100) {
            error.textContent = "O texto deve ter menos de 200 caracteres.";
            error.classList.remove("d-none");
            return;
        }
        // Enviar a requisição POST para criar a nova tarefa
        fetch(`http://localhost:3000/user/${id_user}/tasks/new_task`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_user, task_text })
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("Task created successfully.");
                    // Redirecionar para a página principal ou exibir uma mensagem de sucesso
                } else {
                    console.log("Error creating task.");
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .catch(error => {
                console.log("Fetch error: ", error);
            });
        // redirect to homepage
        window.location.href = window.location.origin + "/frontend/index.html";
    }
    )
};


