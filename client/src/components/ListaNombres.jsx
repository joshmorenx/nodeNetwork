import PropTypes from 'prop-types';

export default function ListaNombres({ nombres, onSelectChange }) {

  const handleChange = (event) => {
      const selectedValue = event.target.value;
      onSelectChange(selectedValue); // Llama a la función de devolución de llamada en PermissionAssigner
  }

  return (
    <>
      <h2>Lista de usuarios</h2>
      <select onChange={handleChange} name="" id="">
        <option hidden value="">-- Seleccione --</option>
        {nombres.map((nombre, index) => (
          <option key={index}>{nombre}</option>
        ))}
      </select>
    </>
  );
}

ListaNombres.propTypes = {
  nombres: PropTypes.array.isRequired,
  onSelectChange: PropTypes.func.isRequired
}