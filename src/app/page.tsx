import React from 'react';
import { Hero } from '@/components/Hero';
import { ActionDomains } from '@/components/ActionDomains';
import { RealMissionsTimeline } from '@/components/RealMissionsTimeline';
import { ProjectsGallery } from '@/components/ProjectsGallery';
import { MissionSplitSection } from '@/components/MissionSplitSection';
import { ImpactStats } from '@/components/ImpactStats';
import { SponsorshipSpotlight } from '@/components/SponsorshipSpotlight';
import { DonationBanner } from '@/components/DonationBanner';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FieldReportsPreview } from '@/components/FieldReportsPreview';
import { PartnersSection } from '@/components/PartnersSection';
import { HomeFaqSection } from '@/components/HomeFaqSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActionDomains />
      <RealMissionsTimeline />
      <ProjectsGallery />
      <MissionSplitSection />
      <ImpactStats />
      <SponsorshipSpotlight />
      <DonationBanner />
      <TestimonialsSection />
      <FieldReportsPreview />
      <PartnersSection />
      <HomeFaqSection />
    </>
  );
}

