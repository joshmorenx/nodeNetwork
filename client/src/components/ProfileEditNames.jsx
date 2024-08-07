import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';


export default function ProfileEditNames({ user, formUserData, handleInputChange, handleEdit, noEditFirstName, noEditLastName, sendRequest }) {
    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                className="bgx-black"
                expandIcon={<ExpandMore className="bgx-black" />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
                sx={{ mt: 1, bgcolor: '#f9f0ce' }}
            >
                <Typography>Modificar nombre y apellidos</Typography>
            </AccordionSummary>
            <AccordionDetails className="bgx-black" sx={{ bgcolor: '#faf1de' }}>
                <Box>
                    <Box>
                        <p style={{ marginLeft: '45px' }}>Nombre de pila</p>
                        <TextField
                            className="bgx-white"
                            sx={{ ml: 5, width: '90%' }}
                            disabled={noEditFirstName}
                            autoFocus={true}
                            label={user.firstName}
                            size='small'
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formUserData.firstName}
                            onChange={handleInputChange}
                        />
                        <Link href="#" onClick={() => handleEdit('Nombre de pila', 1)}><EditIcon /></Link>
                    </Box>

                    <Box>
                        <p style={{ marginLeft: '45px' }}>Apellido</p>
                        <TextField
                            className="bgx-white"
                            sx={{ ml: 5, width: '90%' }}
                            disabled={noEditLastName}
                            autoFocus={true}
                            label={user.lastName}
                            size='small'
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formUserData.lastName}
                            onChange={handleInputChange}
                        />
                        <Link href="#" onClick={() => handleEdit('Apellido', 2)}><EditIcon /></Link>
                    </Box>
                </Box>
                <Button onClick={()=>{sendRequest("name")}} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}