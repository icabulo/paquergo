import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  setUserImageUrl,
  updateUserAsync,
} from "../../Redux/features/user/userSlice";
import { uploadToCloudinary } from "../../api/cloudinaryRequest";

const UploadInput = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (newFile) => {
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
        const newImageUrl = await uploadToCloudinary(file);
        if (newImageUrl) {
          enqueueSnackbar("Imagen actualizada", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
          });
          dispatch(setUserImageUrl(newImageUrl));
          const reqBody = {
            userImage: newImageUrl,
          };
          dispatch(updateUserAsync(reqBody));

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
