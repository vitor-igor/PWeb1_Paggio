import requests

from .models import db, Author, Book, Genre, Authors_in_Book, Genres_in_Book

# Função para inserir author no BD (caso não exista) e instanciar o relacionamento entre book e author
def insert_author(info, book):
    """Inserir author no BD (caso não exista) e instanciar o relacionamento entre book e author"""

    for name_author in info.get("authors", []):
        author = Author.query.filter_by(name=name_author).first()
        if not author:
            author = Author(name=name_author)
            db.session.add(author)
            db.session.flush()
        db.session.add(Authors_in_Book(id_book=book.id, id_author=author.id))

# Função para inserir genre no BD (caso não exista) e instanciar o relacionamento entre book e genre
def insert_genre(info, book):
    """Inserir genre no BD (caso não exista) e instanciar o relacionamento entre book e genre"""

    for name_genre in info.get("categories", []):
        genre = Genre.query.filter_by(name=name_genre).first()
        if not genre:
            genre = Genre(name=name_genre)
            db.session.add(genre)
            db.session.flush()
        db.session.add(Genres_in_Book(id_book=book.id, id_genre=genre.id))

    db.session.commit()

# Função para inserir book no BD (caso não exista)
def insert_book(volume):
    """Inserir book no BD (caso não exista)"""

    info = volume.get("volumeInfo", {})

    title = info.get("title", "Sem título")
    published_date = info.get("publishedDate", "")[:10]
    description = info.get("description", "Sem descrição")
    isbn = next((id["identifier"] for id in info.get("industryIdentifiers", []) if id["type"] == "ISBN_13"), "0000000000000")
    pages = info.get("pageCount", 0)
    language = info.get("language", "--")
    image = info.get("imageLinks", {}).get("thumbnail", "")

    if Book.query.filter_by(isbn=isbn).first():
        return # já existe, não insere de novo

    book = Book(
        title=title,
        published_date=published_date,
        description=description,
        isbn=isbn,
        pages=pages,
        language=language,
        image=image
    )
    db.session.add(book)
    db.session.flush()

    insert_author(info, book)

    insert_genre(info, book)

# Função que busca dados da API GoogleBooks de acordo com uma query informada e, através da fnção 'insert_book', adiciona-os no BD
def import_books(query="ficcao", total=60):
    """Busca dados da API GoogleBooks de acordo com uma query informada e, através da fnção 'insert_book', adiciona-os no BD"""

    max_por_lote = 40
    print(f"Buscando {total} livros de {query}...")

    for start in range(0, total, max_por_lote):
        url = f"https://www.googleapis.com/books/v1/volumes?q={query}&startIndex={start}&maxResults={max_por_lote}"
        res = requests.get(url)
        data = res.json()
        items = data.get("items", [])
        try:
            for volume in items:
                insert_book(volume)
        except Exception as e:
            print(f"Erro ao buscar ou inserir livros: {e}")
