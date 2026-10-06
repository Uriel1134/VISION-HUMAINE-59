'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ExternalLink, 
  RefreshCw, 
  FolderHeart, 
  Camera, 
  Film, 
  Database, 
  Sparkles, 
  Layers, 
  MapPin, 
  Calendar,
  X,
  Play,
  ArrowUpRight,
  FileCheck,
  Search,
  LayoutDashboard,
  HeartHandshake,
  DollarSign,
  Users,
  Settings,
  Download,
  Filter,
  CheckCircle,
  Clock,
  Menu,
  ChevronRight,
  Phone,
  Mail,
  CreditCard,
  Building2,
  TrendingUp,
  Info,
  Folder,
  Image as ImageIcon
} from 'lucide-react';
import { 
  supabase, 
  isSupabaseConfigured, 
  getGalleryProjects, 
  uploadGalleryFile,
  getDonations,
  createDonation
} from '@/lib/supabase';
import { GALLERY_PROJECTS_DATA } from '@/lib/data';
import { GalleryProject, GalleryPhoto, DonationRecord } from '@/lib/types';

type AdminTab = 'overview' | 'gallery' | 'donations' | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('gallery');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Gallery state
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>('');
  const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(true);
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');

  // Donations state (Real data from Supabase)
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoadingDonations, setIsLoadingDonations] = useState<boolean>(true);
  const [donationSearchQuery, setDonationSearchQuery] = useState<string>('');
  const [donationFilterAllocation, setDonationFilterAllocation] = useState<string>('all');
  const [donationFilterStatus, setDonationFilterStatus] = useState<string>('all');
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);

  // Status & Sync
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isSyncingSupabase, setIsSyncingSupabase] = useState<boolean>(false);

  // Modals state (Gallery)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<GalleryProject | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // Modals state (Manual Donation)
  const [isManualDonationModalOpen, setIsManualDonationModalOpen] = useState<boolean>(false);
  const [manualDonationForm, setManualDonationForm] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amount: '50',
    currency: 'EUR',
    type: 'once' as 'once' | 'monthly',
    allocation: 'Fonds d\'action général',
    paymentMethod: 'Virement / Espèces',
    status: 'CONFIRMED' as 'CONFIRMED' | 'PENDING'
  });

  // Project Form
  const [projectForm, setProjectForm] = useState({
    id: '',
    title: '',
    shortTitle: '',
    location: '',
    department: '',
    edition: '',
    date: '',
    badge: '',
    description: ''
  });

  // Media Form
  const [mediaCaption, setMediaCaption] = useState<string>('');
  const [mediaAlt, setMediaAlt] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Check auth session
  useEffect(() => {
    const authSession = sessionStorage.getItem('vh59_admin_session');
    if (authSession !== 'authenticated') {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Load Projects & Media from Supabase
  const loadGalleryData = useCallback(async () => {
    setIsLoadingGallery(true);
    try {
      const data = await getGalleryProjects();
      setProjects(data);
      if (data.length > 0 && !activeProjectId) {
        setActiveProjectId(data[0].id);
      }
    } catch (err: any) {
      console.error('Erreur chargement données galerie:', err);
      showStatus('error', 'Erreur lors du chargement de la galerie.');
    } finally {
      setIsLoadingGallery(false);
    }
  }, [activeProjectId]);

  // Load Donations strictly from Supabase database
  const loadDonationsData = useCallback(async () => {
    setIsLoadingDonations(true);
    try {
      const data = await getDonations();
      setDonations(data);
    } catch (err: any) {
      console.error('Erreur chargement dons:', err);
    } finally {
      setIsLoadingDonations(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadGalleryData();
      loadDonationsData();
    }
  }, [isAuthenticated, loadGalleryData, loadDonationsData]);

  const showStatus = (type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vh59_admin_session');
    router.replace('/admin/login');
  };

  // Active Project Helper
  const currentProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || projects[0] || null;
  }, [projects, activeProjectId]);

  // Filtered Categories
  const filteredProjects = useMemo(() => {
    if (!categorySearchQuery.trim()) return projects;
    const q = categorySearchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortTitle.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q)
    );
  }, [projects, categorySearchQuery]);

  // Gallery Counts
  const totalPhotos = useMemo(() => {
    return projects.reduce((acc, p) => acc + (p.photos?.length || 0), 0);
  }, [projects]);

  const totalVideos = useMemo(() => {
    return projects.reduce((acc, p) => {
      return acc + (p.photos?.filter(m => m.mediaType === 'video' || m.src.endsWith('.mp4')).length || 0);
    }, 0);
  }, [projects]);

  // Real Donation Stats
  const donationStats = useMemo(() => {
    const totalEUR = donations
      .filter(d => d.status === 'CONFIRMED')
      .reduce((acc, d) => {
        if (d.currency === 'XOF' || d.currency === 'FCFA') {
          return acc + (d.amount / 655.957);
        }
        return acc + d.amount;
      }, 0);

    const totalFCFA = Math.round(totalEUR * 655.957);
    const confirmedCount = donations.filter(d => d.status === 'CONFIRMED').length;
    const pendingCount = donations.filter(d => d.status === 'PENDING').length;
    const avgDonation = confirmedCount > 0 ? Math.round(totalEUR / confirmedCount) : 0;

    return {
      totalEUR: Math.round(totalEUR),
      totalFCFA,
      confirmedCount,
      pendingCount,
      totalDonors: donations.length,
      avgDonation
    };
  }, [donations]);

  // Filtered Donations
  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const matchSearch = 
        d.donorName.toLowerCase().includes(donationSearchQuery.toLowerCase()) ||
        d.donorEmail.toLowerCase().includes(donationSearchQuery.toLowerCase()) ||
        d.reference.toLowerCase().includes(donationSearchQuery.toLowerCase()) ||
        (d.donorPhone && d.donorPhone.includes(donationSearchQuery));
      
      const matchAlloc = donationFilterAllocation === 'all' || d.allocation.toLowerCase().includes(donationFilterAllocation.toLowerCase());
      const matchStatus = donationFilterStatus === 'all' || d.status === donationFilterStatus;

      return matchSearch && matchAlloc && matchStatus;
    });
  }, [donations, donationSearchQuery, donationFilterAllocation, donationFilterStatus]);

  // Export CSV
  const handleExportCSV = () => {
    if (filteredDonations.length === 0) {
      showStatus('info', 'Aucune donnée à exporter.');
      return;
    }
    const headers = ['Reference', 'Date', 'Nom Donateur', 'Email', 'Telephone', 'Montant EUR', 'Type', 'Affectation', 'Paiement', 'Statut'];
    const rows = filteredDonations.map(d => [
      d.reference,
      new Date(d.createdAt).toLocaleDateString('fr-FR'),
      `"${d.donorName.replace(/"/g, '""')}"`,
      d.donorEmail,
      d.donorPhone || '',
      d.amount,
      d.type === 'monthly' ? 'Mensuel' : 'Ponctuel',
      `"${d.allocation.replace(/"/g, '""')}"`,
      `"${d.paymentMethod.replace(/"/g, '""')}"`,
      d.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `donateurs_vision_humaine_59_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus('success', 'Export CSV généré et téléchargé.');
  };

  // Open Project Modal
  const openProjectModal = (proj?: GalleryProject) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        id: proj.id,
        title: proj.title,
        shortTitle: proj.shortTitle,
        location: proj.location,
        department: proj.department,
        edition: proj.edition,
        date: proj.date,
        badge: proj.badge,
        description: proj.description
      });
    } else {
      setEditingProject(null);
      const generatedId = `mission-${Date.now()}`;
      setProjectForm({
        id: generatedId,
        title: '',
        shortTitle: '',
        location: '',
        department: '',
        edition: '',
        date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
        badge: '',
        description: ''
      });
    }
    setIsProjectModalOpen(true);
  };

  // Save Project in Supabase & Local State
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.shortTitle.trim()) {
      showStatus('error', 'Veuillez remplir au moins le titre et le titre court.');
      return;
    }

    try {
      if (supabase && isSupabaseConfigured()) {
        const payload = {
          id: projectForm.id,
          title: projectForm.title,
          short_title: projectForm.shortTitle,
          location: projectForm.location,
          department: projectForm.department,
          edition: projectForm.edition,
          date: projectForm.date,
          badge: projectForm.badge,
          description: projectForm.description
        };

        const { error } = await supabase
          .from('gallery_projects')
          .upsert(payload);

        if (error) throw error;
      }

      setProjects((prev) => {
        const exists = prev.some((p) => p.id === projectForm.id);
        if (exists) {
          return prev.map((p) => (p.id === projectForm.id ? { ...p, ...projectForm } : p));
        } else {
          const newProj: GalleryProject = {
            ...projectForm,
            photos: []
          };
          return [...prev, newProj];
        }
      });

      setActiveProjectId(projectForm.id);
      setIsProjectModalOpen(false);
      showStatus('success', `Projet « ${projectForm.shortTitle} » enregistré avec succès !`);
    } catch (err: any) {
      console.error('Error saving project:', err);
      showStatus('error', `Erreur lors de l'enregistrement : ${err.message || err}`);
    }
  };

  // Delete Project from Supabase
  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie « ${projectTitle} » et tous ses médias associés ?`)) {
      return;
    }

    try {
      if (supabase && isSupabaseConfigured()) {
        const { error } = await supabase
          .from('gallery_projects')
          .delete()
          .eq('id', projectId);

        if (error) throw error;
      }

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      if (activeProjectId === projectId) {
        const remaining = projects.filter((p) => p.id !== projectId);
        if (remaining.length > 0) {
          setActiveProjectId(remaining[0].id);
        }
      }
      showStatus('success', 'Catégorie supprimée avec succès.');
    } catch (err: any) {
      console.error('Error deleting project:', err);
      showStatus('error', `Erreur lors de la suppression : ${err.message}`);
    }
  };

  // Upload Media
  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      showStatus('error', 'Veuillez sélectionner au moins un fichier image ou vidéo.');
      return;
    }

    if (!activeProjectId) {
      showStatus('error', 'Veuillez d\'abord sélectionner une catégorie de projet.');
      return;
    }

    setUploadingFiles(true);
    setUploadProgress(`Préparation de l'upload de ${selectedFiles.length} fichier(s)...`);

    try {
      const newMediaList: GalleryPhoto[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setUploadProgress(`Upload du fichier ${i + 1}/${selectedFiles.length} : ${file.name}...`);

        const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov)$/i);
        let publicUrl = '';

        if (supabase && isSupabaseConfigured()) {
          const uploadedUrl = await uploadGalleryFile(file);
          if (uploadedUrl) {
            publicUrl = uploadedUrl;
          }
        }

        if (!publicUrl) {
          publicUrl = URL.createObjectURL(file);
        }

        const mediaItem: GalleryPhoto = {
          id: `media-${Date.now()}-${i}`,
          src: publicUrl,
          caption: mediaCaption || file.name.replace(/\.[^/.]+$/, ''),
          alt: mediaAlt || file.name.replace(/\.[^/.]+$/, ''),
          mediaType: isVideo ? 'video' : 'image'
        };

        if (supabase && isSupabaseConfigured()) {
          const { error: dbError } = await supabase
            .from('gallery_media')
            .insert({
              id: mediaItem.id,
              project_id: activeProjectId,
              src: mediaItem.src,
              caption: mediaItem.caption,
              alt: mediaItem.alt,
              media_type: mediaItem.mediaType,
              order_index: (currentProject?.photos?.length || 0) + i
            });

          if (dbError) {
            console.warn('DB Media Insert Warning:', dbError);
          }
        }

        newMediaList.push(mediaItem);
      }

      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id === activeProjectId) {
            return {
              ...proj,
              photos: [...(proj.photos || []), ...newMediaList]
            };
          }
          return proj;
        })
      );

      setIsUploadModalOpen(false);
      setSelectedFiles(null);
      setMediaCaption('');
      setMediaAlt('');
      showStatus('success', `${newMediaList.length} média(s) ajouté(s) avec succès !`);
    } catch (err: any) {
      console.error('Upload error:', err);
      showStatus('error', `Erreur lors de l'upload : ${err.message || err}`);
    } finally {
      setUploadingFiles(false);
      setUploadProgress('');
    }
  };

  // Delete Media
  const handleDeleteMedia = async (mediaId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return;

    try {
      if (supabase && isSupabaseConfigured()) {
        await supabase
          .from('gallery_media')
          .delete()
          .eq('id', mediaId);
      }

      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id === activeProjectId) {
            return {
              ...proj,
              photos: proj.photos.filter((m) => m.id !== mediaId)
            };
          }
          return proj;
        })
      );

      showStatus('success', 'Média supprimé avec succès.');
    } catch (err: any) {
      console.error('Delete media error:', err);
      showStatus('error', `Erreur lors de la suppression : ${err.message}`);
    }
  };

  // Add Manual Donation into Supabase
  const handleSaveManualDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualDonationForm.donorName.trim() || !manualDonationForm.amount) {
      showStatus('error', 'Veuillez renseigner au moins le nom du donateur et le montant.');
      return;
    }

    const ref = `VH59-DIR-${Date.now().toString().slice(-6)}`;
    const newDonation: DonationRecord = {
      id: ref,
      reference: ref,
      transactionId: `REC-${Date.now().toString().slice(-6)}`,
      donorName: manualDonationForm.donorName.trim(),
      donorEmail: manualDonationForm.donorEmail.trim() || 'contact@donateur.org',
      donorPhone: manualDonationForm.donorPhone.trim() || undefined,
      amount: parseFloat(manualDonationForm.amount) || 50,
      currency: manualDonationForm.currency,
      type: manualDonationForm.type,
      allocation: manualDonationForm.allocation,
      paymentMethod: manualDonationForm.paymentMethod,
      status: manualDonationForm.status,
      createdAt: new Date().toISOString()
    };

    try {
      if (supabase && isSupabaseConfigured()) {
        await createDonation(newDonation);
      }
      setDonations(prev => [newDonation, ...prev]);
      setIsManualDonationModalOpen(false);
      setManualDonationForm({
        donorName: '',
        donorEmail: '',
        donorPhone: '',
        amount: '50',
        currency: 'EUR',
        type: 'once',
        allocation: 'Fonds d\'action général',
        paymentMethod: 'Virement / Espèces',
        status: 'CONFIRMED'
      });
      showStatus('success', `Don de ${newDonation.amount} ${newDonation.currency} enregistré pour ${newDonation.donorName} !`);
    } catch (err: any) {
      showStatus('error', `Erreur enregistrement don: ${err.message}`);
    }
  };

  // Sync All Existing Data to Supabase (Categories & Medias)
  const handleSyncToSupabase = async () => {
    if (!supabase || !isSupabaseConfigured()) {
      showStatus('error', 'Supabase n\'est pas encore configuré.');
      return;
    }

    if (!window.confirm('Voulez-vous synchroniser et stocker toutes les catégories et médias existants du site directement dans votre base Supabase ?')) {
      return;
    }

    setIsSyncingSupabase(true);
    showStatus('info', 'Enregistrement de tous les projets dans Supabase...');

    try {
      let projectsCount = 0;
      let mediaCount = 0;

      for (let i = 0; i < GALLERY_PROJECTS_DATA.length; i++) {
        const p = GALLERY_PROJECTS_DATA[i];
        const { error: pErr } = await supabase
          .from('gallery_projects')
          .upsert({
            id: p.id,
            title: p.title,
            short_title: p.shortTitle,
            location: p.location,
            department: p.department,
            edition: p.edition,
            date: p.date,
            description: p.description,
            badge: p.badge,
            order_index: i
          });

        if (pErr) throw pErr;
        projectsCount++;

        if (p.photos && p.photos.length > 0) {
          const mediaRows = p.photos.map((m, idx) => ({
            id: `${p.id}-media-${idx}`,
            project_id: p.id,
            src: m.src,
            caption: m.caption || '',
            alt: m.alt || '',
            media_type: m.mediaType || (m.src.endsWith('.mp4') ? 'video' : 'image'),
            order_index: idx
          }));

          const { error: mErr } = await supabase
            .from('gallery_media')
            .upsert(mediaRows);

          if (mErr) console.warn('Media sync warning:', mErr);
          else mediaCount += mediaRows.length;
        }
      }

      await loadGalleryData();
      showStatus('success', `Base de données à jour : ${projectsCount} catégories et ${mediaCount} médias enregistrés dans Supabase !`);
    } catch (err: any) {
      console.error('Sync error:', err);
      showStatus('error', `Erreur de synchronisation : ${err.message || err}`);
    } finally {
      setIsSyncingSupabase(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-teal-600" />
          <span className="font-medium text-slate-600">Vérification de la session administrateur...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row antialiased">
      {/* Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium border backdrop-blur-md ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-900/10'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200 shadow-rose-900/10'
                : 'bg-teal-50 text-teal-800 border-teal-200 shadow-teal-900/10'
            }`}
          >
            {statusMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {statusMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            {statusMessage.type === 'info' && <RefreshCw className="w-5 h-5 text-teal-600 animate-spin shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 p-0.5">
            <Image src="/images/logo.jpg" alt="Logo" fill className="object-contain" priority />
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-900">VISION HUMAINE 59</h1>
            <p className="text-[10px] text-teal-700 font-semibold tracking-wider uppercase">Tableau de bord</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR (WHITE / LIGHT THEME) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 md:translate-x-0 md:static shadow-sm ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm shrink-0">
            <Image src="/images/logo.jpg" alt="Logo Vision Humaine 59" fill className="object-cover" priority />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-slate-900 tracking-tight leading-tight truncate">
              VISION HUMAINE 59
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                Espace Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            Gestion Principale
          </div>

          <button
            onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'gallery'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200/80 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Camera className={`w-4 h-4 ${activeTab === 'gallery' ? 'text-teal-700' : 'text-slate-600'}`} />
              <span>Médiathèque & Galerie</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('donations'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'donations'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200/80 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <HeartHandshake className={`w-4 h-4 ${activeTab === 'donations' ? 'text-teal-700' : 'text-slate-600'}`} />
              <span>Dons & Donateurs</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {donations.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200/80 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'overview' ? 'text-teal-700' : 'text-slate-600'}`} />
              <span>Tableau de bord</span>
            </div>
            {activeTab === 'overview' && <ChevronRight className="w-4 h-4 text-teal-700" />}
          </button>

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            Paramètres & Base
          </div>

          <button
            onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'settings'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200/80 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-teal-700' : 'text-slate-600'}`} />
              <span>Paramètres & Supabase</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm"
          >
            <span>Voir le site public</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50/50">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {activeTab === 'gallery' && 'Gestion de la Médiathèque & Galerie'}
              {activeTab === 'donations' && 'Gestion des Dons & Donateurs'}
              {activeTab === 'overview' && 'Tableau de bord général'}
              {activeTab === 'settings' && 'Paramètres de la base de données'}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              ONG VISION HUMAINE 59 • Espace d'administration
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'gallery' && (
              <>
                <button
                  onClick={() => openProjectModal()}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-teal-700" />
                  <span>Nouvelle Catégorie</span>
                </button>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Uploader Médias</span>
                </button>
              </>
            )}

            {activeTab === 'donations' && (
              <button
                onClick={() => setIsManualDonationModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Enregistrer un don</span>
              </button>
            )}

            <button
              onClick={() => {
                if (activeTab === 'donations') loadDonationsData();
                if (activeTab === 'gallery') loadGalleryData();
                showStatus('info', 'Données actualisées depuis la base.');
              }}
              title="Actualiser les données"
              className="p-2.5 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          {/* ========================================================================= */}
          {/* TAB: GALLERY & MEDIATHEQUE (MASTER-DETAIL 2-COLUMN EXPLORER UX) */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: Categories Explorer Panel */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-teal-700" />
                    <h3 className="font-bold text-sm text-slate-900">Catégories & Missions</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                    {projects.length}
                  </span>
                </div>

                {/* Search Bar for Categories */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrer les catégories..."
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                {/* Add Category Quick Button */}
                <button
                  onClick={() => openProjectModal()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs border border-teal-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-teal-700" />
                  <span>Créer une nouvelle catégorie</span>
                </button>

                {/* Vertical Categories List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {filteredProjects.map((proj) => {
                    const isActive = proj.id === activeProjectId;
                    const photoCount = proj.photos?.length || 0;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => setActiveProjectId(proj.id)}
                        className={`w-full text-left p-3.5 rounded-xl transition-all flex flex-col gap-1.5 border relative ${
                          isActive
                            ? 'bg-teal-50/80 border-teal-300 text-slate-900 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-teal-600 rounded-r-full"></span>
                        )}

                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs line-clamp-1 text-slate-900">
                            {proj.shortTitle}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {photoCount} média{photoCount > 1 ? 's' : ''}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-1">
                          {proj.title}
                        </p>

                        <div className="flex items-center gap-3 text-[10px] text-slate-600 pt-0.5">
                          {proj.location && (
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-teal-700 shrink-0" />
                              {proj.location}
                            </span>
                          )}
                          {proj.date && (
                            <span className="flex items-center gap-1 shrink-0">
                              <Calendar className="w-3 h-3 text-teal-700 shrink-0" />
                              {proj.date}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: Active Category Content & Media Grid */}
              <div className="lg:col-span-8 space-y-6">
                {currentProject ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    {/* Header Details */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          {currentProject.badge && (
                            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                              {currentProject.badge}
                            </span>
                          )}
                          <span className="text-xs text-slate-600 font-medium">
                            {currentProject.photos?.length || 0} média(s) actifs
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                          {currentProject.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                          {currentProject.location && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-teal-700" />
                              {currentProject.location} {currentProject.department ? `(${currentProject.department})` : ''}
                            </span>
                          )}
                          {currentProject.date && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <Calendar className="w-3.5 h-3.5 text-teal-700" />
                              {currentProject.date}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
                        <button
                          onClick={() => openProjectModal(currentProject)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 border border-slate-200 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-teal-700" />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(currentProject.id, currentProject.title)}
                          className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center gap-2 border border-rose-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Supprimer</span>
                        </button>
                        <button
                          onClick={() => setIsUploadModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>Ajouter des médias</span>
                        </button>
                      </div>
                    </div>

                    {/* Mission Description */}
                    {currentProject.description && (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1">
                          Description de l'action humanitaire
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {currentProject.description}
                        </p>
                      </div>
                    )}

                    {/* Photos & Videos Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-teal-700" />
                          <span>Photos & Vidéos ({currentProject.photos?.length || 0})</span>
                        </h3>
                      </div>

                      {(!currentProject.photos || currentProject.photos.length === 0) ? (
                        <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                          <Camera className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                          <h4 className="text-sm font-semibold text-slate-700">Aucun média dans cet album</h4>
                          <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                            Uploadez des photos ou vidéos prises sur le terrain pour les afficher sur le site.
                          </p>
                          <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-teal-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:bg-teal-700"
                          >
                            Uploader maintenant
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {currentProject.photos.map((media) => {
                            const isVideo = media.mediaType === 'video' || media.src.endsWith('.mp4');
                            return (
                              <div
                                key={media.id}
                                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-teal-400 transition-all flex flex-col"
                              >
                                <div className="relative aspect-[4/3] bg-slate-100">
                                  {isVideo ? (
                                    <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
                                      <video src={media.src} className="w-full h-full object-cover" preload="metadata" />
                                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg">
                                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                                        </div>
                                      </div>
                                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-white flex items-center gap-1">
                                        <Film className="w-2.5 h-2.5" /> VIDÉO
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="w-full h-full relative">
                                      <Image
                                        src={media.src}
                                        alt={media.alt || 'Photo galerie'}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                      />
                                    </div>
                                  )}

                                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                                    <button
                                      onClick={() => handleDeleteMedia(media.id)}
                                      title="Supprimer ce média"
                                      className="p-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-md"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>

                                <div className="p-2.5 bg-white flex-1 flex flex-col justify-between border-t border-slate-100">
                                  <p className="text-[11px] font-medium text-slate-800 line-clamp-1" title={media.caption}>
                                    {media.caption || 'Sans légende'}
                                  </p>
                                  <span className="text-[9px] text-slate-600 mt-1 truncate block font-mono">
                                    {media.src.split('/').pop()?.slice(0, 20)}...
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-600">
                    <Folder className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">Sélectionnez une catégorie à gauche</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: DONATIONS & DONORS */}
          {/* ========================================================================= */}
          {activeTab === 'donations' && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, email, téléphone, référence..."
                    value={donationSearchQuery}
                    onChange={(e) => setDonationSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <select
                    value={donationFilterAllocation}
                    onChange={(e) => setDonationFilterAllocation(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
                  >
                    <option value="all">Toutes les causes</option>
                    <option value="Santé">Santé & Médical</option>
                    <option value="Éducation">Éducation & Scolaire</option>
                    <option value="Orphelinats">Orphelinats</option>
                    <option value="Eau">Eau Potable & Forages</option>
                    <option value="Fonds">Fonds général</option>
                  </select>

                  <select
                    value={donationFilterStatus}
                    onChange={(e) => setDonationFilterStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="CONFIRMED">Confirmé</option>
                    <option value="PENDING">En attente</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-teal-700" />
                    <span>Exporter CSV</span>
                  </button>

                  <button
                    onClick={() => setIsManualDonationModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouveau Don</span>
                  </button>
                </div>
              </div>

              {/* Donations Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5">Donateur</th>
                        <th className="px-5 py-3.5">Contact</th>
                        <th className="px-5 py-3.5">Montant</th>
                        <th className="px-5 py-3.5">Type & Cause</th>
                        <th className="px-5 py-3.5">Moyen de paiement</th>
                        <th className="px-5 py-3.5">Statut</th>
                        <th className="px-5 py-3.5">Date</th>
                        <th className="px-5 py-3.5 text-right">Détails</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDonations.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center text-slate-600">
                            <HeartHandshake className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                            <p className="font-semibold text-slate-700">Aucun donateur trouvé en base de données</p>
                            <p className="text-[11px] text-slate-600 mt-1">
                              Tous les dons réels effectués par les donateurs s'afficheront ici en direct.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredDonations.map((d) => (
                          <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4 font-semibold text-slate-900">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px]">
                                  {d.donorName.slice(0, 2).toUpperCase()}
                                </div>
                                <span>{d.donorName}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              <div className="flex flex-col">
                                <span className="flex items-center gap-1.5 text-slate-700">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  {d.donorEmail}
                                </span>
                                {d.donorPhone && (
                                  <span className="flex items-center gap-1.5 text-slate-600 text-[11px] mt-0.5">
                                    <Phone className="w-3 h-3 text-slate-400" />
                                    {d.donorPhone}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-bold text-emerald-600 text-sm">
                                {d.amount} {d.currency}
                              </div>
                              <div className="text-[10px] text-slate-600">
                                ≈ {Math.round(d.amount * 655.957).toLocaleString('fr-FR')} FCFA
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-medium text-slate-800 block truncate max-w-[160px]">
                                {d.allocation}
                              </span>
                              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-md font-semibold mt-1 ${
                                d.type === 'monthly' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {d.type === 'monthly' ? 'Don Mensuel' : 'Ponctuel'}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-600 text-[11px]">
                              <span className="flex items-center gap-1 text-slate-800">
                                <CreditCard className="w-3 h-3 text-slate-400" />
                                {d.paymentMethod}
                              </span>
                              <span className="text-[10px] text-slate-600 font-mono block mt-0.5">
                                {d.reference}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                d.status === 'CONFIRMED'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {d.status === 'CONFIRMED' ? (
                                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Clock className="w-3 h-3 text-amber-600" />
                                )}
                                {d.status === 'CONFIRMED' ? 'Confirmé' : 'En attente'}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              {new Date(d.createdAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => setSelectedDonation(d)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-colors"
                              >
                                Reçu
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Récolté</span>
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {donationStats.totalEUR.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-xs text-teal-700 font-semibold mt-1">
                      ≈ {donationStats.totalFCFA.toLocaleString('fr-FR')} FCFA
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Donateurs Enregistrés</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {donationStats.totalDonors}
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{donationStats.confirmedCount} dons confirmés</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Catégories & Missions</span>
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {projects.length}
                    </div>
                    <div className="text-xs text-sky-600 font-semibold mt-1">
                      Missions & Campagnes humanitaires
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Photos & Vidéos</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                      <Camera className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {totalPhotos}
                    </div>
                    <div className="text-xs text-amber-600 font-semibold mt-1">
                      dont {totalVideos} vidéos immersives
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: SETTINGS & SUPABASE */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Connexion Supabase</h3>
                      <p className="text-xs text-slate-600">Stockage et synchronisation en temps réel</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Connecté & Opérationnel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">URL Supabase</span>
                    <p className="text-xs font-mono text-teal-800 truncate">
                      {process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uaacpwibpdqcxgetxbzx.supabase.co'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Bucket Médias</span>
                    <p className="text-xs font-mono text-teal-800">
                      gallery-media
                    </p>
                  </div>
                </div>

                {/* Database Sync action */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-700" />
                      Synchroniser tous les projets existants en base de données
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-xl">
                      Permet d'enregistrer et d'alimenter directement la base Supabase avec les 7 catégories de missions et leurs médias pour qu'ils soient 100% gérables dynamiquement.
                    </p>
                  </div>

                  <button
                    onClick={handleSyncToSupabase}
                    disabled={isSyncingSupabase}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm disabled:opacity-50 shrink-0"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isSyncingSupabase ? 'Synchronisation...' : 'Enregistrer en base'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL: PROJECT CREATE / EDIT */}
      {/* ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderHeart className="w-5 h-5 text-teal-700" />
                <span>{editingProject ? 'Modifier la catégorie' : 'Créer une nouvelle catégorie'}</span>
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Titre complet de la mission *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Don de Vivres & Vêtements aux Orphelinats de Ouidah"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Titre court (onglet) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Orphelinat Ouidah"
                    value={projectForm.shortTitle}
                    onChange={(e) => setProjectForm({ ...projectForm, shortTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Humanitaire 2026, Éducation..."
                    value={projectForm.badge}
                    onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lieu
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Ouidah, Allada..."
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Département
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Atlantique, Littoral..."
                    value={projectForm.department}
                    onChange={(e) => setProjectForm({ ...projectForm, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date / Année
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Mars 2026"
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description de l'impact
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez les résultats de la mission, les bénéficiaires et les kits distribués..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  {editingProject ? 'Enregistrer les modifications' : 'Créer la catégorie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MEDIA UPLOAD */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-teal-700" />
                <span>Uploader des Médias (Photos / Vidéos)</span>
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catégorie de destination
                </label>
                <select
                  value={activeProjectId}
                  onChange={(e) => setActiveProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.shortTitle} — {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sélectionner les fichiers (Photos ou Vidéos MP4) *
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-teal-500 rounded-xl p-6 text-center bg-slate-50 cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    required
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-teal-700 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-700">
                    {selectedFiles && selectedFiles.length > 0
                      ? `${selectedFiles.length} fichier(s) sélectionné(s)`
                      : 'Cliquez ou glissez-déposez vos photos ou vidéos'}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Multi-sélection • Formats JPG, PNG, MP4 supportés
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Légende globale (Optionnel)
                </label>
                <input
                  type="text"
                  placeholder="ex: Distribution des vivres aux orphelins"
                  value={mediaCaption}
                  onChange={(e) => setMediaCaption(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              {uploadingFiles && (
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-teal-700 animate-spin shrink-0" />
                  <span>{uploadProgress || 'Upload en cours...'}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={uploadingFiles}
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploadingFiles || !selectedFiles || selectedFiles.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {uploadingFiles ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Upload en cours...</span>
                    </>
                  ) : (
                    <span>Lancer l'upload</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MANUAL DONATION CREATION */}
      {/* ========================================================================= */}
      {isManualDonationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-teal-700" />
                <span>Enregistrer un Don (Direct / Manuel)</span>
              </h3>
              <button
                onClick={() => setIsManualDonationModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualDonation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom & Prénom du donateur / Entreprise *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Dr. Marie ADANHOUN"
                  value={manualDonationForm.donorName}
                  onChange={(e) => setManualDonationForm({ ...manualDonationForm, donorName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="marie@email.com"
                    value={manualDonationForm.donorEmail}
                    onChange={(e) => setManualDonationForm({ ...manualDonationForm, donorEmail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+229 97 00 00 00"
                    value={manualDonationForm.donorPhone}
                    onChange={(e) => setManualDonationForm({ ...manualDonationForm, donorPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Montant *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={manualDonationForm.amount}
                    onChange={(e) => setManualDonationForm({ ...manualDonationForm, amount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Devise
                  </label>
                  <select
                    value={manualDonationForm.currency}
                    onChange={(e) => setManualDonationForm({ ...manualDonationForm, currency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="FCFA">FCFA (XOF)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Affectation du don
                  </label>
                  <select
                    value={manualDonationForm.allocation}
                    onChange={(e) => setManualDonationForm({ ...manualDonationForm, allocation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="Fonds d'action général">Fonds d'action général</option>
                    <option value="Santé & Matériel Médical">Santé & Matériel Médical</option>
                    <option value="Éducation & Kits Scolaires">Éducation & Kits Scolaires</option>
                    <option value="Orphelinats & Nutrition">Orphelinats & Nutrition</option>
                    <option value="Eau Potable & Forages">Eau Potable & Forages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Moyen de paiement
                  </label>
                  <select
                    value={manualDonationForm.paymentMethod}
                    onChange={(e) => setManualDonationForm({ ...manualDonationForm, paymentMethod: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="Virement Bancaire">Virement Bancaire</option>
                    <option value="Espèces / Caisse ONG">Espèces / Caisse ONG</option>
                    <option value="Mobile Money (MTN/Moov)">Mobile Money (MTN/Moov)</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualDonationModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  Enregistrer le don
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DONATION RECEIPT VIEW */}
      {/* ========================================================================= */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span>Détail du Don</span>
              </h3>
              <button
                onClick={() => setSelectedDonation(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-600">Montant</span>
                  <div className="text-2xl font-black text-emerald-600">
                    {selectedDonation.amount} {selectedDonation.currency}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {selectedDonation.status}
                </span>
              </div>

              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Référence :</span>
                  <span className="font-mono text-slate-900 font-semibold">{selectedDonation.reference}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Donateur :</span>
                  <span className="text-slate-900 font-semibold">{selectedDonation.donorName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Email :</span>
                  <span className="text-slate-900">{selectedDonation.donorEmail}</span>
                </div>
                {selectedDonation.donorPhone && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Téléphone :</span>
                    <span className="text-slate-900">{selectedDonation.donorPhone}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Affectation :</span>
                  <span className="text-teal-800 font-semibold">{selectedDonation.allocation}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Mode :</span>
                  <span className="text-slate-900">{selectedDonation.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Date :</span>
                  <span className="text-slate-900">
                    {new Date(selectedDonation.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedDonation(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
