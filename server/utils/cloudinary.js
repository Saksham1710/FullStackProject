import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
console.log("uploadOnCloudinary called" + localFilePath);

  try {
    if(!localFilePath) return null;
    //upload the file to Cloudinary and retrieve secure URL of the image
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    // // file has been uploaded successfully
     console.log("file uploaded successfully on cloudinary");
     console.log(response.url);
    fs.unlinkSync(localFilePath);//delete local copy of the file after it's been uploaded to cloudinary
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);//delete local copy of the file
    return null;
  }
}
export  {uploadOnCloudinary};