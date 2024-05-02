import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, FormControl, FormLabel, FormHelperText, InputLabel, Input, MenuItem, Select, TextField, Button } from '@mui/material/'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function PermissionCreateOrDelete({ ListaPermisos, permissionDetails, handleSelectedChange, PermissionAddOrDel, token, selectedPermission }) {
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
                    <PermissionAddOrDel token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } />
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
                <FormControl fullWidth>
                    <TextField sx={{ mt : 4 }} id="permissionName" label="Nombre del permiso" variant="outlined" />
                    <TextField sx={{ mt : 4 }} id="permissionDescription" label="Descripción del permiso" variant="outlined" />
                    <Button size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                        Crear permiso
                    </Button>
                </FormControl>                
            </AccordionDetails>
        </Accordion>
        {/* permission creation section ends */}
        
        </>   
    )  
}
