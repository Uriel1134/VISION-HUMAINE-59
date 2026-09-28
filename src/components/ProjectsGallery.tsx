'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Sparkles, 
  Layers, 
  HeartHandshake 
} from 'lucide-react';
import { GALLERY_PROJECTS_DATA } from '@/lib/data';
import { GalleryPhoto } from '@/lib/types';

interface FlatPhoto extends GalleryPhoto {
  projectTitle: string;
  projectShortTitle: string;
  projectLocation: string;
  projectDepartment: string;
  projectEdition: string;
  projectId: string;
}

export const ProjectsGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Flatten all photos for easy indexing in lightbox
  const allPhotos: FlatPhoto[] = GALLERY_PROJECTS_DATA.flatMap((proj) =>
    proj.photos.map((photo) => ({
      ...photo,
      projectTitle: proj.title,
      projectShortTitle: proj.shortTitle,
      projectLocation: proj.location,
      projectDepartment: proj.department,
      projectEdition: proj.edition,
      projectId: proj.id,
    }))
  );

  // Photos filtered by active tab
  const displayedPhotos: FlatPhoto[] = activeTab === 'all'
    ? allPhotos
    : allPhotos.filter((p) => p.projectId === activeTab);

  // Active project metadata if a specific tab is selected
  const activeProject = GALLERY_PROJECTS_DATA.find((p) => p.id === activeTab);

  // Lightbox handlers
  const openLightbox = (photoId: string) => {
    const idx = displayedPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setSelectedPhotoIndex(idx);
    }
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const showPrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => 
      prev !== null ? (prev === 0 ? displayedPhotos.length - 1 : prev - 1) : 0
    );
  }, [selectedPhotoIndex, displayedPhotos.length]);

  const showNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => 
      prev !== null ? (prev === displayedPhotos.length - 1 ? 0 : prev + 1) : 0
    );
  }, [selectedPhotoIndex, displayedPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevPhoto();
      if (e.key === 'ArrowRight') showNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, showPrevPhoto, showNextPhoto]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhotoIndex]);

  const currentPhoto = selectedPhotoIndex !== null ? displayedPhotos[selectedPhotoIndex] : null;

  return (
    <section className="py-20 sm:py-28 bg-[#FBFDFF] relative overflow-hidden" id="galerie">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Clean & Elegant */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292D77] tracking-tight leading-[1.18]">
            Nos missions en images, <br />
            <span className="text-[#D72229]">classées par projet de partage</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
            Découvrez les reportages photographiques authentiques de nos interventions au Bénin. Chaque cliché témoigne de la solidarité en action et de l&apos;impact direct auprès des enfants.
          </p>
        </div>

        {/* Project Filter Tabs - Modern Segmented Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-[30px] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-[#292D77] text-white shadow-md shadow-[#292D77]/20 scale-[1.02]'
                : 'bg-white text-slate-700 hover:text-[#292D77] hover:bg-slate-50 border border-slate-200 shadow-sm'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tous les projets</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTab === 'all' ? 'bg-[#D72229] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {allPhotos.length}
            </span>
          </button>

          {GALLERY_PROJECTS_DATA.map((project) => {
            const isActive = activeTab === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`px-5 py-2.5 rounded-[30px] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#292D77] text-white shadow-md shadow-[#292D77]/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:text-[#292D77] hover:bg-slate-50 border border-slate-200 shadow-sm'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.shortTitle}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-[#D72229] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {project.photos.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Highlight Banner (when single project is selected) */}
        {activeProject && (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border border-blue-100 shadow-card relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-2xl -z-0"></div>
            
            <div className="relative z-10 max-w-4xl space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  {activeProject.badge}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {activeProject.location} &middot; Dépt. {activeProject.department}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {activeProject.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {activeProject.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {activeProject.description}
              </p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-subtle hover:shadow-card-hover cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end min-h-[300px] sm:min-h-[320px]"
            >
              {/* Photo Image */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                priority={photo.id === 'glo-1' || photo.id === 'dassa3-1'}
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/10 shadow-sm">
                  {photo.projectShortTitle}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption & Meta */}
              <div className="relative z-10 p-4 space-y-1.5 text-white">
                <p className="text-xs font-semibold text-slate-100 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
                
                <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium pt-1 border-t border-white/10">
                  <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{photo.projectLocation} ({photo.projectDepartment})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-14 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 border border-blue-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                100% de photos authentiques et vérifiées sur le terrain
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Chaque mission humanitaire est documentée avec respect et transparence pour nos bienfaiteurs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
              Total : {allPhotos.length} photos réelles
            </span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            aria-label="Fermer la vue"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrevPhoto();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/20 hover:scale-105"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNextPhoto();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/20 hover:scale-105"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Main Modal Content */}
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box */}
            <div className="relative w-full h-[55vh] sm:h-[68vh] rounded-2xl overflow-hidden bg-black/50 shadow-2xl border border-white/10">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Photo Details Footer */}
            <div className="w-full mt-4 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wide mr-2">
                    {currentPhoto.projectShortTitle}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {currentPhoto.projectLocation} &middot; Dépt. {currentPhoto.projectDepartment}
                  </span>
                </div>

                <span className="text-xs text-slate-300 font-bold">
                  Photo {selectedPhotoIndex + 1} sur {displayedPhotos.length}
                </span>
              </div>

              <p className="text-sm font-medium text-slate-100">
                {currentPhoto.caption}
              </p>

              <p className="text-xs text-slate-400 line-clamp-1 italic">
                Projet : {currentPhoto.projectTitle}
              </p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
