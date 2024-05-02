import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material/'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function PermissionCreateOrDelete({ ListaPermisos, permissionDetails, handleSelectedChange, PermissionDel, PermissionAdd, token, selectedPermission }) {
    
    return (
        <>
        {/* permission deletion section begins */}
        <Accordion color='primary'>
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
                    <ListaPermisos permissionDetails={ permissionDetails } handleSelectedChange={ handleSelectedChange } />
                </Box>
                <Box>
                    <PermissionDel token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } />
                </Box> 
            </Box>
            </AccordionDetails>
        </Accordion>
        {/* permission deletion section ends */}

        {/* permission creation section begins */}
        <Accordion color='primary'>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ mt: 1, bgcolor: '#faf1de' }}
            >
            <Typography>Crear Permisos</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}> 
            
                <PermissionAdd />
            
            </AccordionDetails>
        </Accordion>
        {/* permission creation section ends */}
        
        </>   
    )  
}
