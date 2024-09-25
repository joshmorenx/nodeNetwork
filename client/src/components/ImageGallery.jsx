import React, { useEffect } from 'react';
import useGetUserGallery from '../hooks/useGetUserGallery'; // Ajusta la ruta según tu estructura de carpetas
import { Box } from '@mui/material';
import ImageViewer from './ImageViewer';
import { useState } from 'react';

const ImageGallery = ({ token, username }) => {
  const { userGallery, isLoading, error } = useGetUserGallery({ token, username });
  const [imgClickedPath, setImgClickedPath] = useState(null)

  // Puedes mostrar un mensaje de carga o un error si es necesario
  if (isLoading) return <div>Cargando...</div>;
  if (userGallery.length === 0 && !isLoading) return <div>No hay imagenes disponibles</div>;
  if (error) return <div>Error: {error}</div>;

  const handleImageClicked = (event) => {
    if (event) {
      setImgClickedPath(event.target.src);
    }
  }

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(164px, 1fr))', gap: '10px' }}>
        {userGallery.map((image, index) => (
          <img
            onClick={(event) => handleImageClicked(event)}
            key={index}
            src={image}
            alt={`Imagen ${index + 1}`}
            onError={(e) => (e.target.src = "https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible")}
            loading="lazy"
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
      </Box>
      <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
    </>
  );
};

export default ImageGallery;
