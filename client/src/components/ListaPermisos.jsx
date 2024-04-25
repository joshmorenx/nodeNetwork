import PropTypes from 'prop-types'
import { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material/'

export default function ListaPermisos({ permissionDetails, handleSelectedChange }) { //provissionel parameters for this function
    const [selectedValue, setSelectedValue] = useState('');
    const handlingSelectedChange = (event) => {
        const value = event.target.value
        setSelectedValue(value)
        handleSelectedChange(value, 'permission')
    }

    return (
        <div>
            <h2 className='mt-5 text-2xl'>Lista de permisos</h2>
            {/* <select style={{ fontSize: '1.5vw', border: '1px solid black', borderRadius: '5px' }} className='mb-5 w-full text-center h-10 bg-transparent' onChange={handlingSelectedChange} name="" id="">
                <option hidden value="">-- Seleccione --</option>
                {permissionDetails.map((permiso, index) => (
                    <option key={index}>{permiso.permissionId+" : "+permiso.permissionName}</option>
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
                    {permissionDetails.map((elem, index)=>{
                        return (<MenuItem key={index} value={elem.permissionId+" : "+elem.permissionName}>{elem.permissionId+" : "+elem.permissionName}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

ListaPermisos.propTypes = {
    permissionDetails: PropTypes.array.isRequired,
    handleSelectedChange: PropTypes.func.isRequired
}