import { v2 as cloudinary } from 'cloudinary';
export const cloudinaryFunc = async (myFile) => {

    // Cloudinary configurations
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    // Upload each file to Cloudinary
    const resourceType = myFile.mimetype.startsWith('video/') ? 'video' : 'image';
    const result = await cloudinary.uploader.upload(myFile.path, { resource_type: resourceType });
    return result.secure_url;
}