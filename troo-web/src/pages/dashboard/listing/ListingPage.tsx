import { 
  MapPin, Calendar, ShieldCheck, ArrowLeft, 
  ExternalLink, FileText, Zap, Leaf, CheckCircle,
  Building2, BadgeCheck, FileSearch, 
  Info, Download, Clock, Globe,
  Store,
} from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/global/Loading';
import { Button } from '@/components/ui/buttons/Button';
import { fallBackUrl, getCountryName, getSDGColor } from '@/entities/listings/utils/helpers';
import useScrollToTopOnNav from '@/hooks/useScrollToTopOnNav';
import { useState } from 'react';
import { PurchaseModal } from '@/entities/listings/components/ListingPurchaseModal';
import { listingQueries } from '@/entities/listings/queries/listingQueries';

export const ListingPage = () => {
  const { source, listingId } = useParams({ from: '/_authenticated/_dashboard-layout/$source/listing/$listingId_' });

  useScrollToTopOnNav();

  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const { data: listing, isLoading, isError } = useQuery(listingQueries.ById(listingId));

  const project = listing?.project

  if (isLoading) return <LoadingScreen />;
  if (isError || !listing) return <div className="p-20 text-center font-bold">Listing data unavailable</div>;

  return (
    <div className="min-h-screen font-nunito relative">
      <header className="z-40 transition-all duration-300 p-6">
        <div className="mx-auto flex items-center justify-between">
          <Link to="/explore">
              <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all cursor-pointer font-bold text-sm group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
                <span>Back to <span className='capitalize'>{source}</span></span>
              </button>
          </Link>
          
          {project?.id && (
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              <span className="text-[10px] font-black text-primary capitalize tracking-widest">Registry ID:</span>
              <span className="text-[12px] font-bold text-gray-900 ">{project.id}</span>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto px-6 pt-2 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            <section className="space-y-4">
              <div className="flex gap-2">
                {project?.type?.title && (
                    <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">{project.type.title}</span>
                )}
                {project?.registry && (
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">{project.registry}</span>
                )}
              </div>
              <h1 className="text-4xl font-black text-gray-900 leading-tight">{project?.fullName}</h1>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-gray-500 font-bold text-sm">
                {(project?.city || project?.countryCode) && (
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {project.city}{project.city && ','} {getCountryName(project.countryCode)}</div>
                )}
                {project?.startDate && (
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Started: {new Date(project.startDate).toLocaleDateString()}</div>
                )}
                {project?.creditingPeriodStartDate && (
                    <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" /> 
                        <span>Crediting period: {new Date(project.creditingPeriodStartDate).toLocaleDateString()}</span>
                    </div>
                )}
              </div>
            </section>

                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl group">
                    <img src={project?.thumbnail || fallBackUrl} alt={project?.fullName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {project?.methodology?.title && (
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl max-w-70">
                            <div className="flex items-center gap-2 mb-1">
                                <Info className="w-3.5 h-3.5 text-primary" />
                                <p className="text-[9px] font-black text-primary uppercase tracking-tighter">Verified Methodology</p>
                            </div>
                            <p className="text-xs font-bold text-gray-900 leading-tight">{project.methodology.title}</p>
                        </div>
                    )}
                </div>

            {project?.description && (
                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-gray-900">Project Overview</h3>
                    <p className="text-gray-600 leading-relaxed text-lg font-medium whitespace-pre-wrap">{project.description}</p>
                </section>
            )}

            {project?.additionalities && project?.additionalities.length > 0 && (
                <section className="space-y-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <Leaf className="w-6 h-6 text-primary" /> Additionality Framework
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {project.additionalities.map((item, i) => (
                            <div key={i} className="relative pl-8 pb-4 group">
                                {i !== project.additionalities.length - 1 && (
                                    <div className="absolute left-2.75 top-6 bottom-0 w-0.5 bg-gray-100 group-hover:bg-primary/20 transition-colors" />
                                )}
                                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div className="bg-gray-50/50 p-5 rounded-2xl border border-transparent group-hover:border-primary/10 group-hover:bg-white group-hover:shadow-md transition-all">
                                    <h4 className="font-black text-gray-900 capitalize text-[16px] mb-2">{item.title}</h4>
                                    <p className="text-[14px] text-gray-500 ">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8">
                <div className="mb-6">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Market Price</span>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-4xl font-black text-gray-900">${listing?.price_per_credit}</span>
                        <span className="text-gray-400 font-bold">/ tCO2e</span>
                    </div>
                </div>

                <div className="space-y-3 mb-8 pt-6 border-t border-gray-50">
                    {listing?.seller && (
                        <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-50 border-dashed">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1.5">
                                <Store className="w-3.5 h-3.5" /> Sold By
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-black text-gray-900 text-right max-w-37.5 truncate" title={listing.seller.name}>
                                    {listing.seller.name}
                                </span>
                                {listing.seller.type === 'registry' && (
                                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                                )}
                            </div>
                        </div>
                    )}

                    {listing?.credits_available && (
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Credits Available</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-black text-gray-900">{parseFloat(listing.credits_available)}</span>
                            </div>
                        </div>
                    )}
                    {project?.estimatedAnnualMitigations && (
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Total Volume</span>
                            <span className="text-sm font-black text-gray-900">
                                {project?.estimatedAnnualMitigations.reduce((acc, curr) => {
                                    return acc + (curr.estimatedMitigation || 0);
                                    }, 0).toLocaleString()} 
                                <span className="ml-1 text-gray-400 font-bold">tCO2e</span>
                            </span>
                        </div>
                    )}
                    {project?.status && (
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Project Status</span>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-black text-green-600 capitalize">{project.status}</span>
                            </div>
                        </div>
                    )}
                </div>

                    <Button onClick={() => setPurchaseModalOpen(true)} className="w-full bg-primary hover:bg-primary-dark cursor-pointer text-white py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-3">
                        Buy Carbon Credits <Zap className="w-5 h-5 fill-current" />
                    </Button>

                <div className="mt-6 flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100">
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">
                        Secure <span className="text-[#635BFF]">Stripe</span> Payment
                    </span>
                </div>
              </div>

              {project?.otherBenefits && project?.otherBenefits.length > 0 && (
                <div className="bg-gray-50/50 rounded-4xl p-6 border border-gray-100">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" /> SDG Impact
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                        {project.otherBenefits.map((sdg, i) => {
                            const goalNum = sdg.title.split(':')[0].split(' ')[1];
                            return (
                                <div key={i} className="group relative">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black text-white shadow-sm transition-all cursor-help hover:scale-110 ${getSDGColor(Number(goalNum))}`}>
                                        {goalNum}
                                    </div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl text-center">
                                        <p className="font-black leading-tight">{sdg.title}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
              )}

              {( (project?.proponents && project?.proponents.length > 0) || (project?.validators && project?.validators.length > 0) ) && (
                <div className="bg-gray-50/50 rounded-4xl p-6 border border-gray-100 space-y-8">
                    {project?.proponents && project?.proponents.length > 0 && (
                        <div>
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5" /> Project Proponents
                            </h4>
                            {project.proponents.map(p => (
                                <Link key={p.id} to={p.publicUrl} target="_blank" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all mb-2 last:mb-0">
                                    {p.logo && <img src={p.logo} className="w-10 h-10 object-contain rounded-lg p-1 bg-white border border-gray-50" />}
                                    <span className="text-[14px] font-black text-gray-900 truncate">{p.fullName}</span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {project.validators && project.validators.length > 0 && (
                        <div className="pt-4 border-t border-gray-200/50">
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                <BadgeCheck className="w-3.5 h-3.5" /> Validators
                            </h4>
                            {project.validators.map(v => (
                                <Link key={v.id} to={v.publicUrl} target="_blank" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all mb-2 last:mb-0">
                                    {v.logo && <img src={v.logo} className="w-8 h-8 object-contain" />}
                                    <span className="text-[14px] font-black text-black truncate">{v.fullName}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
              )}

              {project?.documentation && project?.documentation.length > 0 && (
                <div className="bg-gray-50/50 rounded-4xl p-6 border border-gray-100">
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileSearch className="w-3.5 h-3.5 text-primary" /> Project Hub
                    </h4>
                    <div className="space-y-2">
                        {project.documentation.map(doc => {
                            const isDownloadable = /\.(pdf|xlsx|csv|kml)$/i.test(doc.name || '');
                            return (
                                <a 
                                    key={doc.id} 
                                    href={doc.uri} 
                                    target="_blank" 
                                    download={isDownloadable}
                                    className="flex flex-col p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                                            <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                        </div>
                                        {isDownloadable ? <Download className="w-3.5 h-3.5 text-primary" /> : <ExternalLink className="w-3.5 h-3.5 text-gray-300" />}
                                    </div>
                                    <span className="text-[11px] font-black text-gray-800 line-clamp-1">{doc.name || 'Unnamed Document'}</span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">{doc.type?.replace(/([A-Z])/g, ' $1')}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <PurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        listingId={listingId}
        pricePerCredit={Number(listing?.price_per_credit || 0)}
        projectTitle={listing?.project?.fullName || 'Project'}
        registry={listing?.project?.registry || 'Standard'}
      />
    </div>
  );
};