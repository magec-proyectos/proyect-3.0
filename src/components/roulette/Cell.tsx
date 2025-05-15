
import React from 'react';

interface CellProps {
  key: string;
  fill: string;
}

const Cell: React.FC<CellProps> = ({ key, fill }) => {
  return <rect key={key} fill={fill} />;
};

export default Cell;
