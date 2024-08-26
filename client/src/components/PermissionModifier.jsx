import PropTypes from 'prop-types'
import ListaPermisos from "./ListaPermisos"
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material/"
import PermissionDescriptionDetails from "./PermissionDescriptionDetails"
import { useSelector } from 'react-redux'

export default function PermissionModifier({ permissionDetails, handleSelectedChange, token, selectedPermission }) { //provissionel parameters for this function
    const className = useSelector((state) => state.className);
    return (
        <>
            <Accordion expanded={true} color='primary'>
                <AccordionSummary
                // expandIcon={<ArrowDropDownIcon />}
                className={className}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{ mt: 1, bgcolor: '#f9f0ce', cursor: 'default!important' }}
                >
                <Typography>Modificar detalles de permisos</Typography>
                </AccordionSummary>
                <AccordionDetails className={className} sx={{ bgcolor: '#faf1de' }}> 
                    <Box>
                        <ListaPermisos permissionDetails={ permissionDetails } handleSelectedChange={ handleSelectedChange } />
                    </Box>
                    <Box>
                        <PermissionDescriptionDetails token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } />
                    </Box>
                </AccordionDetails>
            </Accordion>   
        </>   
    )  
}

PermissionModifier.propTypes = {
    permissionDetails: PropTypes.array.isRequired,
    handleSelectedChange: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    selectedPermission: PropTypes.string
}