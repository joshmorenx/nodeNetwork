import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default function PermissionDescriptionDetails({ token, selectedPermission, permissionDetails }) {
    
    const [auxP, setAuxP] = useState([])
    let [permDesc, setPermDesc] = useState('')

    const handleSubmit = (id, newDesc) => {
        console.log(id, newDesc);
    }

    useEffect(() => {
        setAuxP(selectedPermission.split(" : "))
    }, [selectedPermission])

    useEffect(() => {
        if(permissionDetails[auxP[0]-1] !== undefined){
            // console.log(permissionDetails[auxP[0]-1].permissionDescription);
            setPermDesc(permissionDetails[auxP[0]-1].permissionDescription)
        }
    }, [auxP])

    // console.log(permDesc);

    return (
        <div>
            <h1>Descripción del permiso</h1>
            <TextField
                id=""
                label=""
                value={ permDesc }
                onChange={ (e) => setPermDesc(e.target.value) }
                sx={{ width: '100%', height: '100%', bgcolor: '#f0f0f0' }}
                
            />
            <Button onClick={ () => handleSubmit(auxP[0], permDesc) } size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                Guardar Cambios 
            </Button>
            <p>aun falta la funcionalidad del boton de guardar</p>
        </div>
    )
}