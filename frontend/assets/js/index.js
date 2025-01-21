let id_user = 1; // Defina o id_user globalmente

window.onload = () => {
    get_username(id_user);
    get_user_tasks(id_user);
};

let colors = [
    { task_status: "new", select_bg_color: "bg-white" },
    { task_status: "in progress", select_bg_color: "bg-info" },
    { task_status: "canceled", select_bg_color: "bg-danger" },
    { task_status: "done", select_bg_color: "bg-success" }
];

function get_username(id_user) {
    fetch(`http://localhost:3000/user/${id_user}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Error fetching username");
            }
        })
        .then(dados => {
            if (dados.length === 0) {
                console.log("No user found");
            } else {
                document.querySelector("#username").textContent = dados[0].username;
            }
        })
        .catch(error => {
            console.log("Fetch error: ", error);
        });
}

function get_user_tasks(id_user, status = "all") {
    fetch(`http://localhost:3000/user/${id_user}/tasks/${status}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Error fetching tasks");
            }
        })
        .then(tarefas => {
            if (tarefas.length === 0) {
                document.querySelector("#no_tasks").classList.remove("d-none");
                document.querySelector("#total_tasks").classList.add("d-none");
            } else {
                document.querySelector("#tasks_container").innerHTML = null;

                tarefas.forEach(tarefa => {
                    let color = colors.find(item => item.task_status === tarefa.task_status);

                    let html = `
                    <div class="col-12 border-primary border rounded p-3 shadow">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="d-flex align-items-center">
                                    <H5 class="me-2 text-info"><i class="fa-solid fa-circle-chevron-right"></i></H5>
                                    <h5>${tarefa.task_text}</h5>
                                </div>
                            </div>
                            <div class="col-2">
                                <select id="task_status_${tarefa.id}" onchange="change_task_status(${tarefa.id})" class="form-select p-1 ${color.select_bg_color}">
                                    <option value="new" ${tarefa.task_status == "new" ? "selected" : ""}>New</option>
                                    <option value="in progress" ${tarefa.task_status == "in progress" ? "selected" : ""}>In progress</option>
                                    <option value="canceled" ${tarefa.task_status == "canceled" ? "selected" : ""}>Canceled</option>
                                    <option value="done" ${tarefa.task_status == "done" ? "selected" : ""}>Done</option>
                                </select>
                            </div>
                            <div class="col-1 text-end"><span class="edit_link" onclick="edit_task(${tarefa.id})"><i class="fa-regular fa-pen-to-square me-2"></i>Edit</span></div>
                            <div class="col-1 text-end"><span class="delete_link" onclick="delete_task(${tarefa.id})"><i class="fa-regular fa-trash-can me-2"></i>Delete</span></div>
                        </div>
                    </div>`;

                    let new_task = document.createElement("div");
                    new_task.classList.add("row", "mb-3");
                    new_task.innerHTML = html;

                    document.querySelector("#tasks_container").appendChild(new_task);
                });

                document.querySelector("#no_tasks").classList.add("d-none");
                document.querySelector("#total_tasks").classList.remove("d-none");
                document.querySelector("#total_tasks > div > h4 > span").textContent = tarefas.length;
            }
        })
        .catch(error => {
            console.log("Fetch error: ", error);
        });
}

function edit_task(id_task) {
    const url = window.location.origin + "/frontend/edit_task.html?id_task=" + id_task;
    window.location.href = url;
}

function delete_task(id_task) {
    const url = window.location.origin + "/frontend/delete_task.html?id_task=" + id_task;
    window.location.href = url;
}

function change_task_status(id_task) {
    let status = document.querySelector("#task_status_" + id_task).value;

    console.log(`Updating task ${id_task} to status ${status}`);

    fetch(`http://localhost:3000/user/${id_user}/tasks/update_status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_task, status })
    })
        .then(response => {
            if (response.status === 200) {
                console.log("Task status updated successfully.");
            } else {
                console.log("Error updating task status.");
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => {
            console.log("Fetch error: ", error);
        });

    //update select color baser on task status

    let color_obj = colors.find(e => e.task_status == status);
    let select = document.querySelector(`#task_status_${id_task}`)
    let colors_tmp = colors.map(c => { return c.select_bg_color })
    select.classList.remove(...colors_tmp)
    select.classList.add(color_obj.select_bg_color);
}

document.querySelector("#btn_new_task").addEventListener("click", () => {

    const url = window.location.origin + "/frontend/new_task.html?id_user=" + id_user;
    window.location.href = url;
});

document.querySelector("#select_filter").addEventListener("change", () => {
    let task_status = document.querySelector("#select_filter").value;
    get_user_tasks(id_user, task_status)


})