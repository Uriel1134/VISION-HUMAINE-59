'use client';

import React, { useState } from 'react';
import { 
  Users, 
  HeartHandshake, 
  Building2, 
  GraduationCap, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';
import { VolunteerSchema } from '@/lib/security';

export default function AgirPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Bénin',
    type: 'benevole_terrain' as 'benevole_terrain' | 'benevole_distance' | 'partenariat_ecole' | 'partenariat_sante' | 'mecenat_entreprise',
    skills: '',
    availability: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const parseResult = VolunteerSchema.safeParse(formData);
    if (!parseResult.success) {
      setErrorMessage(parseResult.error.errors[0]?.message || 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: `Candidature / Partenariat: ${formData.type} (${formData.country})`,
          message: `Type d'engagement: ${formData.type}\nPays: ${formData.country}\nDisponibilités: ${formData.availability || 'Non spécifiées'}\nCompétences et motivations:\n${formData.skills}`,
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi de la candidature.');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de la transmission de votre dossier. Veuillez réessayer.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Rejoindre la Communauté Solidaire</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Agir avec VISION HUMAINE 59
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Que vous soyez bénévole de terrain, professionnel de santé, enseignant, représentant d&apos;école ou entreprise mécène, votre engagement est précieux.
          </p>
        </div>

        {/* Action Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Bénévolat de Terrain
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Participez activement aux distributions de kits, aux campagnes médicales foraines, à l&apos;animation d&apos;ateliers et à la logistique au Bénin.
            </p>
            <span className="text-xs font-bold text-blue-700">Missions locales & terrain</span>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Bénévolat de Compétences
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Apportez votre expertise à distance en communication, levée de fonds, gestion de projets, traduction ou coordination médicale.
            </p>
            <span className="text-xs font-bold text-amber-700">Engagement flexible à distance</span>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Partenariats & Mécénat
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Écoles, centres de santé, orphelinats ou entreprises : unissons nos forces pour des programmes pérennes et certifiés.
            </p>
            <span className="text-xs font-bold text-emerald-700">Conventions de partenariat</span>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Rejoindre nos équipes ou proposer un partenariat
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8">
            Complétez vos informations ci-dessous. Nous revenons vers vous dans un délai de 48 heures.
          </p>

          {status === 'success' ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">
                Candidature / Proposition transmise avec succès !
              </h3>
              <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                Merci pour votre enthousiasme et votre volonté d&apos;aider. Notre équipe coordination prendra contact avec vous très rapidement.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-primary text-xs mt-2"
              >
                Soumettre un autre dossier
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Engagement Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Nature de votre démarche * :
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                >
                  <option value="benevole_terrain">Bénévolat actif sur le terrain (Bénin)</option>
                  <option value="benevole_distance">Bénévolat de compétences à distance</option>
                  <option value="partenariat_ecole">Partenariat Scolaire / Établissement d&apos;enseignement</option>
                  <option value="partenariat_sante">Partenariat Médical / Centre de Santé</option>
                  <option value="mecenat_entreprise">Mécénat d&apos;Entreprise / Fondation</option>
                </select>
              </div>

              {/* Personal details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom Complet ou Structure *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre.email@exemple.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+229 ... ou +33 ..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pays / Ville de résidence *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Ex : Bénin (Cotonou), France (Lille)..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vos compétences, expériences ou projet proposé *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Décrivez brièvement vos motivations, votre domaine d'expertise ou les synergies envisagées..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Disponibilités indicatives
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="Ex : Quelques heures par semaine, mission d'été, etc."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-[30px] font-bold text-white bg-[#292D77] hover:bg-[#1f225a] shadow-md transition-all active:scale-[0.98] text-base disabled:opacity-50"
                >
                  <span>{status === 'submitting' ? 'Envoi en cours...' : 'Transmettre ma candidature / proposition'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Protection des données conforme aux standards de confidentialité</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
