import React from 'react';

const BaseNode = ({ title, content, handles }) => {
  return (
    <div className="node">
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="handles">
        {handles.map((handle, index) => (
          <div key={index} className={`handle ${handle.type}`}>
            {handle.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseNode;
