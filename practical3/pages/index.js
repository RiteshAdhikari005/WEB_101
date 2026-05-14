import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const { handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    clearErrors("file");

    if (rejectedFiles.length > 0) {
      setError("file", { message: "Only images and PDFs are allowed." });
      return;
    }

    const selected = acceptedFiles[0];

    if (selected.size > 5 * 1024 * 1024) {
      setError("file", { message: "File must be under 5MB." });
      return;
    }

    setFile(selected);

    if (selected.type.startsWith("image/")) {
      setPreview({ url: URL.createObjectURL(selected), name: selected.name, type: selected.type });
    } else if (selected.type === "application/pdf") {
      setPreview({ name: selected.name, type: selected.type });
    } else {
      setPreview(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    maxFiles: 1,
  });

  const onSubmit = async () => {
    if (!file) {
      setError("file", { message: "Please select a file first." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(0);
      setStatus("");

      console.log("Uploading file:", file.name, "Type:", file.type);

      const response = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      setStatus("✅ " + response.data.message);
      setFile(null);
      setPreview(null);
      setProgress(0);

    } catch (err) {
      console.error("Upload error:", err);
      const msg = err.response?.data?.error || "Upload failed.";
      setStatus("❌ " + msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📁 File Upload</h1>
        <p style={styles.subtitle}>Images & PDFs only · Max 5MB</p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div
            {...getRootProps()}
            style={{
              ...styles.dropzone,
              borderColor: isDragActive ? "#4f46e5" : "#cbd5e1",
              background: isDragActive ? "#eef2ff" : "#f8fafc",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop it here! 🎯</p>
            ) : (
              <p>Drag & drop a file here, or <strong>click to browse</strong></p>
            )}
          </div>

          {errors.file && (
            <p style={styles.error}>{errors.file.message}</p>
          )}

          {file && (
            <div style={styles.fileInfo}>
              <p>📄 <strong>{file.name}</strong></p>
              <p style={styles.meta}>{(file.size / 1024).toFixed(1)} KB · {file.type}</p>
            </div>
          )}

          {preview && (
            <div style={styles.previewBox}>
              <h3 style={styles.previewTitle}>Preview:</h3>
              <div style={styles.previewInner}>
                {preview.type?.startsWith("image/") ? (
                  <img src={preview.url} alt={preview.name} style={styles.previewImg} />
                ) : preview.type === "application/pdf" ? (
                  <div style={styles.pdfBox}>
                    <span style={styles.pdfIcon}>📄</span>
                    <span>{preview.name}</span>
                  </div>
                ) : (
                  <div>File selected: {preview.name}</div>
                )}
              </div>
            </div>
          )}

          {uploading && (
            <div style={styles.progressWrapper}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }} />
              <p style={styles.progressText}>{progress}%</p>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            style={{
              ...styles.button,
              opacity: uploading ? 0.6 : 1,
            }}
          >
            {uploading ? `Uploading... ${progress}%` : "Upload File"}
          </button>
        </form>

        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f5f9",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  title: { fontSize: "24px", marginBottom: "4px" },
  subtitle: { color: "#94a3b8", marginBottom: "24px" },
  dropzone: {
    border: "2px dashed",
    borderRadius: "12px",
    padding: "40px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#64748b",
    marginBottom: "12px",
  },
  error: { color: "#ef4444", fontSize: "14px", marginBottom: "12px" },
  fileInfo: {
    background: "#f8fafc",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "12px",
    fontSize: "14px",
  },
  meta: { color: "#94a3b8", fontSize: "12px", marginTop: "4px" },
  previewBox: {
    marginBottom: "16px",
  },
  previewTitle: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
  },
  previewInner: {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "8px",
  },
  previewImg: {
    width: "100%",
    borderRadius: "8px",
    maxHeight: "200px",
    objectFit: "cover",
  },
  pdfBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px",
    background: "#f8fafc",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#64748b",
  },
  pdfIcon: { fontSize: "24px" },
  progressWrapper: {
    background: "#e2e8f0",
    borderRadius: "999px",
    height: "10px",
    marginBottom: "8px",
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    background: "#4f46e5",
    height: "100%",
    borderRadius: "999px",
    transition: "width 0.3s ease",
  },
  progressText: {
    textAlign: "center",
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "12px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },
  status: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "600",
  },
};