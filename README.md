# VectorShift - Pipeline Editor

VectorShift's Pipeline Editor is a web application designed to help users create and analyze graph pipelines. The frontend allows users to input nodes and edges, while the backend processes the graph to determine if it forms a Directed Acyclic Graph (DAG) and provides additional details.

---

## Features

### **Frontend**
- Create a graph by specifying:
  - Number of nodes (`V`).
  - Directed edges (`from → to` format).
- Display the added edges.
- Submit the graph to the backend for analysis.
- Clear the current graph data.
- Display results, including:
  - Number of nodes.
  - Number of edges.
  - Whether the graph is a DAG.
  - Topological order (if applicable).

### **Backend**
- Processes the graph to:
  - Count nodes and edges.
  - Check if the graph forms a Directed Acyclic Graph (DAG) using Kahn's Algorithm.
  - Return the topological order if the graph is a DAG.

---

## Technology Stack

### **Frontend**
- **Framework:** React
- **Styling:** Tailwind CSS
- **HTTP Requests:** Axios

### **Backend**
- **Framework:** FastAPI
- **Language:** Python
- **Middleware:** CORS for cross-origin requests

---

## Setup Instructions

### **Frontend**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open the app in your browser at http://localhost:3000.

Backend
Navigate to the backend directory:

bash
Copy code
cd backend
Create a virtual environment (optional but recommended):

bash
Copy code
python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Start the server:

bash
Copy code
uvicorn main:app --reload
The backend will be available at http://127.0.0.1:8000.

API Endpoints (Backend)
POST /pipelines/parse
Description: Accepts a graph and analyzes it to determine if it forms a DAG.

Request Body:

json
Copy code
{
  "vertices": 4,
  "adjacency_list": [
    [],
    [2],
    [3],
    [4],
    []
  ]
}
vertices: Number of nodes in the graph.
adjacency_list: Directed adjacency list representing the graph.
Response Body:

json
Copy code
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true,
  "topological_order": [1, 2, 3, 4]
}
num_nodes: Total number of nodes.
num_edges: Total number of edges.
is_dag: Boolean indicating if the graph is a DAG.
topological_order: List of nodes in topological order (if a DAG).
Project Structure
Frontend
php
Copy code
frontend/
├── src/
│   ├── components/
│   │   ├── NodeEditor.js     # Main component for graph input
│   │   ├── styles.css        # Tailwind CSS integration
│   ├── App.js                # Main React App component
│   ├── index.js              # React entry point
├── public/
│   ├── index.html            # HTML template
├── package.json              # Node.js dependencies
Backend
bash
Copy code
backend/
├── main.py                   # FastAPI application
├── requirements.txt          # Python dependencies
Example Usage
Frontend:

Input V = 4.
Add edges 1 → 2, 2 → 3, and 3 → 4.
Submit the graph.
View results:
Nodes: 4
Edges: 3
Is DAG: Yes
Topological Order: 1 → 2 → 3 → 4
Backend:

Receives the graph as an adjacency list.
Returns the results to the frontend after processing.
Dependencies
Frontend
React
Axios
Tailwind CSS
Backend
FastAPI
Uvicorn
Python 3.8+
Future Enhancements
Support for weighted graphs.
Display graph visualization in the frontend.
Enhanced error handling for invalid inputs.
License
This project is licensed under the MIT License.

Acknowledgments
Thanks to VectorShift for providing this technical assessment challenge.

markdown
Copy code

---

### Key Features of This README:
1. **Detailed Setup Instructions:** Clear steps to set up both the frontend and backend.
2. **API Documentation:** A concise description of the backend API and its input/output.
3. **Project Structure:** Highlights the organization of the codebase.
4. **Example Usage:** Explains how to use the application.
5. **Future Enhancements:** Suggests possible improvements.

Let me know if further adjustments are needed! 🚀
