import { useState } from 'react';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    {
      id: 1,
      url: "https://via.placeholder.com/300x200",
      title: "Изображение 1",
      description: "Описание изображения 1"
    },
    {
      id: 2,
      url: "https://via.placeholder.com/300x200",
      title: "Изображение 2",
      description: "Описание изображения 2"
    },
    {
      id: 3,
      url: "https://via.placeholder.com/300x200",
      title: "Изображение 3",
      description: "Описание изображения 3"
    }
  ];

  return (
    <div className="page">
      <h1>Галерея</h1>
      <div className="gallery-grid">
        {images.map(image => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={image.title} />
            <h4>{image.title}</h4>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <p>{selectedImage.description}</p>
            <button onClick={() => setSelectedImage(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery; 