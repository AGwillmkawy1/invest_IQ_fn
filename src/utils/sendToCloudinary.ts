import axios from "axios";
import { CloudinaryUrl, PresetKey, CloudinaryUrlRaw } from "./api";

export async function uploadFile(
  file: File,
  fileType: "normal" | "raw" = "normal"
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PresetKey);
  const url = fileType === "normal" ? CloudinaryUrl : CloudinaryUrlRaw;
  const response = await axios.post(url, formData);

  return response.data.url as string;
}

export async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", PresetKey);

  const response = await axios.post(CloudinaryUrl, formData);

  return response.data.url;
}
