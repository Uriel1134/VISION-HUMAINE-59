'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  GraduationCap, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { SponsorshipSchema } from '@/lib/security';

export default function ParrainagePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    monthlyAmount: 30,
    focusArea: 'scolarite' as 'scolarite' | 'sante_nutrition' | 'orphelinat_complet',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const parseResult = SponsorshipSchema.safeParse(formData);
    if (!parseResult.success) {
      setErrorMessage(parseResult.error.errors[0]?.message || 'Veuillez vérifier les champs du formulaire.');
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
          subject: `Demande de Parrainage - ${formData.focusArea.toUpperCase()} (${formData.monthlyAmount}€/mois)`,
          message: `Montant mensuel souhaité: ${formData.monthlyAmount} EUR / mois.\nDomaine: ${formData.focusArea}\nMessage du parrain: ${formData.message || 'Aucun message additionnel'}`,
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de la transmission.');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen py-14 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#292D77] tracking-tight leading-[1.12]">
            Parrainer un Enfant <br />
            <span className="text-[#D72229]">avec VISION HUMAINE 59</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
            Offrez à un enfant vulnérable au Bénin la certitude d&apos;aller à l&apos;école, d&apos;être nourri et soigné. Suivez son évolution grâce à une correspondance régulière et transparente.
          </p>
        </div>

        {/* Steps of Sponsorship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-base mb-6 border border-blue-100">
                1
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2.5">
                Vous choisissez votre engagement
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Définissez votre contribution mensuelle (dès 30€/mois) et la priorité d&apos;accompagnement : scolarité, santé ou orphelinat.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Sans engagement de durée</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 font-extrabold flex items-center justify-center text-base mb-6 border border-amber-100">
                2
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2.5">
                Attribution & Premier dossier
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nos coordinateurs terrain au Bénin vous transmettent la fiche de votre filleul(e), son histoire et son lieu de scolarisation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Dossier 100% individualisé</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center text-base mb-6 border border-emerald-100">
                3
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2.5">
                Suivi semestriel & Correspondance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Recevez les bulletins scolaires, des lettres de votre filleul(e) et des bilans de santé pour mesurer l&apos;impact concret de votre geste.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Échanges de lettres & photos</span>
            </div>
          </div>
        </div>

        {/* Main Sponsorship Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Formulaire de demande de parrainage
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Remplissez ce formulaire sécurisé. Notre responsable du programme vous contactera sous 48h ouvrées.
            </p>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">
                  Demande de parrainage enregistrée avec succès !
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Merci du fond du cœur pour votre engagement. Notre équipe coordinatrice examine votre demande et vous transmettra votre livret de parrainage personnalisé.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary text-xs mt-2"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Amount Choice */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Montant de votre parrainage mensuel :
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[30, 45, 60].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setFormData({ ...formData, monthlyAmount: amt })}
                        className={`py-3 px-2 rounded-2xl text-center border font-extrabold text-sm transition-all ${
                          formData.monthlyAmount === amt
                            ? 'border-blue-700 bg-blue-50 text-blue-700 ring-2 ring-blue-700/20'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {amt} € / mois
                      </button>
                    ))}
                  </div>
                </div>

                {/* Focus Area */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Orientation prioritaire :
                  </label>
                  <select
                    value={formData.focusArea}
                    onChange={(e) => setFormData({ ...formData, focusArea: e.target.value as any })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    <option value="scolarite">Scolarité & Fournitures (Écoles partenaires)</option>
                    <option value="sante_nutrition">Santé, Soins & Nutrition infantile</option>
                    <option value="orphelinat_complet">Prise en charge globale en Orphelinat</option>
                  </select>
                </div>

                {/* User Info Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nom et Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex : Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Numéro de Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+229 97 00 00 00 ou +33 6 12 34 56 78"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mot d&apos;accompagnement ou préférences (optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez si vous avez des souhaits particuliers..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-[30px] font-bold text-white bg-[#292D77] hover:bg-[#1f225a] shadow-md transition-all active:scale-[0.98] text-xs sm:text-base disabled:opacity-50 whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">{status === 'submitting' ? 'Enregistrement sécurisé...' : 'Valider ma demande de parrainage'}</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Données confidentielles traitées sous protocole sécurisé</span>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Authentic Photo & Reassurances */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 rounded-3xl border border-blue-800 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Nos Engagements de Parrainage</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Pourquoi parrainer avec VISION HUMAINE 59 ?
              </h3>
              
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>100% individualisé</strong> : Un enfant identifié par son nom, sa photo et sa scolarité.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Liberté totale</strong> : Vous pouvez suspendre ou adapter votre parrainage à tout moment sans frais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Transparence financière</strong> : Reçu fiscal ou justificatif annuel de don transmis automatiquement.</span>
                </li>
              </ul>
            </div>

            {/* Authentic Photo Box */}
            <div className="relative rounded-3xl overflow-hidden h-72 border border-slate-200 bg-slate-900 shadow-md group">
              <Image
                src="/images/missions/parrainage-enfant.jpg"
                alt="Enfants parrainés par VISION HUMAINE 59"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-bold">« Éduquer un enfant, c&apos;est éclairer tout un avenir. »</p>
                <p className="text-slate-300 text-[11px] mt-0.5">VISION HUMAINE 59 &middot; Programmes de terrain au Bénin</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
