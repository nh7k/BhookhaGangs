// Cloudinary configuration and upload utility

const CLOUDINARY_CLOUD_NAME = 'ddnthsnug'
const CLOUDINARY_UPLOAD_PRESET = 'shaktinet_preset'
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export interface UploadResult {
  url: string
  public_id: string
  secure_url: string
}

export async function uploadImageToCloudinary(file: File): Promise<UploadResult> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary')
    }

    const data = await response.json()
    return {
      url: data.secure_url,
      public_id: data.public_id,
      secure_url: data.secure_url,
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB',
    }
  }

  return { valid: true }
}

