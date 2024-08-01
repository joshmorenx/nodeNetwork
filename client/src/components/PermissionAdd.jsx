import { Box, Button, TextField } from '@mui/material';
import useAddOrDelPermission from '../hooks/useAddOrDelPermission'
import { useEffect, useState } from 'react';

export default function PermissionAdd({ sendRequestedPermissions }) {
    const [messageContent, setMessageContent] = useState('')
    const [errorContent, setErrorContent] = useState('')
    const { sendRequest, msg, error, success, formData, handleInputChange, setSuccess } = useAddOrDelPermission('add','','',{
        newPermName: '',
        newPermDesc: ''
    })
    const handleSubmit = async() => {
        if (confirm("¿Seguro que quieres crear este permiso?")) {
            sendRequest()
            formData.newPermName = ''
            formData.newPermDesc = ''
        }
    }

    useEffect(() => {
        if(success){
            sendRequestedPermissions()
            setMessageContent(msg)
        }
        setSuccess(false)
    }, [success])

    useEffect(() => {
        if(messageContent){
            alert(messageContent)
        }
        setMessageContent('')
    }, [messageContent])

    useEffect(() => {
        if(error){
            setErrorContent(error)
        }
    }, [error])

    useEffect(() => {
        if(errorContent){
            alert(errorContent)
        }
        setErrorContent('')
    }, [errorContent])

    // useEffect(() => {
    //     console.log(success);
    // }, [success])

    return(
        <>
            <Box className="perm-create-form" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <TextField value={formData.newPermName} 
                size='small'         
                type="text"  
                id="permissionName"
                name="permissionName"
                required
                onChange={handleInputChange} 
                label="Nombre del permiso" 
                variant="outlined" /> */}

                <TextField
                    className='bgx-white'
                    label='Nombre del permiso'
                    type="text"  
                    id="newPermName"
                    name="newPermName"
                    value={formData.newPermName}
                    onChange={handleInputChange}
                />

                <TextField
                    className='bgx-white'
                    sx={{ mt : 4 }}
                    label="Descripcion del permiso"
                    type="text"
                    id="newPermDesc"
                    name="newPermDesc"
                    value={formData.newPermDesc}
                    onChange={handleInputChange}
                />

                {/* <TextField value={formData.newPermDesc} onChange={handleInputChange} sx={{ mt : 4 }} id="permissionDescription" label="Descripción del permiso" variant="outlined" /> */}
                <Button 
                    disabled={ !formData.newPermName || !formData.newPermDesc }
                    type="submit" onClick={handleSubmit}
                    size='large'
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: '200px'}}>
                    Crear permiso
                </Button>
            </Box>
            {/* <p>{ msg ? msg : error }</p> */}
        </>
    )
}