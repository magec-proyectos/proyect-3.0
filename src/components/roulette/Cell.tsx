
import React from 'react';

interface CellProps {
  // Modified to remove the 'key' prop as it's a reserved React prop name
  cellKey?: string;
  fill: string;
}

const Cell: React.FC<CellProps> = ({ cellKey, fill }) => {
  return <rect key={cellKey} fill={fill} />;
};

export default Cell;
