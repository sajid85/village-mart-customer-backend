import { v2 as cloudinary } from 'cloudinary';
import { Cloudinary } from '@cloudinary/url-gen';
import * as fs from 'fs';

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
});

export const uploadImage = async (file: UploadedFile): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'ecommerce/products',
      use_filename: true,
      unique_filename: true,
    });

    // Clean up the temporary file
    fs.unlinkSync(file.path);

    return result.secure_url;
  } catch (error) {
    // Clean up the temporary file in case of error
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export const generateImageUrl = (
  productName: string,
  category: string,
): string => {
  return cld
    .image(`ecommerce/products/${category}/${productName}`)
    .resize({
      width: 800,
      height: 800,
      type: 'fill',
    })
    .quality('auto')
    .format('auto')
    .toURL();
};
