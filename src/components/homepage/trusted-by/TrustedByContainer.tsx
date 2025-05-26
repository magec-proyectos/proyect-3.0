
import React from 'react';

interface TrustedByContainerProps {
  children: React.ReactNode;
}

const TrustedByContainer: React.FC<TrustedByContainerProps> = ({ children }) => {
  return (
    <section className="py-12 bg-dark">
      <div className="container px-4">
        {children}
      </div>
    </section>
  );
};

export default TrustedByContainer;
