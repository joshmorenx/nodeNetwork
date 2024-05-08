import PermissionAdd from './PermissionAdd';
import ListaPermisos from './ListaPermisos';
import PermissionDeletion from './PermissionDeletion';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material/'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';

export default function PermissionCreateOrDelete({ permissionDetails, handleSelectedChange, token, selectedPermission, setDelBtnClicked, sendRequestedPermissions, delBtnClicked }) {
    const [succeed, setSucceed] = useState(false)
    const [gatheredValue, setGatheredValue] = useState('')
    
    const gatherSuccess = (success) => {
        setSucceed(success)
    }

    const gatherSelectedValue = (value) => {
        setGatheredValue(value)
    }

    return (
        <>

        {/* permission creation section begins */}
        <Accordion defaultExpanded={true} color='primary'>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ mt: 1, bgcolor: '#faf1de' }}
            >
            <Typography>Crear Permisos</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}> 
            
                <PermissionAdd sendRequestedPermissions={ sendRequestedPermissions } />
            
            </AccordionDetails>
        </Accordion>
        {/* permission creation section ends */}

        {/* permission deletion section begins */}
        <Accordion defaultExpanded={true} color='primary'>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ mt: 2, bgcolor: '#faf1de' }}
            >
            <Typography>Eliminar Permisos</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}>
            <Box>
                <Box>
                    <ListaPermisos permissionDetails={ permissionDetails } handleSelectedChange={ handleSelectedChange } delBtnClicked={ delBtnClicked } sendRequestedPermissions={ sendRequestedPermissions } succeed={ succeed } setSucceed={ setSucceed } gatherSelectedValue={ gatherSelectedValue }/>
                </Box>
                <Box>
                    <PermissionDeletion token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } setDelBtnClicked={ setDelBtnClicked } delBtnClicked={ delBtnClicked } gatherSuccess={ gatherSuccess } gatheredValue={ gatheredValue }/>
                </Box> 
            </Box>
            </AccordionDetails>
        </Accordion>
        {/* permission deletion section ends */}
        
        </>   
    )  
}
