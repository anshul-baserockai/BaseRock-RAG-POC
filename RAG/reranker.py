import os
import re
import chromadb
from chromadb.config import Settings
import voyageai

# Initialize VoyageAI client
vo = voyageai.Client(api_key="pa-ovg02bjO4xPkHytVh8LpDI_4gKynVGJUHlwJcrBua_8")

# Initialize ChromaDB client
chroma_client = chromadb.PersistentClient(path="C:/Users/Anshul Ranjan/Downloads/RAG/ChromaDB")
collection_name = "file_embeddings"
collection = chroma_client.get_or_create_collection(name=collection_name)

# File containing imports
TARGET_FILE = "C:/Users/Anshul Ranjan/Downloads/BaseRock-RAG-POC/src/App.js"

# Function to extract import statements from a file
def extract_import_statements(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        # Regex to capture import lines
        import_lines = re.findall(r'^\s*import\s.*', content, re.MULTILINE)
        return [line for line in import_lines]
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return []

# Function to retrieve relevant documents from ChromaDB using VoyageAI
def retrieve_relevant_code(import_statements):
    if not import_statements:
        print("No import statements found.")
        return

    # Join import statements as the query
    query = "Retrieve source code or functions that are related to the following modules:\n" + "\n".join(import_statements)
    print(f"Query: {query}")

    query_embedding = vo.embed(
            texts=[query],  # Embed a single chunk at a time
            model="voyage-code-3",  # Specify the desired model
            input_type="query"  # Set input type as document
        )
    
    query_embedding = query_embedding.embeddings[0] if query_embedding.embeddings else None

    # Fetch all documents and their metadata from ChromaDB
    results = collection.query(
        query_embeddings=query_embedding,  # Empty embeddings list; we'll use VoyageAI for similarity
        n_results=5,  # Fetch up to 10 documents from ChromaDB
        include=["documents", "metadatas", "embeddings"]
    )
    print(results)
    # documents = [res["document"] for res in results["documents"]]

    # Use VoyageAI to rerank documents based on the query
    # reranking = vo.rerank(query, documents, model="rerank-2", top_k=1)
    
    # print("\nTop Relevant Documents:")
    # for r in reranking.results:
    #     print(f"Document: {r.document}")
    #     print(f"Relevance Score: {r.relevance_score}")
    #     print()

# Main execution
if __name__ == "__main__":
    imports = extract_import_statements(TARGET_FILE)
    if imports:
        print("Extracted Imports:")
        for imp in imports:
            print(imp)
    retrieve_relevant_code(imports)
