export default function FilterSearch() {
  return (
    <div className="bg-branco-100 text-preto-100 flex h-100 w-50 flex-col items-center justify-center rounded filter">
      <div className="items-start">
        <h1>Filtros</h1>

        <div className="flex gap-2">
          <input type="radio" name="Ficção" value="Ficção" />
          <label>Ficção</label>
        </div>

        <div className="flex gap-2">
          <input type="radio" name="Fantasia" value="Fantasia" />
          <label>Fantasia</label>
        </div>

        <div className="flex gap-2">
          <input type="radio" name="Romance" value="Romance" />
          <label>Romance</label>
        </div>

        <div className="flex gap-2">
          <input type="radio" name="Distopia" value="Distopia" />
          <label>Distopia</label>
        </div>
      </div>

      <h1 className="pt-20">WORK IN PROGRESS</h1>
    </div>
  );
}
