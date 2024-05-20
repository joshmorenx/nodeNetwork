import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileEditPicture({ selectedImage, openFilePicker, sendRequest }) {
    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
                sx={{ mt: 1, bgcolor: '#f9f0ce' }}
            >
                <Typography>Modificar imagen de perfil</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}>
                <Box>
                    <p>Foto de perfil</p>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <img onClick={() => openFilePicker()} width={'150vw'} height={'150vw'} className="avatar m-auto cursor-pointer" src={selectedImage} alt="Rounded avatar" />
                        <Link href="#" onClick={() => openFilePicker()}><EditIcon /></Link>
                    </Box>
                </Box>
                <Button /*onClick={sendRequest}*/ size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}