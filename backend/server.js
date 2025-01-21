const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// OPCOES DE CONEXAO COM O MYSQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1819',
    database: 'bd_task'
});

const app = express();
app.listen(3000, () => {
    console.log('Servidor rodando');
});

app.use(cors());
app.use(express.json());

//rotas

app.get('/', (req, res) => {
    connection.query("SELECT COUNT(*) AS users FROM users", (err, results) => {
        if (err) {
            console.error("MySQL connection error:", err);
            return res.status(500).send("MySQL connection error.");
        }
        res.send("MySQL connection ok.");
    });
});

app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            console.error("MySQL query error:", err);
            return res.status(500).send("MySQL query error.");
        }
        res.json(results);
    });
});


app.get("/user/:id/tasks/:status", (req, res) => {
    if (req.params.status !== "all") {
        connection.query("SELECT * FROM tasks WHERE id_user = ? AND task_status = ?", [req.params.id, req.params.status], (err, results) => {
            if (err) {
                console.error("MySQL query error:", err);
                return res.status(500).send("MySQL query error.");
            }
            res.json(results);
        })
    } else {
        connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
            if (err) {
                console.error("MySQL query error:", err);
                return res.status(500).send("MySQL query error.");
            }
            res.json(results);
        })

    }
});


app.post("/user/:id/tasks/update_status", (req, res) => {
    const { id_task, status } = req.body;
    const userId = req.params.id;

    if (!id_task || !status) {
        return res.status(400).send("Missing id_task or status in request body.");
    }

    connection.query(
        "UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ? AND id_user = ?",
        [status, id_task, userId],
        (err, results) => {
            if (err) {
                console.error("MySQL query error:", err);
                return res.status(500).send("MySQL query error.");
            }
            res.json("Task status updated successfully.");
        }
    );
});

app.post("/user/:id/tasks/new_task", (req, res) => {
    const { id_user, task_text } = req.body;

    if (!id_user || !task_text) {
        return res.status(400).send("Missing id_user or task_text in request body.");
    }

    connection.query("INSERT INTO tasks (id_user, task_text, task_status, created_at, updated_at) VALUES (?, ?, 'new', NOW(), NOW())", [id_user, task_text], (err, results) => {
        if (err) {
            console.error("MySQL query error:", err);
            return res.status(500).send("MySQL connection error.");
        }
        res.json("Task created successfully.");
    });

});


app.get("/user/tasks/get_task/:id_task", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id = ?", [req.params.id_task], (err, results) => {
        if (err) {
            console.error("MySQL query error:", err);
            return res.status(500).send("MySQL query error.");
        }
        res.json(results);
    });
});

app.post("/user/tasks/update_task", (req, res) => {
    const { id_task, task_text } = req.body;

    if (!id_task || !task_text) {
        return res.status(400).send("Missing id_user or task_text in request body.");
    }

    connection.query("UPDATE tasks SET task_text = ?, updated_at = NOW() WHERE id = ?", [req.body.task_text, req.body.id_task], (err, results) => {
        if (err) {
            console.error("MySQL query error:", err);
            return res.status(500).send("MySQL connection error.");
        }
        res.json("Task created successfully.");
    });

});


app.get("/user/tasks/delete_task/:id_task", (req, res) => {
    connection.query("DELETE FROM tasks WHERE id = ?", [req.params.id_task], (err, results) => {
        if (err) {
            console.error("MySQL query error:", err);
            return res.status(500).send("MySQL query error.");
        }
        res.json("Task deleted successfully.");
    });
});