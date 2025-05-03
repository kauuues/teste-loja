import sqlite3

# Conectar/criar banco
conn = sqlite3.connect('loja.db')
cursor = conn.cursor()

# Criar tabela de usuários com os campos certos
cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
)
''')

conn.commit()
conn.close()

print("Tabela criada ou verificada com sucesso.")
