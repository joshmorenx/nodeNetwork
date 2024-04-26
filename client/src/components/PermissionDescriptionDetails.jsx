import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import useUpdatePermissionDetails from '../hooks/useUpdatePermissionDetails'
// import useGetPermissionDescription from '../hooks/useGetPermissionDescription'

export default function PermissionDescriptionDetails({ token, selectedPermission, permissionDetails }) {
    
    const [auxP, setAuxP] = useState([])
    let [permDesc, setPermDesc] = useState('')
    const { sendRequest, msg, error, success } = useUpdatePermissionDetails(auxP[0], permDesc)
    // const { permissionDescription } = useGetPermissionDescription(1)

    // console.log(permissionDescription);
    const handleSubmit = () => {
        sendRequest()
        // console.log(id, newDesc);
    }

    useEffect(() => {
        if(selectedPermission !== '') setAuxP(selectedPermission.split(" : "))
    }, [selectedPermission])

    useEffect(() => {
        if(selectedPermission === '') setPermDesc('')
        else if(permissionDetails[auxP[0]-1] !== undefined){
            // console.log(permissionDetails[auxP[0]-1].permissionDescription);
            setPermDesc(permissionDetails[auxP[0]-1].permissionDescription)
        }
    }, [auxP])

    // console.log(permDesc);

    return (
        <div onLoad={ () => setPermDesc('')}>
            <h1>Descripción del permiso</h1>
            <TextField
                id=""
                label=""
                value={ permDesc }
                onChange={ (e) => setPermDesc(e.target.value) }
                sx={{ width: '100%', height: '100%', bgcolor: '#f0f0f0' }}/>

            <Button onClick={ handleSubmit } size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                Guardar Cambios 
            </Button>
            <p>{ msg ? msg : '' }</p>
        </div>
    )
}