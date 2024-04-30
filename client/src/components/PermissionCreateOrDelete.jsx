import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'


export default function PermissionCreateOrDelete({ ListaPermisos, permissionDetails, handleSelectedChange, PermissionAddOrDel, token, selectedPermission }) {
    return (
        <>
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

        <Accordion color='primary'>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ mt: 2, bgcolor: '#faf1de' }}
            >
            <Typography>Crear Permisos</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}>
            <Box>
                <FormControl>
                    <FormLabel></FormLabel>
                    <Typography variant="body1" color="initial">WORK IN PROGRESS</Typography>
                    <FormHelperText></FormHelperText>
                </FormControl>
            </Box>
            </AccordionDetails>
        </Accordion>
        
        </>   
    )  
}
