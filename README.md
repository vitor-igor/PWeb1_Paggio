# **Projeto de Programação para Web 1 - Paggio**

## Descrição do Projeto

Este projeto tem como objetivo desenvolver uma aplicação web para leitores acompanharem suas leituras, organizarem bibliotecas pessoais e descobrirem novos livros. O usuário poderá registrar livros lidos, criar metas, escrever resenhas, dar notas, montar listas temáticas e acompanhar o progresso de leitura em tempo real.

Algumas das tecnologias utilizadas serão:

<div align="center">
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" alt="HTML" title="HTML"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png" alt="CSS" title="CSS"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" alt="JavaScript" title="JavaScript"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" alt="Next.js" title="Next.js"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/python.png" alt="Python" title="Python"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/flask.png" alt="Flask" title="Flask"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/sqlite.png" alt="SQLite" title="SQLite"/></code>
</div>

<!-- Icons obtidos do site: https://marwin1991.github.io/profile-technology-icons/ -->

## Integrantes do Grupo

-   Eduardo Brito Oliveira
-   Kaeljane Ferreira da Silva
-   Thatyane Iasmyn Andrade Alves
-   Vitor Igor Lessa da Costa

## Executando o Projeto Localmente
### 1. Clonar o Repositório

Primeiro, clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/vitor-igor/PWeb1_Paggio.git
cd PWeb1_Paggio
```

### 2. Para o Back-End:
#### 2.1. Instalar as Dependências
Execute a linha de comando abaixo para instalação local das dependências presentes no arquivo "requirements.txt" em sua máquina:

```
cd server
pip install -r requirements.txt
```

Ou utilize um ambiente virtual (recomendado):
```
cd server
python -m venv venv

# ativação no Windows
venv\Scripts\activate
# ativação no Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
```

#### 2.2. Criação e Preenchimento do Banco de Dados
Digite os seguintes comandos no terminal para criar o banco de dados:

```
flask shell
>>> db.create_all()
>>> db.session.comit()
>>> exit()
```

Ou execute o arquivo init_db.py.
```
python init_db.py
```
\
Para alimentar o banco de dados com informações de livros, execute o arquivo seed_db.py. Caso deseje adicionar algum livro ou autor específico, edite o arquivo adicionando uma nova chamada da função "import_books(query=' ')".

```
python seed_db.py
```

#### 2.3. Execução do Back-End
Execute o arquivo "app.py".

```
python app.py
```

ou 

```
flask app.py
```

O Back-End irá roda na url "http://127.0.0.1:5000/".

### 3. Para o Front-End:
#### 3.1. Instalar as Dependências
Em outro terminal, para instalar as dependências do Front-End, execute:

```
cd client
npm install
```

#### 3.2. Execução do Front-End
Execute o comando:

```
npm run dev
```

O Front-End irá rodar na url "http://localhost:3000/", mas é necessário abrir no navegador a url "http://127.0.0.1:3000" para a integração com o Back-End.