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
  HeartHandshake,
  FolderHeart,
  Camera,
  Play,
  Film
} from 'lucide-react';
import { GALLERY_PROJECTS_DATA } from '@/lib/data';
import { GalleryPhoto, GalleryProject } from '@/lib/types';

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

  // Flatten all photos/videos for easy indexing in lightbox
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

  // Filter projects by active tab
  const displayedProjects: GalleryProject[] = activeTab === 'all'
    ? GALLERY_PROJECTS_DATA
    : GALLERY_PROJECTS_DATA.filter((p) => p.id === activeTab);

  // Photos/videos visible in current tab view for lightbox navigation
  const displayedPhotos: FlatPhoto[] = activeTab === 'all'
    ? allPhotos
    : allPhotos.filter((p) => p.projectId === activeTab);

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
    <section className="py-20 sm:py-28 relative overflow-hidden" id="galerie">
      
      {/* Subtle ambient background lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-[#292D77] text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#D72229]" />
            <span>Médiathèque Terrain &middot; Photos & Vidéos Officielles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292D77] tracking-tight leading-[1.18]">
            Nos missions en images, <br />
            <span className="text-[#D72229]">regroupées par catégorie de projet</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
            Découvrez nos interventions humanitaires au Bénin et nos actions de sensibilisation. Chaque album documente l&apos;aide concrète et la vie de nos projets en photos et vidéos immersives.
          </p>
        </div>

        {/* Category Navigation Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-[30px] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-[#292D77] text-white shadow-md shadow-[#292D77]/20 scale-[1.02]'
                : 'bg-white text-slate-700 hover:text-[#292D77] hover:bg-slate-50 border border-slate-200 shadow-sm'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Toutes les catégories</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTab === 'all' ? 'bg-[#D72229] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {allPhotos.length}
            </span>
          </button>

          {GALLERY_PROJECTS_DATA.map((project) => {
            const isActive = activeTab === project.id;
            const videoCount = project.photos.filter((p) => p.mediaType === 'video').length;
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
                <FolderHeart className="w-3.5 h-3.5" />
                <span>{project.shortTitle}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-[#D72229] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {project.photos.length}
                  {videoCount > 0 && <span className="ml-1 opacity-90">({videoCount} 🎬)</span>}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grouped Category Sections */}
        <div className="space-y-12 sm:space-y-16">
          {displayedProjects.map((project, projIdx) => (
            <div 
              key={project.id}
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
            >
              {/* Category Header Card */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 mb-8 border-b border-slate-100">
                <div className="space-y-3 max-w-3xl">
                  {/* Category Badges */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#292D77] text-xs font-black uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#D72229]" />
                      {project.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <MapPin className="w-3 h-3 text-[#D72229]" />
                      {project.location} (Dépt. {project.department})
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {project.date}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#292D77] tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Media counter tag */}
                <div className="flex-shrink-0 flex items-center gap-2 self-start lg:self-center px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
                  <Camera className="w-4 h-4 text-[#292D77]" />
                  <span className="text-xs font-bold">
                    {project.photos.length} {project.photos.length > 1 ? 'médias réels' : 'média réel'}
                  </span>
                </div>
              </div>

              {/* Category Photos & Videos Grid */}
              <div className={`grid gap-5 ${
                project.photos.length === 1 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : project.photos.length === 3 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {project.photos.map((photo, pIdx) => {
                  const isVideo = photo.mediaType === 'video';
                  return (
                    <div
                      key={photo.id}
                      onClick={() => openLightbox(photo.id)}
                      className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-subtle hover:shadow-card-hover cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end min-h-[260px] sm:min-h-[280px]"
                    >
                      {/* Media (Image or Video preview) */}
                      {isVideo ? (
                        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                          <video
                            src={photo.src}
                            muted
                            playsInline
                            loop
                            onMouseOver={(e) => {
                              try { e.currentTarget.play(); } catch (_) {}
                            }}
                            onMouseOut={(e) => {
                              try {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              } catch (_) {}
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90"
                          />
                          {/* Centered Big Play Button Indicator */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 rounded-full bg-[#D72229]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-7 h-7 fill-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          priority={projIdx === 0 && pIdx === 0}
                        />
                      )}

                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 shadow-sm">
                            {project.shortTitle}
                          </span>
                          {isVideo && (
                            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#D72229] text-white text-[10px] font-extrabold shadow-sm">
                              <Film className="w-3 h-3" />
                              Vidéo
                            </span>
                          )}
                        </div>

                        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Bottom Caption & Meta */}
                      <div className="relative z-10 p-4 space-y-1 text-white pointer-events-none">
                        <p className="text-xs font-semibold text-slate-100 line-clamp-2 leading-relaxed">
                          {photo.caption}
                        </p>
                        
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium pt-1 border-t border-white/10">
                          <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          <span className="truncate">{project.location} ({project.department})</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#292D77] flex items-center justify-center flex-shrink-0 border border-blue-100">
              <HeartHandshake className="w-6 h-6 text-[#D72229]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#292D77]">
                100% de photos et vidéos authentiques et vérifiées sur le terrain
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Chaque mission humanitaire est documentée avec respect et totale transparence pour nos donateurs et partenaires.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#292D77] bg-blue-50 border border-blue-100 px-4 py-2 rounded-full whitespace-nowrap">
              Total : {allPhotos.length} médias réels (photos & vidéos) répartis en {GALLERY_PROJECTS_DATA.length} missions
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
            aria-label="Média précédent"
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
            aria-label="Média suivant"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Main Modal Content */}
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image / Video Box */}
            <div className="relative w-full h-[55vh] sm:h-[68vh] rounded-2xl overflow-hidden bg-black/60 shadow-2xl border border-white/10 flex items-center justify-center">
              {currentPhoto.mediaType === 'video' ? (
                <video
                  key={currentPhoto.src}
                  src={currentPhoto.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full max-h-[68vh] object-contain rounded-2xl"
                />
              ) : (
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>

            {/* Photo / Video Details Footer */}
            <div className="w-full mt-4 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#D72229] text-white text-[11px] font-extrabold uppercase tracking-wide">
                    {currentPhoto.projectShortTitle}
                  </span>
                  {currentPhoto.mediaType === 'video' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[11px] font-extrabold uppercase">
                      <Play className="w-3 h-3 fill-current" /> Vidéo HD
                    </span>
                  )}
                  <span className="text-xs text-slate-300 font-medium">
                    {currentPhoto.projectLocation} &middot; Dépt. {currentPhoto.projectDepartment}
                  </span>
                </div>

                <span className="text-xs text-slate-300 font-bold">
                  {currentPhoto.mediaType === 'video' ? 'Vidéo' : 'Photo'} {selectedPhotoIndex + 1} sur {displayedPhotos.length}
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

