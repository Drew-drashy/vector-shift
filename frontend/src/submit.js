import axios  from "axios";
export const submitPipeline = async (nodes, edges) => {
    try {
      const adjacencyMatrix = Array.from({ length: nodes }, () =>
        Array(nodes).fill(0)
      );
      edges.forEach(([from, to]) => {
        adjacencyMatrix[from][to] = 1;
      });
  
      const res = await axios.post('http://127.0.0.1:8000/pipelines/parse', {
        vertices: nodes,
        adjacency_matrix: adjacencyMatrix,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  