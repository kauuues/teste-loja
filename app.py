from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'chave_super_secreta'

# Banco de dados fictício
usuarios = {}

@app.route('/')
def index():
    return render_template('index.html', usuario=session.get('usuario'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']

        conn = sqlite3.connect('loja.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM usuarios WHERE email = ? AND senha = ?', (email, senha))
        usuario = cursor.fetchone()
        conn.close()

        if usuario:
            session['usuario'] = usuario[1]  # Nome do usuário
            return redirect(url_for('index'))
        else:
            return 'Login inválido'

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']

        conn = sqlite3.connect('loja.db')
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', (nome, email, senha))
            conn.commit()
        except sqlite3.IntegrityError:
            conn.close()
            return 'Email já cadastrado!'
        conn.close()
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect(url_for('index'))

@app.route('/sobre')
def sobre():
    return render_template('sobre.html', usuario=session.get('usuario'))

@app.route('/politica')
def politica():
    return render_template('politica.html', usuario=session.get('usuario'))

@app.route('/carrinho')
def carrinho():
    if 'usuario' not in session:
        return redirect(url_for('login'))
    return render_template('carrinho.html', usuario=session.get('usuario'))

@app.route('/pagamento', methods=['GET', 'POST'])
def pagamento():
    if request.method == 'POST':
        # Simulando o processo de pagamento
        # Aqui você pode fazer a lógica do pagamento e salvar no banco de dados, por exemplo.
        return redirect(url_for('confirmar_pagamento'))  # Redireciona para a página de confirmação

    return render_template('pagamento.html')

@app.route('/confirmar_pagamento', methods=['POST'])
def confirmar_pagamento():
    dados = {
        'endereco': request.form.get('endereco'),
        'numero': request.form.get('numero'),
        'estado': request.form.get('estado'),
        'cep': request.form.get('cep'),
        'nome': request.form.get('nome'),
        'numero_cartao': request.form.get('numero_cartao'),
        'validade': request.form.get('validade'),
        'cvv': request.form.get('cvv')
    }
    return render_template('confirmar_pagamento.html', **dados, usuario=session.get('usuario'))


@app.route('/recuperar_senha', methods=['GET', 'POST'])
def recuperar_senha():
    if request.method == 'POST':
        email = request.form['email']
        conn = sqlite3.connect('loja.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM usuarios WHERE email = ?', (email,))
        usuario = cursor.fetchone()
        conn.close()
        if usuario:
            return render_template('recuperar_senha_confirmacao.html', email=email)
        else:
            return 'E-mail não encontrado.'
    return render_template('recuperar_senha.html')

@app.route('/confirmar_recuperacao', methods=['POST'])
def confirmar_recuperacao():
    email = request.form['email']
    nova_senha = request.form['nova_senha']
    senha_confirmacao = request.form['senha_confirmacao']

    if nova_senha != senha_confirmacao:
        return 'As senhas não coincidem.'

    conn = sqlite3.connect('loja.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE usuarios SET senha = ? WHERE email = ?', (nova_senha, email))
    conn.commit()
    conn.close()

    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
