import PropTypes from 'prop-types'

export default function ListaPermisos({ handleSelectedChange }) { //provissionel parameters for this function
    const handlingSelectedChange = (event) => {
        handleSelectedChange(event.target.value)
    }
    let permisosEjemplo = [
        {
            id: 1,
            description: 'Administrador'
        },
        {
            id: 2,
            description: 'Moderador'
        },
        {
            id: 3,
            description: 'Usuario'
        }
    ]

    return (
        <div>
            {/* <p>Permission Modifier (WIP)</p> */}
            <h2 className='mt-5 text-2xl'>Lista de permisos</h2>
            <select style={{ fontSize: '1.5vw', border: '1px solid black', borderRadius: '5px' }} className='w-full text-center h-10 bg-transparent' onChange={handlingSelectedChange} name="" id="">
                <option hidden value="">-- Seleccione --</option>
                {permisosEjemplo.map((permiso, index) => (
                    <option key={index}>{permiso.description}</option>
                ))}
            </select>
        </div>
    )
}

ListaPermisos.propTypes = {
    handleSelectedChange: PropTypes.func.isRequired
}