// cloudinary parameters for image upload.
const uploadPreset = import.meta.env.VITE_UPLOADPRESET;
const cloudName = import.meta.env.VITE_CLOUDNAME; //cloudName is public and shown in the image url, but .env helps to configure all parameters in one file

export async function uploadToCloudinary(file) {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const request = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    const data = await request.json();

    return data.secure_url;
  } catch (error) {
    console.log(error);
    return error;
  }
}
