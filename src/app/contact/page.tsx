'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Lock, 
  ShieldCheck,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { ContactSchema } from '@/lib/security';
import { NGO_INFO, FAQ_ITEMS } from '@/lib/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '', // anti spam bot trap
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.honeypot) {
      // Bot detected silently
      setStatus('success');
      return;
    }

    const parseResult = ContactSchema.safeParse(formData);
    if (!parseResult.success) {
      setErrorMessage(parseResult.error.errors[0]?.message || 'Veuillez vérifier vos informations.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi.');
      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou utiliser notre contact direct WhatsApp.');
    }
  };

  return (
    <div className="bg-[#FFFEFC] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Contactez VISION HUMAINE 59
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Une question sur nos missions, un don, un parrainage ou un partenariat ? Notre équipe associative est à votre disposition.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Coordonnées Officielles
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold">Siège & Antennes</strong>
                    <span className="text-slate-600 leading-relaxed">{NGO_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold">Téléphone & WhatsApp</strong>
                    <span className="text-slate-600 font-mono">{NGO_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold">Courrier Électronique</strong>
                    <span className="text-slate-600">{NGO_INFO.email}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-950">Assistance WhatsApp</p>
                    <p className="text-[11px] text-emerald-700">Réponse sous quelques heures</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/2290166007047?text=Bonjour%20VISION%20HUMAINE%2059,%20je%20souhaite%20vous%20contacter`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  Discuter
                </a>
              </div>

            </div>

            {/* Devise Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                Notre Devise
              </p>
              <p className="text-lg font-extrabold italic">
                « {NGO_INFO.tagline} »
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Ensemble, semons l&apos;espoir et cultivons l&apos;avenir pour chaque enfant.
              </p>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Envoyez-nous un message sécurisé
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Tous les messages sont traités en direct par notre secrétariat général.
            </p>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">
                  Message envoyé avec succès !
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Merci de nous avoir contactés. Nous reviendrons vers vous dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary text-xs mt-2"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Votre Nom Complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex : Koffi Mensah"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Votre Email *
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
                      Téléphone (Optionnel)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+229 ... ou +33 ..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Objet de votre demande *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex : Information don, Partenariat..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Votre Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Écrivez votre message ici..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-700"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-[30px] font-bold text-[#FFFEFC] bg-[#292D77] hover:bg-[#1B1E54] transition-all shadow-md active:scale-[0.98] text-xs sm:text-base disabled:opacity-50 whitespace-nowrap"
                  >
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{status === 'submitting' ? 'Envoi sécurisé en cours...' : 'Envoyer mon message'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Vos données sont protégées et ne sont jamais transmises à des tiers.</span>
                </div>

              </form>
            )}

          </div>

        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Tout ce que vous devez savoir
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
