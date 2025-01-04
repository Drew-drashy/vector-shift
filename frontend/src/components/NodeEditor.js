// // a
// import React, { useState } from 'react';
// import axios from 'axios';

// const NodeEditor = () => {
//   const [nodes, setNodes] = useState();
//   const [edge, setEdge] = useState('');
//   const [edges, setEdges] = useState([]);
//   const [response, setResponse] = useState(null);

//   // Add edge to the list
//   const addEdge = (e) => {
//     e.preventDefault();
//     const [from, to] = edge.split(' ').map(Number);
//     if (!isNaN(from) && !isNaN(to) && from > 0 && to > 0 && from <= nodes && to <= nodes) {
//       setEdges((prevEdges) => [...prevEdges, [from, to]]);
//       setEdge('');
//     } else {
//       alert('Edges must be in range from 1 to V.');
//     }
//   };

//   const clearData = () => {
//     setEdge('');
//     setNodes(0);
//     setEdges([]);
//     setResponse(null);
//   };

//   // Submit the pipeline
//   const submitPipeline = async () => {
//     const adj = Array.from({ length: nodes + 1 }, () => []);
//     for (const [from, to] of edges) {
//       adj[from].push(to);
//     }

//     try {
//       const res = await axios.post('http://127.0.0.1:8000/pipelines/parse', {
//         vertices: nodes,
//         adjacency_list: adj, // Sending adjacency list
//       });
//       setResponse(res.data);
//       alert(
//         `Nodes: ${res.data.num_nodes}, Edges: ${res.data.num_edges}, Is DAG: ${res.data.is_dag ? 'Yes' : 'No'}`
//       );
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error submitting pipeline.');
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label>Number of Nodes (V): </label>
//         <input
//           type="number"
//           value={nodes}
//           onChange={(e) => setNodes(Number(e.target.value))}
//           placeholder="Enter number of nodes"
//           min="1"
//         />
//       </div>
//       <div>
//         <form onSubmit={addEdge}>
//           <label>Add Edge (format: "from to"): </label>
//           <input
//             type="text"
//             value={edge}
//             onChange={(e) => setEdge(e.target.value)}
//             placeholder="e.g., 1 2"
//           />
//           <button type="submit">Add Edge</button>
//         </form>
//       </div>
//       <button onClick={submitPipeline} disabled={nodes <= 0 || edges.length === 0}>
//         Submit Pipeline
//       </button>
//       <button onClick={clearData}>Clear Data</button>

//       {edges.length > 0 && (
//         <div>
//           <h3>Edges:</h3>
//           <ul>
//             {edges.map(([from, to], index) => (
//               <li key={index}>
//                 {from} → {to}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {response && (
//         <div>
//           <h3>Pipeline Analysis:</h3>
//           <p>Nodes: {response.num_nodes}</p>
//           <p>Edges: {response.num_edges}</p>
//           <p>Is DAG: {response.is_dag ? 'Yes' : 'No'}</p>
//           {response.is_dag && (
//             <p>Topological Order: {response.topological_order.join(' → ')}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NodeEditor;

import React, { useState } from 'react';
import axios from 'axios';

const NodeEditor = () => {
  const [nodes, setNodes] = useState();
  const [edge, setEdge] = useState('');
  const [edges, setEdges] = useState([]);
  const [response, setResponse] = useState(null);

  const addEdge = (e) => {
    e.preventDefault();
    const [from, to] = edge.split(' ').map(Number);
    if (!isNaN(from) && !isNaN(to) && from > 0 && to > 0 && from <= nodes && to <= nodes) {
      setEdges((prevEdges) => [...prevEdges, [from, to]]);
      setEdge('');
    } else {
      alert('Edges must be in range from 1 to V.');
    }
  };

  const clearData = () => {
    setEdge('');
    setNodes(0);
    setEdges([]);
    setResponse(null);
  };

  const submitPipeline = async () => {
    const adj = Array.from({ length: nodes + 1 }, () => []);
    for (const [from, to] of edges) {
      adj[from].push(to);
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/pipelines/parse', {
        vertices: nodes,
        adjacency_list: adj,
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting pipeline.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">Graph Pipeline Editor</h1>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Number of Nodes (V):</label>
          <input
            type="number"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            placeholder="Enter number of nodes"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <form onSubmit={addEdge}>
            <label className="block text-gray-600 font-medium mb-2">Add Edge (format: "from to"):</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={edge}
                onChange={(e) => setEdge(e.target.value)}
                placeholder="e.g., 1 2"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Add Edge
              </button>
            </div>
          </form>
        </div>
        <div className="mb-4">
          <button
            onClick={submitPipeline}
            disabled={nodes <= 0 || edges.length === 0}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Submit Pipeline
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={clearData}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear Data
          </button>
        </div>
        {edges.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Edges:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {edges.map(([from, to], index) => (
                <li key={index}>
                  {from} → {to}
                </li>
              ))}
            </ul>
          </div>
        )}
        {response && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Pipeline Analysis:</h3>
            <p className="text-gray-600">Nodes: {response.num_nodes}</p>
            <p className="text-gray-600">Edges: {response.num_edges}</p>
            <p className="text-gray-600">
              Is DAG: <span className={response.is_dag ? 'text-green-500' : 'text-red-500'}>
                {response.is_dag ? 'Yes' : 'No'}
              </span>
            </p>
            {response.is_dag && (
              <p className="text-gray-600">Topological Order: {response.topological_order.join(' → ')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeEditor;
