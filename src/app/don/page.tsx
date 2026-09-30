'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Receipt, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  AlertCircle, 
  Check, 
  Info,
  HelpCircle,
  Percent,
  Sparkles,
  HeartHandshake,
  Printer,
  RotateCcw,
  FileText,
  BadgeCheck,
  Building2,
  ArrowLeft,
  Zap,
  GraduationCap,
  Stethoscope,
  Sprout
} from 'lucide-react';
import { DonationSchema, generateTransactionReference } from '@/lib/security';
import { NGO_INFO } from '@/lib/data';

const PRESET_AMOUNTS = [
  { 
    amount: 20, 
    title: "Kit Scolaire",
    impact: "Fournitures et manuels pour 2 écoliers pendant une année",
    fcfa: 13119
  },
  { 
    amount: 50, 
    title: "Santé & Soins",
    impact: "Déparasitage, bilan médical et soins préventifs pour 5 enfants",
    fcfa: 32798
  },
  { 
    amount: 100, 
    title: "Nutrition & Accueil",
    impact: "Alimentation complète et suivi mensuel en orphelinat",
    popular: true,
    fcfa: 65596
  },
  { 
    amount: 250, 
    title: "Équipement École",
    impact: "Rénovation d'une salle de classe et dotation pédagogique",
    fcfa: 163989
  },
];

const ALLOCATIONS = [
  { 
    id: 'general', 
    label: 'Priorité Urgences & Besoins critiques', 
    icon: Zap,
    color: 'text-amber-600 bg-amber-50 border-amber-200/80'
  },
  { 
    id: 'education', 
    label: 'Éducation & Kits Scolaires', 
    icon: GraduationCap,
    color: 'text-blue-600 bg-blue-50 border-blue-200/80'
  },
  { 
    id: 'sante', 
    label: 'Santé, Nutrition & Hygiène', 
    icon: Stethoscope,
    color: 'text-rose-600 bg-rose-50 border-rose-200/80'
  },
  { 
    id: 'protection', 
    label: 'Protection & Orphelinats', 
    icon: ShieldCheck,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80'
  },
  { 
    id: 'autonomie', 
    label: 'Autonomie des Femmes & Jeunes', 
    icon: Sprout,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200/80'
  },
];

function DonationPortalContent() {
  const searchParams = useSearchParams();
  const initialAmount = Number(searchParams.get('amount')) || 100;
  const initialType = (searchParams.get('type') as 'ponctuel' | 'mensuel') || 'mensuel';
  const initialPillar = searchParams.get('pillar') || 'general';

  const [donationType, setDonationType] = useState<'ponctuel' | 'mensuel'>(initialType);
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'EUR' | 'XOF'>('EUR');
  
  const [allocation, setAllocation] = useState<string>(initialPillar);
  const [paymentMethod, setPaymentMethod] = useState<'mtn_money' | 'moov_money' | 'card'>('mtn_money');
  
  const [donorData, setDonorData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    taxReceipt: true,
    anonymous: false,
  });

  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [completedRef, setCompletedRef] = useState('');

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const amountInFCFA = currency === 'EUR' ? Math.round(currentAmount * 655.957) : currentAmount;
  const taxDeductionCost = Math.round(currentAmount * 0.34); // 66% deductible
  const activePreset = PRESET_AMOUNTS.find(p => p.amount === selectedAmount);

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (currentAmount < 1) {
      setErrorMessage('Le montant minimum est de 1 EUR (ou 500 FCFA).');
      return;
    }

    if (!donorData.fullName.trim() || !donorData.email.trim()) {
      setErrorMessage('Veuillez renseigner votre nom complet et votre adresse e-mail.');
      return;
    }

    const payload = {
      type: donationType,
      amount: currentAmount,
      currency: currency as 'EUR' | 'XOF',
      donorName: donorData.fullName,
      donorEmail: donorData.email,
      donorPhone: donorData.phone,
      allocation: allocation as any,
      paymentMethod: paymentMethod,
      anonymous: donorData.anonymous,
      taxReceipt: donorData.taxReceipt,
      address: donorData.address,
    };

    const parseResult = DonationSchema.safeParse(payload);
    if (!parseResult.success) {
      setErrorMessage(parseResult.error.errors[0]?.message || 'Veuillez vérifier vos informations.');
      return;
    }

    // Trigger KkiaPay Widget
    const win = typeof window !== 'undefined' ? (window as any) : null;

    if (win && typeof win.openKkiapayWidget === 'function') {
      setStatus('processing');
      
      const kkiapayKey = process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY || "5077c5e0b9b211f18e1d4532f755649c";
      
      if (typeof win.addSuccessListener === 'function') {
        win.addSuccessListener(async (response: { transactionId: string }) => {
          try {
            const res = await fetch('/api/don', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...payload,
                transactionId: response.transactionId,
              }),
            });

            const data = await res.json();
            setCompletedRef(data.reference || `KKIA-${response.transactionId}`);
            setStatus('success');
          } catch (err: any) {
            setCompletedRef(`KKIA-${response.transactionId}`);
            setStatus('success');
          }
        });
      }

      if (typeof win.addFailedListener === 'function') {
        win.addFailedListener(() => {
          setStatus('idle');
          setErrorMessage('La transaction a été annulée ou interrompue.');
        });
      }

      // Sanitize phone for KkiaPay sandbox (convert 10-digit 01XXXXXXXX or +229 format to standard 8-digit)
      let cleanPhone = donorData.phone.replace(/[\s\-\+\(\)]/g, '');
      if (cleanPhone.startsWith('229')) cleanPhone = cleanPhone.slice(3);
      if (cleanPhone.startsWith('00229')) cleanPhone = cleanPhone.slice(5);
      if (cleanPhone.length === 10 && cleanPhone.startsWith('01')) cleanPhone = cleanPhone.slice(2);

      win.openKkiapayWidget({
        amount: Math.round(amountInFCFA),
        api_key: kkiapayKey,
        sandbox: true,
        email: donorData.email,
        phone: cleanPhone || '97000000',
        name: donorData.fullName,
        theme: "#292D77",
        data: JSON.stringify({
          allocation,
          donationType,
          originalAmount: currentAmount,
          currency,
        }),
      });

      return;
    }

    // Direct fallback
    setStatus('processing');
    try {
      const res = await fetch('/api/don', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors du traitement du don.');

      setCompletedRef(data.reference || generateTransactionReference('VH59-DON'));
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue lors de la validation du don.');
    }
  };

  const activeAllocation = ALLOCATIONS.find(a => a.id === allocation)?.label || "Priorité Urgences & Besoins critiques";

  return (
    <div className="min-h-screen py-8 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {status === 'success' ? (
          /* High-Prestige Confirmation & Printable Certificate View */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Success Header (Hidden in Print) */}
            <div className="text-center max-w-2xl mx-auto space-y-3 no-print">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold uppercase tracking-wider border border-emerald-200">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Paiement Validé avec Succès</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#292D77] tracking-tight">
                Merci infiniment pour votre soutien !
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Votre don a été transmis et enregistré. Votre attestation officielle et reçu de don ci-dessous sont téléchargeables ou imprimables immédiatement.
              </p>
            </div>

            {/* Official Printable Certificate Box */}
            <div className="printable-receipt bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200/90 shadow-premium relative overflow-hidden">
              
              {/* Certificate Watermark Background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b-2 border-slate-100 text-center sm:text-left relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white p-1 shadow-md border border-slate-200 flex-shrink-0">
                    <Image
                      src="/images/logo.jpg"
                      alt="Logo VISION HUMAINE 59"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#292D77] tracking-tight">
                      {NGO_INFO.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Association Humanitaire Internationale &middot; {NGO_INFO.registration}
                    </p>
                    <p className="text-xs italic text-slate-600 font-serif mt-0.5">
                      « {NGO_INFO.tagline} »
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right flex-shrink-0">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#292D77] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    REÇU DE DON OFFICIEL
                  </span>
                  <p className="text-xs font-mono font-bold text-[#D72229] mt-2">
                    Réf : {completedRef}
                  </p>
                </div>
              </div>

              {/* Certificate Details Table Grid */}
              <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm relative z-10">
                
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Donateur / Bienfaiteur
                  </span>
                  <p className="text-sm font-extrabold text-slate-900">
                    {donorData.fullName || "Donateur Partenaire"}
                  </p>
                  <p className="text-xs text-slate-500">{donorData.email}</p>
                  {donorData.phone && <p className="text-xs text-slate-500 font-mono">{donorData.phone}</p>}
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Montant & Devise
                  </span>
                  <p className="text-base sm:text-lg font-black text-[#292D77]">
                    {currentAmount} {currency} <span className="text-xs font-normal text-slate-500">(~{amountInFCFA.toLocaleString('fr-FR')} FCFA)</span>
                  </p>
                  <p className="text-xs font-semibold text-emerald-700">
                    Don {donationType === 'mensuel' ? 'Mensuel Récurrent' : 'Ponctuel'} &middot; Payé via KkiaPay
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Affectation du Don
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {activeAllocation}
                  </p>
                  <p className="text-[11px] text-slate-500">Allocation directe aux programmes de terrain au Bénin</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Date & Horodatage
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Statut : Transaction certifiée et acquittée
                  </p>
                </div>

              </div>

              {/* Certificate Tax Deduction & Legal Footer */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600 relative z-10">
                <div className="space-y-1 max-w-md text-center sm:text-left">
                  <p className="font-bold text-slate-800">
                    Déductibilité fiscale &middot; Article statutaire
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Ce reçu atteste de la réception effective du don par l&apos;ONG VISION HUMAINE 59. Conservez ce document pour vos déclarations fiscales.
                  </p>
                </div>

                <div className="text-center sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Signature & Sceau Officiel
                  </p>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 inline-block text-center">
                    <span className="font-extrabold text-xs text-[#292D77] block">VISION HUMAINE 59</span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">Secrétariat Général &middot; Direction</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons Bar (Hidden in Print) */}
            <div className="flex flex-wrap gap-3 justify-center pt-2 no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] font-extrabold text-sm text-white bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer l&apos;attestation officielle (PDF)</span>
              </button>

              <button
                onClick={() => {
                  setStatus('idle');
                  setDonorData({ fullName: '', email: '', phone: '', address: '', taxReceipt: true, anonymous: false });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] font-bold text-sm text-[#292D77] bg-white hover:bg-slate-100 border border-slate-200 shadow-sm transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Effectuer un autre don</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] font-bold text-sm text-slate-600 bg-transparent hover:bg-slate-100 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à l&apos;accueil</span>
              </Link>
            </div>

          </div>
        ) : (
          /* Main Donation Page Header & Form */
          <>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292D77] tracking-tight">
                Faire un don à <span className="text-[#D72229]">VISION HUMAINE 59</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                Votre générosité finance directement nos actions de terrain pour les enfants défavorisés et orphelins au Bénin.
              </p>
            </div>

            {/* Main Donation Card & Checkout Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Console: Interactive Payment Flow */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/80 shadow-sm space-y-7 sm:space-y-8">
              <form onSubmit={handleSubmitDonation} className="space-y-7 sm:space-y-8">
                
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-[#D72229] font-bold flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Rhythm Selector: Clean Floating Pill */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                      Type de soutien
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                      Déductible d&apos;impôts à 66%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-full border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => setDonationType('mensuel')}
                      className={`py-2.5 sm:py-3 px-2 text-xs sm:text-sm font-extrabold rounded-full transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        donationType === 'mensuel'
                          ? 'bg-[#292D77] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className="whitespace-nowrap">Don Mensuel</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase whitespace-nowrap hidden min-[390px]:inline-block ${
                        donationType === 'mensuel' ? 'bg-[#D72229] text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        Max
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDonationType('ponctuel')}
                      className={`py-2.5 sm:py-3 px-2 text-xs sm:text-sm font-extrabold rounded-full transition-all flex items-center justify-center whitespace-nowrap ${
                        donationType === 'ponctuel'
                          ? 'bg-[#292D77] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className="whitespace-nowrap">Don Ponctuel</span>
                    </button>
                  </div>
                </div>

                {/* Amount Selector */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Montant du don
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrency(currency === 'EUR' ? 'XOF' : 'EUR')}
                      className="text-xs font-bold text-[#292D77] hover:underline"
                    >
                      {currency === 'EUR' ? 'Afficher en FCFA' : 'Afficher en EUR (€)'}
                    </button>
                  </div>

                  {/* 4 Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((preset) => {
                      const isSelected = selectedAmount === preset.amount && !customAmount;
                      return (
                        <button
                          type="button"
                          key={preset.amount}
                          onClick={() => {
                            setSelectedAmount(preset.amount);
                            setCustomAmount('');
                          }}
                          className={`relative p-4 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[96px] ${
                            isSelected
                              ? 'border-[#292D77] bg-[#292D77]/5 ring-2 ring-[#292D77] shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          {preset.popular && (
                            <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#D72229] text-white shadow-sm">
                              Populaire
                            </span>
                          )}
                          <div className="text-2xl font-black text-[#292D77]">
                            {preset.amount} €
                          </div>
                          <div className="text-[11px] font-semibold text-slate-500 mt-1">
                            ~{preset.fcfa.toLocaleString('fr-FR')} FCFA
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Ou saisissez un autre montant libre (ex: 75)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#292D77] bg-slate-50/50 focus:bg-white transition-colors"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      EUR / FCFA
                    </div>
                  </div>
                </div>

                {/* Project Allocation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Affectation de votre don
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Sélectionnez la priorité d&apos;impact
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ALLOCATIONS.map((item) => {
                      const IconComponent = item.icon;
                      const isSelected = allocation === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAllocation(item.id)}
                          className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all duration-200 flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-[#292D77] bg-[#292D77]/6 text-[#292D77] ring-2 ring-[#292D77] shadow-sm'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.color}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="leading-snug">{item.label}</span>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#292D77] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Gateway: KkiaPay */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Moyen de paiement sécurisé
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      KkiaPay Sandbox Sécurisé
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* MTN MoMo */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mtn_money')}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'mtn_money'
                          ? 'border-[#292D77] bg-[#292D77]/5 ring-2 ring-[#292D77]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Smartphone className="w-4 h-4 text-amber-500" />
                        <span className="text-[9px] font-black uppercase text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">MoMo</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">MTN Mobile Money</span>
                      <span className="text-[10px] text-slate-500">Bénin (+229)</span>
                    </button>

                    {/* Moov / Celtiis */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('moov_money')}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'moov_money'
                          ? 'border-[#292D77] bg-[#292D77]/5 ring-2 ring-[#292D77]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Smartphone className="w-4 h-4 text-blue-500" />
                        <span className="text-[9px] font-black uppercase text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">Flooz</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">Moov & Celtiis</span>
                      <span className="text-[10px] text-slate-500">Bénin & UEMOA</span>
                    </button>

                    {/* Carte */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#292D77] bg-[#292D77]/5 ring-2 ring-[#292D77]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <CreditCard className="w-4 h-4 text-indigo-600" />
                        <span className="text-[9px] font-black uppercase text-indigo-800 bg-indigo-100 px-1.5 py-0.5 rounded">Carte</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">Carte Bancaire</span>
                      <span className="text-[10px] text-slate-500">Visa / Mastercard</span>
                    </button>

                  </div>
                </div>

                {/* Donor Contact Form */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Vos coordonnées (Reçu & Attestation fiscale)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Nom Complet *</label>
                      <input
                        type="text"
                        required
                        value={donorData.fullName}
                        onChange={(e) => setDonorData({ ...donorData, fullName: e.target.value })}
                        placeholder="Ex: Auriol Lissan"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#292D77] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email pour le reçu *</label>
                      <input
                        type="email"
                        required
                        value={donorData.email}
                        onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                        placeholder="votre.email@domaine.com"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#292D77] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Numéro Mobile Money (Bénin)</label>
                      <input
                        type="tel"
                        value={donorData.phone}
                        onChange={(e) => setDonorData({ ...donorData, phone: e.target.value })}
                        placeholder="Ex: 97000000 (ou 0197000000)"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#292D77] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Ville / Pays de résidence</label>
                      <input
                        type="text"
                        value={donorData.address}
                        onChange={(e) => setDonorData({ ...donorData, address: e.target.value })}
                        placeholder="Ex: Cotonou / Paris"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#292D77] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={donorData.taxReceipt}
                        onChange={(e) => setDonorData({ ...donorData, taxReceipt: e.target.checked })}
                        className="rounded text-[#292D77] focus:ring-[#292D77]"
                      />
                      <span>Je souhaite recevoir un reçu justificatif de mon don.</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={donorData.anonymous}
                        onChange={(e) => setDonorData({ ...donorData, anonymous: e.target.checked })}
                        className="rounded text-[#292D77] focus:ring-[#292D77]"
                      />
                      <span>Je souhaite que mon don reste anonyme dans les rapports publics.</span>
                    </label>
                  </div>
                </div>

                {/* Big Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'processing'}
                    className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3.5 sm:py-4 rounded-[30px] font-black text-white bg-[#D72229] hover:bg-[#AB161C] transition-all shadow-lg hover:shadow-[#D72229]/25 active:scale-[0.98] text-xs min-[380px]:text-sm sm:text-base disabled:opacity-50 whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">
                      {status === 'processing'
                        ? 'Ouverture de KkiaPay...'
                        : `Confirmer mon don (${currentAmount} € / ~${Math.round(amountInFCFA).toLocaleString('fr-FR')} F)`}
                    </span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Connexion chiffrée SSL</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#292D77]" />
                    <span>Passerelle KkiaPay certifiée</span>
                  </span>
                  <span>&bull;</span>
                  <span>91% direct terrain</span>
                </div>

              </form>
            </div>

            {/* Right Column: Sticky Summary & Real-time Impact */}
            <div className="lg:col-span-4 space-y-5 sticky top-24">
              
              {/* Live Impact Card */}
              <div className="bg-[#292D77] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    Impact de votre geste
                  </span>
                  <span className="text-xs font-semibold text-slate-300 capitalize">
                    {donationType}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <p className="text-3xl sm:text-4xl font-black text-white">
                    {currentAmount} €
                  </p>
                  <p className="text-xs text-slate-300 font-mono">
                    ~{amountInFCFA.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs leading-relaxed text-slate-100">
                  {activePreset?.impact || "Soutient directement les fournitures scolaires, les soins médicaux et l'aide alimentaire de terrain au Bénin."}
                </div>

                {/* Tax Benefit Card */}
                {currency === 'EUR' && (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2.5">
                    <Percent className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      Coût réel après déduction fiscale (66%) : <strong className="text-white font-bold">{taxDeductionCost} €</strong>
                    </span>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2 border-t border-white/15 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>Affecté directement au terrain</span>
                    <span className="text-amber-300">91%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-amber-400 w-[91%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Direct NGO Assistance Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3 text-xs">
                <p className="font-extrabold text-[#292D77] uppercase tracking-wider">
                  Besoin d&apos;aide pour votre don ?
                </p>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Notre équipe est à votre disposition pour tout renseignement ou virement spécifique :
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1.5 font-medium text-slate-800">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">Email :</span>
                    <a href={`mailto:${NGO_INFO.email}`} className="text-[#292D77] font-bold hover:underline">
                      {NGO_INFO.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">Tel / WhatsApp :</span>
                    <a href={`tel:${NGO_INFO.phone}`} className="text-emerald-700 font-bold hover:underline">
                      {NGO_INFO.phone}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      </div>
    </div>
  );
}

export default function DonPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Chargement du portail de don sécurisé...</div>}>
      <DonationPortalContent />
    </Suspense>
  );
}
