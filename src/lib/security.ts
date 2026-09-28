import { z } from 'zod';

// Formulaire de contact sécurisé
export const ContactSchema = z.object({
  fullName: z.string().min(2, "Le nom complet doit comporter au moins 2 caractères").max(100, "Nom trop long"),
  email: z.string().email("Adresse email invalide").max(150),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3, "Le sujet doit comporter au moins 3 caractères").max(150),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères").max(3000, "Message trop long"),
  honeypot: z.string().max(0, "Tentative de spam détectée").optional(), // Anti-bot
});

// Formulaire de Don sécurisé
export const DonationSchema = z.object({
  type: z.enum(['ponctuel', 'mensuel']),
  amount: z.number().min(1, "Le montant minimum est de 1 EUR ou 500 FCFA").max(500000),
  currency: z.enum(['EUR', 'XOF', 'USD']),
  donorName: z.string().min(2, "Le nom du donateur est requis").max(100),
  donorEmail: z.string().email("Email de confirmation valide requis"),
  donorPhone: z.string().max(30).optional(),
  allocation: z.enum(['general', 'education', 'sante', 'humanitaire', 'protection', 'autonomie']).default('general'),
  paymentMethod: z.enum(['card', 'paypal', 'mtn_money', 'moov_money', 'virement', 'kkiapay', 'celtiis_money']),
  anonymous: z.boolean().default(false),
  taxReceipt: z.boolean().default(true),
  address: z.string().max(250).optional(),
  transactionId: z.string().optional(),
});

// Formulaire de Parrainage
export const SponsorshipSchema = z.object({
  fullName: z.string().min(2, "Nom requis").max(100),
  email: z.string().email("Email valide requis"),
  phone: z.string().min(6, "Numéro de téléphone requis").max(30),
  monthlyAmount: z.number().min(15, "Minimum 15 EUR / mois"),
  focusArea: z.enum(['scolarite', 'sante_nutrition', 'orphelinat_complet']),
  message: z.string().max(1000).optional(),
});

// Formulaire de Bénévolat / Partenariat
export const VolunteerSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis").max(100),
  email: z.string().email("Email valide requis"),
  phone: z.string().min(6, "Numéro de téléphone requis").max(30),
  country: z.string().min(2, "Pays requis").max(60),
  type: z.enum(['benevole_terrain', 'benevole_distance', 'partenariat_ecole', 'partenariat_sante', 'mecenat_entreprise']),
  skills: z.string().min(5, "Veuillez décrire vos compétences ou proposition").max(2000),
  availability: z.string().max(100).optional(),
});

/**
 * Fonction d'assainissement de texte pour prévenir les failles XSS et les injections de balises
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Supprime les balises HTML < et >
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Générateur de référence de transaction sécurisée et unique
 */
export function generateTransactionReference(prefix: string = 'VH59'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}
