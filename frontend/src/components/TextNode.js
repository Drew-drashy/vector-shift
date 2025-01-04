import React, { useState } from 'react';

const TextNode = () => {
  const [text, setText] = useState('');
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);
  const [handles, setHandles] = useState([]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setWidth(Math.min(500, newText.length * 10));
    setHeight(Math.max(50, newText.split('\n').length * 20));

    const variables = newText.match(/{{\s*\w+\s*}}/g);
    if (variables) {
      setHandles(variables.map((v) => ({ label: v, type: 'input' })));
    }
  };

  return (
    <div
      className="text-node"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <textarea value={text} onChange={handleTextChange} />
      <div className="handles">
        {handles.map((handle, index) => (
          <div key={index} className="handle input">
            {handle.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextNode;
