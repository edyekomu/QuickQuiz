import pymupdf

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extracts text from a PDF file.
    
    Parameters:
        pdf_path (str): The path to the PDF file.

    Returns:
        str: The extracted text from the PDF file.
    """
    text = ""
    with pymupdf.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text