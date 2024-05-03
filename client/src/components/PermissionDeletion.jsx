import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import useAddOrDelPermission from '../hooks/useAddOrDelPermission'

export default function PermissionDeletion({ token, selectedPermission, permissionDetails, setDelBtnClicked }) {
    
    const [auxP, setAuxP] = useState([])
    let [permDesc, setPermDesc] = useState('')

    const { sendRequest, msg, error, success, usersThatUseThisPermission } = useAddOrDelPermission('remove', auxP[0], auxP[1])

    // console.log(permissionDescription);
    const handleSubmit = () => {
        sendRequest()
        selectedPermission = ''
        setDelBtnClicked(true)
        // console.log(auxP[1]);
    }

    useEffect(() => {
        if(selectedPermission !== '') setAuxP(selectedPermission.split(" : "))
    }, [selectedPermission])

    return (
        <div>
            <Button disabled={ selectedPermission == '' } onClick={ handleSubmit } size='large' variant="contained" color="error" sx={{ mt: 2 }}>
                Eliminar
            </Button>
            <p>{ msg ? msg : '' }</p>
            <p>{ error ? error.message : '' }</p>
            <p>{ success ? success : '' }</p>   
            { usersThatUseThisPermission && usersThatUseThisPermission.length > 0 ? usersThatUseThisPermission.map((user,index) => <p key={index}>{user}</p>) : '' }
        </div>
    )
}