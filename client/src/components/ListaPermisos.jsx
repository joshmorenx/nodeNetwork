import PropTypes from 'prop-types'

export default function ListaPermisos({ permissionDetails, handleSelectedChange }) { //provissionel parameters for this function
    const handlingSelectedChange = (event) => {
        handleSelectedChange(event.target.value, 'permission')
    }

    return (
        <div>
            <h2 className='mt-5 text-2xl'>Lista de permisos</h2>
            <select style={{ fontSize: '1.5vw', border: '1px solid black', borderRadius: '5px' }} className='mb-5 w-full text-center h-10 bg-transparent' onChange={handlingSelectedChange} name="" id="">
                <option hidden value="">-- Seleccione --</option>
                {permissionDetails.map((permiso, index) => (
                    <option key={index}>{permiso.permissionId+" : "+permiso.permissionName}</option>
                ))}
            </select>
        </div>
    )
}

ListaPermisos.propTypes = {
    permissionDetails: PropTypes.array.isRequired,
    handleSelectedChange: PropTypes.func.isRequired
}