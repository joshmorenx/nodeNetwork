import { useState } from 'react'
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material/'
// import { useState, useEffect } from 'react';

export default function ListaNombres({ nombres, handleSelectedChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handlingSelectedChange = (event) => {
    const value = event.target.value
    setSelectedValue(value)
    handleSelectedChange(value,'user')
  }

  const nombresOrdenados = nombres.slice().sort()

  return (
    <>
      <h2 className='mt-5 text-2xl'>Lista de usuarios</h2>
      {/* <select style={{ fontSize: '1.5vw', border: '1px solid black', borderRadius: '5px' }} className='w-full text-center h-10 bg-transparent' onChange={handlingSelectedChange} name="" id="">
        <option hidden value="">-- Seleccione --</option>
        {nombresOrdenados.map((nombre, index) => (
          <option key={index}>{nombre}</option>
        ))}
      </select> */}
      <FormControl fullWidth sx={{ mb: 2, mt: 2, minWidth: 120 }}>
          <InputLabel id="permission-select-label">Seleccione</InputLabel>
          <Select
              labelId="permission-select-label"
              id="permission-select"
              label="Seleccione"
              value={selectedValue}
              onChange={handlingSelectedChange}
          >
              {nombresOrdenados.map((nombre, index) => (
                <MenuItem key={index} value={nombre}>{nombre}</MenuItem>
              ))}
          </Select>
      </FormControl>
    </>
  );
}

ListaNombres.propTypes = {
  nombres: PropTypes.array.isRequired,
  handleSelectedChange: PropTypes.func.isRequired
}