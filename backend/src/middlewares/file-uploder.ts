import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client from "../s3/s3";
import config from "config";
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";


declare global {
  namespace Express {
    interface Request {
      imageName?: string; 
    }
  }
}

export default async function fileUploader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.files || !req.files.image) {
      return next();
    }

    const file = req.files.image as UploadedFile;

    const key = `${randomUUID()}${extname(file.name)}`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: config.get<string>("s3.bucket"),
        Key: key,
        ContentType: file.mimetype,
        Body: file.data,
      },
    });

    const result: any = await upload.done();

    req.imageName = result.Location;

    console.log("uploaded:", req.imageName);

    next();
  } catch (e) {
    next(e);
  }
}
