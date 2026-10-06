import { createClient } from '@supabase/supabase-js';
import { GalleryProject, GalleryPhoto, DonationRecord } from './types';
import { GALLERY_PROJECTS_DATA } from './data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-project.supabase.co' &&
    !supabaseUrl.includes('your-project')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all gallery projects with their media from Supabase.
 * Falls back to static GALLERY_PROJECTS_DATA if Supabase is not configured or empty.
 */
export async function getGalleryProjects(): Promise<GalleryProject[]> {
  if (!supabase) {
    return GALLERY_PROJECTS_DATA;
  }

  try {
    const { data: projects, error: projectsError } = await supabase
      .from('gallery_projects')
      .select(`
        id,
        title,
        short_title,
        location,
        department,
        edition,
        date,
        description,
        badge,
        order_index,
        gallery_media (
          id,
          src,
          caption,
          alt,
          media_type,
          order_index
        )
      `)
      .order('order_index', { ascending: true });

    if (projectsError || !projects || projects.length === 0) {
      console.warn('Using static fallback gallery data (Supabase empty or error):', projectsError?.message);
      return GALLERY_PROJECTS_DATA;
    }

    // Map database snake_case columns to TypeScript interface
    return projects.map((p: any) => ({
      id: p.id,
      title: p.title,
      shortTitle: p.short_title || p.title,
      location: p.location || '',
      department: p.department || '',
      edition: p.edition || '',
      date: p.date || '',
      description: p.description || '',
      badge: p.badge || '',
      photos: (p.gallery_media || [])
        .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0))
        .map((m: any) => ({
          id: m.id,
          src: m.src,
          caption: m.caption || '',
          alt: m.alt || '',
          mediaType: (m.media_type as 'image' | 'video') || 'image'
        }))
    }));
  } catch (err) {
    console.error('Error in getGalleryProjects:', err);
    return GALLERY_PROJECTS_DATA;
  }
}

/**
 * Fetch all donations directly from Supabase database.
 * No fake data: returns real database records.
 */
export async function getDonations(): Promise<DonationRecord[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Supabase donations query:', error?.message);
      return [];
    }

    return data.map((d: any) => ({
      id: d.id,
      reference: d.reference,
      transactionId: d.transaction_id || d.reference,
      donorName: d.donor_name,
      donorEmail: d.donor_email,
      donorPhone: d.donor_phone || '',
      amount: Number(d.amount),
      currency: d.currency || 'EUR',
      type: (d.type as 'once' | 'monthly') || 'once',
      allocation: d.allocation || 'Fonds général',
      paymentMethod: d.payment_method || 'KkiaPay',
      status: (d.status as 'CONFIRMED' | 'PENDING' | 'FAILED') || 'CONFIRMED',
      createdAt: d.created_at
    }));
  } catch (err) {
    console.error('Error fetching donations from Supabase:', err);
    return [];
  }
}

/**
 * Save a new donation to Supabase
 */
export async function createDonation(donation: DonationRecord): Promise<boolean> {
  if (!supabase) return false;

  try {
    const payload = {
      id: donation.id,
      reference: donation.reference,
      transaction_id: donation.transactionId,
      donor_name: donation.donorName,
      donor_email: donation.donorEmail,
      donor_phone: donation.donorPhone,
      amount: donation.amount,
      currency: donation.currency,
      type: donation.type,
      allocation: donation.allocation,
      payment_method: donation.paymentMethod,
      status: donation.status,
      created_at: donation.createdAt || new Date().toISOString()
    };

    const { error } = await supabase.from('donations').upsert(payload);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error creating donation in Supabase:', err);
    return false;
  }
}

/**
 * Upload a media file to Supabase Storage bucket 'gallery-media'
 */
export async function uploadGalleryFile(file: File): Promise<string | null> {
  if (!supabase) {
    throw new Error('Supabase n\'est pas encore configuré dans .env.local');
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanFileName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .toLowerCase();
  const filePath = `${Date.now()}_${cleanFileName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('gallery-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('gallery-media')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

