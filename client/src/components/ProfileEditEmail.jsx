import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileEditEmail({ formUserData, handleInputChange, sendRequest, user, noEditEmail, handleEdit }) {
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
                <Typography>Modificar Email</Typography>
            </AccordionSummary>
            <AccordionDetails className="bgx-black" sx={{ bgcolor: '#faf1de' }}>

                <Box>
                    <p style={{ marginLeft: '45px' }}>Email</p>
                    <TextField
                        className="bgx-white"
                        sx={{ ml: 5, width: '90%' }}
                        disabled={noEditEmail}
                        autoFocus={true}
                        label={user.email}
                        size='small'
                        type="email"
                        id="email"
                        name="email"
                        value={formUserData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Link href="#" onClick={() => handleEdit('Email', 4)}><EditIcon /></Link>
                </Box>
                <Button onClick={()=>{sendRequest("email")}} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}