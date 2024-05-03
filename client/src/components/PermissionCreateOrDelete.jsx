import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material/'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect } from 'react';

export default function PermissionCreateOrDelete({ ListaPermisos, permissionDetails, handleSelectedChange, PermissionDeletion, PermissionAdd, token, selectedPermission, setDelBtnClicked, sendRequestedPermissions, delBtnClicked }) {
    
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
                    <ListaPermisos permissionDetails={ permissionDetails } handleSelectedChange={ handleSelectedChange } delBtnClicked={ delBtnClicked } sendRequestedPermissions={ sendRequestedPermissions } />
                </Box>
                <Box>
                    <PermissionDeletion token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } setDelBtnClicked={ setDelBtnClicked } delBtnClicked={ delBtnClicked }/>
                </Box> 
            </Box>
            </AccordionDetails>
        </Accordion>
        {/* permission deletion section ends */}
        
        </>   
    )  
}
