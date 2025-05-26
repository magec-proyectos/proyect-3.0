
import React from 'react';
import SportsLogosCarousel from '@/components/SportsLogosCarousel';
import TrustedByContainer from '@/components/homepage/trusted-by/TrustedByContainer';
import TrustedByHeader from '@/components/homepage/trusted-by/TrustedByHeader';

const TrustedBySection = React.memo(() => {
  return (
    <TrustedByContainer>
      <TrustedByHeader />
      <SportsLogosCarousel />
    </TrustedByContainer>
  );
});

TrustedBySection.displayName = 'TrustedBySection';

export default TrustedBySection;
