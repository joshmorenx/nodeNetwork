import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import useUpdatePermissionDetails from '../hooks/useUpdatePermissionDetails'
import useGetPermissionDescription from '../hooks/useGetPermissionDescription'
import { Typography } from '@mui/material'

export default function PermissionDescriptionDetails({ token, selectedPermission, permissionDetails }) {

    const [auxP, setAuxP] = useState([])
    let [permDesc, setPermDesc] = useState('')
    const { sendRequest, msg, error, success } = useUpdatePermissionDetails({ token, id: auxP[0], newDescription: permDesc })
    const { permissionDescription } = useGetPermissionDescription({ token, id: auxP[0] })


    // console.log(permissionDescription);
    const handleSubmit = () => {
        sendRequest()
    }

    useEffect(() => {
        if (selectedPermission !== '') setAuxP(selectedPermission.split(" : "))
    }, [selectedPermission])

    useEffect(() => {
        // console.log(permissionDetails[auxP[0]-1].permissionDescription);
        // setPermDesc(permissionDetails[auxP[0]-1].permissionDescription)
        if (permissionDescription) setPermDesc(permissionDescription)
    }, [auxP, permissionDescription])

    // console.log(permDesc);

    return (
        <div>
            <Typography>Descripción del permiso</Typography>
            <TextField
                id=""
                label=""
                value={permDesc && permDesc}
                onChange={(e) => setPermDesc(e.target.value)}
                sx={{ width: '100%', height: '100%', bgcolor: '#f0f0f0' }} />

            <Button disabled={!permDesc} onClick={handleSubmit} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                Guardar Cambios
            </Button>
            <p>{msg ? msg : ''}</p>
        </div>
    )
}