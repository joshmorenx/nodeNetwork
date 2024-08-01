import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileEditPicture({ selectedImage, selectedImageUrl, handleImageChange, sendRequest }) {
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
                    <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input className="m-auto" type="file" onChange={handleImageChange} name="picture" id="" accept='image/*' /> 
                        
                        {/*show selected image*/}
                        <img height={250} width={250} className='ml-48' src={selectedImageUrl} alt="profile picture" />
                    </Box>
                </Box>
                <Button onClick={()=>{sendRequest("picture", selectedImage)}} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}