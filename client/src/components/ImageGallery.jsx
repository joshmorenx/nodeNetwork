import PropTypes from 'prop-types';
import { useState } from 'react';
import useGetUserGallery from '../hooks/useGetUserGallery'; // Ajusta la ruta según tu estructura de carpetas
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ImageViewer from './ImageViewer';

const ImageGallery = ({ token, username }) => {
  const { userGallery, isLoading, error } = useGetUserGallery({ token, username });
  const className = useSelector((state) => state.className);
  const [imgClickedPath, setImgClickedPath] = useState(null)

  // Puedes mostrar un mensaje de carga o un error si es necesario
  if (isLoading) return <div className="gallery-empty">Cargando...</div>;
  if (error) return <div className="gallery-empty">Error: {error}</div>;

  const handleImageClicked = (event) => {
    if (event) {
      setImgClickedPath(event.target.src);
    }
  }

  return (
    <>
      <Box className={`gallery-card ${className}`}>
        {userGallery.length === 0 && <div className="gallery-empty">No hay imagenes disponibles</div>}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(164px, 1fr))', gap: '12px' }}>
          {userGallery.map((image, index) => (
            <img
              onClick={(event) => handleImageClicked(event)}
              key={index}
              className="gallery-item"
              src={image}
              alt={`Imagen ${index + 1}`}
              onError={(e) => (e.target.src = "https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible")}
              loading="lazy"
            />
          ))}
        </Box>
      </Box>
      <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} images={userGallery} />
    </>
  );
};

ImageGallery.propTypes = {
    token: PropTypes.string,
    username: PropTypes.string,
};

export default ImageGallery;
