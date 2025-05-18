
import React from 'react';
import BenefitsTab from './BenefitsTab';

const InfoTabs: React.FC = () => {
  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Why Choose Bet 3.0
      </h3>
      <BenefitsTab />
    </div>
  );
};

export default InfoTabs;
