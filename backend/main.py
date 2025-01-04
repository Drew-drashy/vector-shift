from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import deque

app = FastAPI()

# CORS settings to allow requests from http://localhost:3000
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for the request payload
class Pipeline(BaseModel):
    vertices: int
    adjacency_list: List[List[int]]

def kahn_algorithm(vertices: int, adjacency_list: List[List[int]]):
    indegree = [0] * (vertices + 1)

    # Calculate indegree
    for node in range(1, vertices + 1):
        for adjacent in adjacency_list[node]:
            indegree[adjacent] += 1

    # Queue to store vertices with indegree 0
    q = deque()
    for i in range(1, vertices + 1):
        if indegree[i] == 0:
            q.append(i)

    # Perform Kahn's algorithm for topological sorting
    result = []
    while q:
        node = q.popleft()
        result.append(node)

        # Decrease indegree of adjacent vertices
        for adjacent in adjacency_list[node]:
            indegree[adjacent] -= 1
            if indegree[adjacent] == 0:
                q.append(adjacent)

    # Check for a cycle
    if len(result) != vertices:
        return {"is_dag": False, "topological_order": []}
    return {"is_dag": True, "topological_order": result}

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    vertices = pipeline.vertices
    adjacency_list = pipeline.adjacency_list

    # Validate adjacency list length
    if len(adjacency_list) != vertices + 1:
        raise HTTPException(
            status_code=400,
            detail="Adjacency list length does not match the number of vertices."
        )

    # Calculate the number of nodes and edges
    num_nodes = vertices
    num_edges = sum(len(adj) for adj in adjacency_list)

    # Check if the graph is a DAG and get topological sort order
    result = kahn_algorithm(vertices, adjacency_list)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": result["is_dag"],
        "topological_order": result["topological_order"],
    }
