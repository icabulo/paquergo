import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserImageUrl } from "../../Redux/features/user/userSlice";
import { useSnackbar } from "notistack";

const UploadInput = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // cloudinary parameters for image upload.
  const uploadPreset = import.meta.env.VITE_UPLOADPRESET;
  const cloudName = "didek0hyg"; //cloudName is public and shown in the image url

  const handleChange = (newFile) => {
    // console.log("handlechange", newFile);
    setFile(newFile);
  };

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function load() {
        const { result } = reader;
        setUrl(result);
      };
    } else {
      setUrl("");
    }
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file !== null) {
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
        if (data) {
          enqueueSnackbar("Imagen actualizada", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          dispatch(setUserImageUrl(data.secure_url));
          // console.log("URM IMAGE", data.secure_url);
          setFile(null);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No image selected", file);
    }
  };

  return (
    <>
      <Box>
        <Box style={{ width: "200px", margin: "10px auto" }}>
          <img style={{ width: "100%" }} src={url} />
        </Box>
        <Box
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
            margin: "0 auto",
            maxWidth: "500px",
          }}
        >
          <MuiFileInput
            value={file}
            onChange={handleChange}
            variant="outlined"
            placeholder="Tu imagen"
            sx={{
              minWidth: "250px",
              maxWidth: "500px",
            }}
          />
          <Button type="submit" variant="contained">
            Cargar imagen
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UploadInput;
