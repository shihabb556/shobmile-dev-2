import { useState } from 'react';

export default function UploadImages({uploadedImageUrls, setUploadedImageUrls}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const uploadImages = async () => {
    setLoading(true);
    const uploadedUrls = [];

    for (const file of images) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'masum-ecom');
      formData.append('folder', 'masum-ecom');

      const response = await fetch('https://api.cloudinary.com/v1_1/unity-it/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      uploadedUrls.push(data.secure_url);
    }

    // Store the uploaded URLs in your MongoDB
    // await saveImageUrlsToDatabase(uploadedUrls);
    setUploadedImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setImages([]);
    setLoading(false);
  };


  return (
    <div>
      <h1>Upload Multiple Images</h1>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        multiple
      />
      <button className='bg-green-700 text-gray-100 p-1 rounded' onClick={uploadImages} disabled={loading || images.length === 0}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      <h2>Preview</h2>
      <div>
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="Preview" width="100" />
        ))}
      </div>

      <h2>Uploaded Images</h2>
      <div>
        {uploadedImageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} width="100" />
        ))}
      </div>
    </div>
  );
}
