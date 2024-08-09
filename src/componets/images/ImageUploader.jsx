import  { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State to hold the image preview URL
  const [message, setMessage] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview of the image
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setPreview(objectURL);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      
      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      setImageURL(downloadURL);
      setMessage('Image uploaded successfully!');
    } catch (error) {
      setMessage(`Error uploading image: ${error.message}`);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {/* Show the image preview */}
      {preview && (
        <div>
          <p>Image Preview:</p>
          <img src={preview} alt="Preview" width="300" />
        </div>
      )}

      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
      
      {/* Show the uploaded image */}
      {imageURL && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageURL} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
