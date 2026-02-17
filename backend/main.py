from fastapi import FastAPI, File, UploadFile, HTTPException
from pathlib import Path
import shutil

app = FastAPI()

# Create upload directory if non-existent
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    """Handles the upload of a PDF file.
    
    Parameters:
        file (UploadFile): The file to be uploaded. Must be a PDF file.
    Returns:
        dict: A dictionary containing the filename, content type, file size, 
        and file location.
    Raises:
        HTTPException: If no file is selected or the file type is not PDF.
    """
  
    if file.filename == "":
        raise HTTPException(status_code=400, detail="No file selected")
    
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Incorrect filetype")

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "content-type": file.content_type,
        "size": file.size,
        "location": str(file_path),
    }


@app.get("/")
def root():
    return {"message": "Quick Quiz is running."}
