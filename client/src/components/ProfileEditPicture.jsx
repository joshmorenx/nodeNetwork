import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Input, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import { useMediaQuery } from '@mui/material';

export default function ProfileEditPicture({ selectedImage, selectedImageUrl, handleImageChange, sendRequest }) {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

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
                <Typography>Modificar imagen de perfil</Typography>
            </AccordionSummary>
            <AccordionDetails className="bgx-black" sx={{ bgcolor: '#faf1de' }}>
                <Box>
                    <p>Foto de perfil</p>
                    <Box sx={{ display: isDesktop ? 'inline-flex' : 'block', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Input className="m-auto bgx-black" type="file" onChange={handleImageChange} name="picture" id="" accept='image/*' />

                        {/*show selected image*/}
                        <Box sx={{ width: '100', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img height={250} width={250} src={selectedImageUrl} alt="profile picture" />
                        </Box>
                    </Box>
                </Box>
                <Button onClick={() => { sendRequest("picture", selectedImage) }} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}