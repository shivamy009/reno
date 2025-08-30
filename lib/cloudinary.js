// Cloudinary upload utility
export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

// Helper function to extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary')) return null;
  
  const parts = url.split('/');
  const uploadIndex = parts.findIndex(part => part === 'upload');
  if (uploadIndex === -1) return null;
  
  const publicIdParts = parts.slice(uploadIndex + 2);
  const publicId = publicIdParts.join('/').split('.')[0];
  return publicId;
};

// Helper function to delete image from Cloudinary (for cleanup)
export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    // Note: Deletion requires server-side implementation with API key/secret
    // This is a placeholder for future server-side deletion endpoint
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};
