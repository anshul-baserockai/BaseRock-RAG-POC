import os

EXCLUDED_FOLDERS = {"node_modules", ".git", "__pycache__", "dist", "build", ".idea", ".vscode", ".baserock"}
EXCLUDED_FILES = {".gitignore", ".gitattributes", ".gitmodules", ".gitlab-ci.yml","package-lock.json","logo512.png","logo192.png","App.baserock.test.js"}

PROJECT_PATH = "C:/Users/Anshul Ranjan/Downloads/BaseRock-RAG-POC"

def fetch_project_files(project_path):
    all_files = []
    for root, dirs, files in os.walk(project_path):
        # Exclude unwanted directories
        dirs[:] = [d for d in dirs if d not in EXCLUDED_FOLDERS]
        for file in files:
            if file in EXCLUDED_FILES:
                continue
            # Generate relative path to PROJECT_PATH
            relative_path = os.path.relpath(os.path.join(root, file), project_path)
            all_files.append(relative_path)
    return all_files

# Main execution
if __name__ == "__main__":
    files = fetch_project_files(PROJECT_PATH)
    print(f"Found {len(files)} files in the project (excluding excluded folders and files):\n")
    for file in files:
        print(file)

