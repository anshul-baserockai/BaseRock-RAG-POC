import os
import chromadb
from chromadb.config import Settings
import voyageai
import time
from reading_file import fetch_project_files

ROOT_FOLDER = "C:/Users/Anshul Ranjan/Downloads/BaseRock-RAG-POC"

# Initialize VoyageAI client
voyage_client =  voyageai.Client(api_key="")

# Initialize ChromaDB client
chroma_client = chromadb.PersistentClient(path="C:/Users/Anshul Ranjan/Downloads/RAG/ChromaDB")

# Create or load a collection in ChromaDB
collection_name = "file_embeddings"
collection = chroma_client.get_or_create_collection(name=collection_name)

collections = chroma_client.list_collections()
print(f"Available collections: {collections}")

# Function to read file content
def read_file_content(file_path_relative):
    try:
        file_path = os.path.join(ROOT_FOLDER, file_path_relative)
        normalized_path = file_path.replace("\\", "/")
        print(normalized_path)
        with open(normalized_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading file {normalized_path}: {e}")
        return None

# Function to chunk text into manageable pieces
def chunk_text(text, max_tokens=1000):
    return [text[i:i + max_tokens] for i in range(0, len(text), max_tokens)]

# Function to generate embeddings using VoyageAI
def generate_embedding_with_voyage(text):
    try:
        # Use the voyageai.Client.embed method to generate embeddings
        result = voyage_client.embed(
            texts=[text],  # Embed a single chunk at a time
            model="voyage-code-3",  # Specify the desired model
            input_type="document"  # Set input type as document
        )
        # Extract the embedding from the result
        return result.embeddings[0] if result.embeddings else None
    except Exception as e:
        print(f"Error generating embedding with VoyageAI: {e}")
        return None

# Function to process file paths and store embeddings in ChromaDB
def process_files_and_store_embeddings(file_paths):
    for file_path in file_paths:
        print(f"Processing file: {file_path}")
        # Read file content
        content = read_file_content(file_path)
        if not content:
            continue

        # Chunk content if too large
        chunks = chunk_text(content, max_tokens=1000)

        for i, chunk in enumerate(chunks):
            # Generate embedding for each chunk
            time.sleep(20)
            embedding = generate_embedding_with_voyage(chunk)
            if not embedding:
                continue

            # Create a unique ID for each chunk
            chunk_id = f"{file_path}__chunk_{i}"
            print(f"Generated embedding for {chunk_id}")

            # Add the embedding to ChromaDB
            collection.upsert(
                ids=[chunk_id],
                metadatas=[{"file_path": file_path, "chunk_index": i}],
                documents=[chunk],  # Store raw chunked text for retrieval
                embeddings=[embedding]
            )
            print(f"Stored embedding for {chunk_id}")

# Example usage
# if __name__ == "__main__":
#     files = fetch_project_files("C:/Users/Anshul Ranjan/Downloads/BaseRock-RAG-POC")
#     process_files_and_store_embeddings(files)
#     print("Processing complete!")

files = fetch_project_files("C:/Users/Anshul Ranjan/Downloads/BaseRock-RAG-POC")
process_files_and_store_embeddings(files)
print("Processing complete!")
