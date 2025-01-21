# LISTA DE TAREFAS

Uma aplicaçao fronted com HTML, CSS e JS puro para gerir tarefas
No backend vamos ter uma API NodeJS + Express + MySQL para servir o frontend

# BASE DE DADOS
     
    user
        id
        username
        password
        created_at
        updated-at
    
    tasks
        id
        id_user
        task_text
        task_status(new | in progress | canceled | done)
        created_at
        updated-at

# TAREDAS A DESENVOLVER NO PROJETO
    FEITO > criar a estrutura inicial
       -base do frontend (html css js | bootstrap)
       -base do backend (node + express + mysql) com uma resposta padrão

    > no frontend
       - páginas necessárias para a navegação na nossa app.
       - pequenos testes de comunicação entre front e backend - utilização de Ajax (XMLhttprequest | fetch API)

    FEITO-estrura base de cada página
       bootstrap (slate) bootswatch
       fontawesome

    FEITO- ver tarefas
        titulo
        filto para escolher que tarefas queremos ver (select)
        botao para adicionar tarefas
        (mensagem sobre o facto de não existirem tarefas)
        caixa para tarefas
            -possibilidade de alterar status, editar tarefas e eliminar tarefa
        parágrafo com o total de tarefas disponiveis (de acordo com o filtro)

    FEITO - adicionar tarefa
        input: text com o texto da tarefa
        botão para cancelar
        botão para submeter tarefa

    FEITO -editar tarefa
        input: text para editrar texto da tarefa
        botão para cancelar
        botão para submeter alteração

    Backend
    criar um servidor NodeJS + Express + MySQL
    criar um endpoint inicial - testar comunicaçoes
    
    (eliminar será feito com uma modal)