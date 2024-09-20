import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageViewer from './ImageViewer.jsx';
import { Box } from '@mui/material';
import useGetGalleryImage from '../hooks/useGetGalleryImage';

export default function ImageGallery({ token, username, userData }) {
  const images = []
  const [userImages, setUserImages] = useState([])
  const [imgClickedPath, setImgClickedPath] = useState(null)
  const { galleryImage, imageError, getGalleryImage } = useGetGalleryImage({ username: username })

  const handleImageClicked = (event) => {
    if (event) {
      setImgClickedPath(event.target.src);
    }
  }

  useEffect(() => {
    if (username && userData.galleryPictures !== undefined) {
      userData.galleryPictures.forEach((item) => {
        getGalleryImage(item.slice(item.indexOf('gallery') + 'gallery/'.length))
      })
    }
  }, [username, userData.galleryPictures]);

  useEffect(() => {
    if (galleryImage) {
      images.push(galleryImage)
    }
  }, [galleryImage])

  useEffect(() => {
    if (images.length > 0) {
      setUserImages(images)
    }
  }, [images])

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(164px, 1fr))', gap: '10px', }} >
      {userImages !== undefined && (
        userImages.map((elem, key) => (
          <img onClick={(event) => { handleImageClicked(event) }} key={key} src={elem} alt="imagen alternativa" onError={(e) => e.target.src = "https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible&size=30"} loading="lazy" style={{ width: '100%', height: 'auto' }} />
        ))
      )}
      <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
    </Box>
  );
}