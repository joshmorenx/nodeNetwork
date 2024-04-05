import PropTypes from 'prop-types';

function ListaNombres({ nombres }) {
  return (
    <>
      <h2>Lista de usuarios</h2>
      <select name="" id="">
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
}

export default ListaNombres;