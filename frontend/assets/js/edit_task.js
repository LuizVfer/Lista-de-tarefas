let id_task = null;

window.onload = () => {
    //get id_task
    const url = new URL(window.location.href);
    id_task = url.searchParams.get("id_task");
    console.log(id_task);

    //get task data
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('ERRO!')
            }
        })
        .then(task => {
            document.querySelector("#text_task_text").value = task[0].task_text;
        })
}

document.querySelector("#btn_atualizar").addEventListener("click", () => {
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
    //update task in database
    fetch(`http://localhost:3000/user/tasks/update_task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_task, task_text })
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
})