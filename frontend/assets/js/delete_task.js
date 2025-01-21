let id_task = null;

window.onload = () => {
    //get id_task
    const url = new URL(window.location.href);
    id_task = url.searchParams.get("id_task");

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

            let status = {
                'new': "Nova task",
                'in progress': "Em progresso",
                'canceled': "Cancelada",
                'done': "Concluida",
            };
            document.querySelector("#task_text").textContent = task[0].task_text;
            document.querySelector("#task_status").textContent = status[task[0].task_status];

        })
}

document.querySelector("#btn_Deletar").addEventListener("click", () => {
    fetch(`http://localhost:3000/user/tasks/delete_task/${id_task}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('ERRO!')
            }
        })
    // redirect to homepage
    window.location.href = window.location.origin + "/frontend/index.html";
})
