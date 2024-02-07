import { Storage } from "@google-cloud/storage";
import axios from "axios";

import { axiosConfig } from "./utils.js";

const storage = new Storage({
  keyFilename: `./google-bucket.json`,
});
const bucketName = "attendance-bucket-autowhat";
const bucket = storage.bucket(bucketName);

export async function uploadToBucket(url, fileName) {
  const downloadImageConfig = await axiosConfig(url, "get");
  const response = await axios({
    ...downloadImageConfig,
    responseType: "stream",
  });

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    response.data.pipe(blobStream);

    blobStream.on("error", (error) => {
      reject({
        status: "failed",
        message: "Failed to upload",
        error: error.message,
      });
    });

    blobStream.on("finish", async () => {
      try {
        const [url] = await blob.getSignedUrl({
          action: "read",
          expires: "01-01-2030",
        });
        resolve({
          status: "success",
          message: "Uploaded the file successfully",
          url,
        });
      } catch (error) {
        reject({
          status: "failed",
          message: `Uploaded the file successfully: ${fileName}, but public access is denied!`,
          error: error.message,
        });
      }
    });
  });
}
