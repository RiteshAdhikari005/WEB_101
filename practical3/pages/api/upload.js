// pages/api/upload.js
// This is the SERVER that RECEIVES the file from the frontend.

import formidable from "formidable";
import path from "path";
import fs from "fs";

// ✅ IMPORTANT: Tell Next.js NOT to auto-parse the body
// because formidable will handle it instead
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Where uploaded files will be saved
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Create the folder if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Set up formidable to handle the incoming file
  const form = formidable({
    uploadDir,
    keepExtensions: true,   // keeps .jpg, .pdf, etc.
    maxFileSize: 5 * 1024 * 1024, // 5MB max
  });

  // Parse the request
  form.parse(req, (err, fields, files) => {
    if (err) {
      // If file is too big, send a clear error
      if (err.code === 1009) {
        return res.status(400).json({ error: "File too large. Max size is 5MB." });
      }
      return res.status(500).json({ error: "Upload failed: " + err.message });
    }

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file received." });
    }

    // ✅ Success! Send back file info
    return res.status(200).json({
      message: "File uploaded successfully!",
      filename: file.newFilename,
      originalName: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  });
}