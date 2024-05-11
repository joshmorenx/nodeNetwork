import ListaNombres from "./ListaNombres"
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material/"
import PermissionDisplayer from "./PermissionDisplayer"


export default function PermissionAssigner({ nombres, handleSelectedChange, token, UserUnassignedPermissions, UserAssignedPermissions, selectedUser, permissionDiff }) {
    return (
        <>
            <Accordion expanded={true} color='primary'>
                <AccordionSummary
                // expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{ mt: 1, bgcolor: '#f9f0ce', cursor: 'default!important' }}
                >
                <Typography>Asignador de Permisos</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#faf1de' }}> 
                    <Box>
                        <ListaNombres nombres={ nombres } handleSelectedChange={handleSelectedChange} />
                    </Box>
                    <Box>
                        <PermissionDisplayer token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />
                    </Box>
                </AccordionDetails>
            </Accordion>   
        </>   
    )    
}