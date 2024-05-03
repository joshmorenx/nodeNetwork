import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material/'

export default function ListaPermisos({ permissionDetails, handleSelectedChange, delBtnClicked, sendRequestedPermissions }) {
    const [selectedValue, setSelectedValue] = useState('');
    const handlingSelectedChange = (event) => {
        const value = event.target.value
        setSelectedValue(value)
        handleSelectedChange(value, 'permission')
    }

    useEffect(() => {
        if(delBtnClicked) {
            setSelectedValue('')
            sendRequestedPermissions() //it's refreshing the permission details but it's delayed
        }
    }, [delBtnClicked,permissionDetails])

    return (
        <div>
            <h2 className='mt-5 text-2xl'>Lista de permisos</h2>
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