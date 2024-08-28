import * as React from 'react';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageViewer from './ImageViewer.jsx';
import { Box } from '@mui/material';

export default function ImageGallery({ token, username, userData }) {
  const [imgClickedPath, setImgClickedPath] = useState(null)

  const handleImageClicked = (event) => {
    if (event) {
      setImgClickedPath(event.target.src);
    }
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(164px, 1fr))', gap: '10px', }} >
      {userData.galleryPictures !== undefined &&
        userData.galleryPictures.map((item, index) => (
          <img onClick={(event) => { handleImageClicked(event) }} key={index} src={`https://nodenetwork-backend.onrender.com${item}?w=3640&h=364&fit=crop&auto=format`} alt={"https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible&size=30"} loading="lazy" style={{ width: '100%', height: 'auto' }} />
        ))}
      <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
    </Box>
  );
}