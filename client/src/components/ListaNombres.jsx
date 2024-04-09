import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function ListaNombres({ nombres, handleSelectedChange }) {
  const handlingSelectedChange = (event) => {
    handleSelectedChange(event.target.value)
  }  

  return (
    <>
      <h2 className='mt-5 text-2xl'>Lista de usuarios</h2>
      <select onChange={handlingSelectedChange} name="" id="">
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