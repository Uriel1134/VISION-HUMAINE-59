import React from 'react';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-[#FFFEFC] border-t border-slate-100" id="partenaires">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292D77] tracking-tight">
            Nos partenaires de terrain
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            En synergie avec les acteurs humanitaires et institutionnels majeurs
          </p>
        </div>

        {/* Partners Clean Logos Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 items-center">
          
          {/* Partner 1: Unicef */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 h-20 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all duration-300 group">
            <span className="text-xl sm:text-2xl font-black text-slate-400 group-hover:text-[#1CABE2] transition-colors tracking-tighter lowercase">
              unicef
            </span>
          </div>

          {/* Partner 2: WFP */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 h-20 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all duration-300 text-center group">
            <span className="text-xs sm:text-sm font-black text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-tight">
              World Food <br /> Programme
            </span>
          </div>

          {/* Partner 3: AFD */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 h-20 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all duration-300 group">
            <span className="text-lg sm:text-xl font-black text-slate-400 group-hover:text-[#002E6D] transition-colors tracking-wider">
              AFD
            </span>
          </div>

          {/* Partner 4: Plan International */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 h-20 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all duration-300 text-center group">
            <span className="text-xs sm:text-sm font-extrabold text-slate-400 group-hover:text-[#005A9C] transition-colors tracking-tight leading-tight">
              PLAN <br /> <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-slate-600">International</span>
            </span>
          </div>

          {/* Partner 5: Croix-Rouge */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 h-20 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all duration-300 text-center group">
            <span className="text-xs sm:text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors leading-tight">
              Croix-Rouge <br /> <span className="text-[10px] font-medium text-slate-400 group-hover:text-[#E2001A]">française</span>
            </span>
          </div>

          {/* Partner 6: Partenaires locaux */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 h-20 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all duration-300 text-center group">
            <span className="text-xs sm:text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors leading-tight">
              Partenaires <br /> <span className="text-[10px] font-medium text-slate-400 group-hover:text-emerald-700">locaux Bénin</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

