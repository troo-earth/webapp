import React, { useState } from 'react';
import { MapPin, Calendar, Leaf, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

// Types for the component props
interface PriceTier {
  id: string;
  label: string; // e.g., "Vintage 2021", "Bulk", "Retail"
  amount: number;
}

interface ProjectCardProps {
  image: string;
  title: string;
  registry: string; // e.g., "Verra", "Gold Standard"
  year: number;
  location: string;
  category: string; // e.g., "Forestry", "Energy Efficiency"
  sdgGoals: number[]; // Array of SDG numbers e.g. [6, 13, 15]
  prices: PriceTier[]; // Array to handle 1 or multiple prices
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  registry,
  year,
  location,
  category,
  sdgGoals,
  prices,
}) => {
  // Logic to determine price display
  const hasMultiplePrices = prices.length > 1;
  const lowestPrice = Math.min(...prices.map((p) => p.amount));
  
  // State for selecting price tier if multiple exist
  const [selectedTier, setSelectedTier] = useState<string>(prices[0].id);

  // Get current displayed price
  const currentPrice = hasMultiplePrices 
    ? prices.find(p => p.id === selectedTier)?.amount 
    : prices[0].amount;

  return (
    <div className="group relative flex flex-col w-full max-w-[380px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden font-nunito">
      
      {/* --- Image Section --- */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Registry & Year Badge (Floating) */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
           <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-secondary flex items-center gap-1 shadow-sm">
             <Calendar className="w-3 h-3 text-primary" />
             {year}
           </div>
           <div className="bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
             {registry}
           </div>
        </div>
      </div>

      {/* --- Content Body --- */}
      <div className="p-5 flex flex-col grow">
        
        {/* Category Pill */}
        <div className="mb-2">
            <span className="inline-block bg-primary-accent px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase text-primary">
                {category}
            </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-secondary mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          {location}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-4" />

        {/* SDG & Price Row */}
        <div className="flex justify-between items-end mt-auto">
          
          {/* SDG Goals (Stacked or Grid) */}
          <div className="flex items-center gap-1.5">
             <span className="text-xs font-bold text-gray-400 mr-1">SDG</span>
             {sdgGoals.slice(0, 3).map((goal) => (
               <div key={goal} className="w-6 h-6 rounded bg-[#EAF4F4] flex items-center justify-center text-[10px] font-bold text-secondary border border-[#CDE5E5]" title={`SDG ${goal}`}>
                 {goal}
               </div>
             ))}
             {sdgGoals.length > 3 && <span className="text-xs text-gray-400">+{sdgGoals.length - 3}</span>}
          </div>

          {/* Price Display */}
          <div className="text-right">
             <div className="text-xs text-gray-400 font-medium mb-0.5">
                {hasMultiplePrices ? 'Starting from' : 'Price per credit'}
             </div>
             <div className="text-xl font-extrabold text-accent">
               ${hasMultiplePrices ? lowestPrice.toFixed(2) : currentPrice?.toFixed(2)}
             </div>
          </div>
        </div>
      </div>

      {/* --- Multi-Price Interactive Footer --- */}
      {/* Only renders if there are multiple prices. 
          Uses a subtle background to differentiate options. */}
      {hasMultiplePrices && (
        <div className="bg-gray-50 p-3 border-t border-gray-100">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-xs font-semibold text-secondary mb-1">
                    <Info className="w-3 h-3 text-primary" />
                    Available Options:
                </div>
                <div className="flex flex-wrap gap-2">
                    {prices.map((price) => (
                        <button
                            key={price.id}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                setSelectedTier(price.id);
                            }}
                            className={`
                                text-xs px-2 py-1 rounded border transition-all duration-200 flex items-center gap-1
                                ${selectedTier === price.id 
                                    ? 'bg-primary text-white border-primary shadow-sm' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50'
                                }
                            `}
                        >
                            {price.label}: <span className={selectedTier === price.id ? 'text-accent font-bold' : 'font-semibold'}>${price.amount}</span>
                            {selectedTier === price.id && <CheckCircle2 className="w-3 h-3 text-accent" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}
      
      {/* Decorative Hover Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </div>
  );
};



export const Dashboard1 = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-nunito">
        
      <h1 className="text-2xl font-bold text-[#173E35] mb-8">Featured Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Case 1: Standard Single Price */}
        <ProjectCard
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
          title="Aperman BioEnergia"
          registry="Gold Standard"
          year={2023}
          location="Rio De Janeiro, Brazil"
          category="Energy Efficiency"
          sdgGoals={[6, 13, 15]}
          prices={[
            { id: '1', label: 'Standard', amount: 14.36 }
          ]}
        />

        {/* Case 2: Multiple Prices (e.g. Vintages or Tiers) */}
        <ProjectCard
          image="https://images.unsplash.com/photo-1621256070200-c08197771746?q=80&w=2940&auto=format&fit=crop"
          title="Sea Cave Blue Carbon"
          registry="Verra"
          year={2021}
          location="Rajkot, India"
          category="Forestry"
          sdgGoals={[7, 14, 13, 8]}
          prices={[
            { id: 'opt1', label: 'Vintage 2021', amount: 17.08 },
            { id: 'opt2', label: 'Vintage 2022', amount: 19.50 },
            { id: 'opt3', label: 'Future', amount: 16.00 }
          ]}
        />

        {/* Case 3: Another Single Price */}
        <ProjectCard
            image="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=2600&auto=format&fit=crop"
            title="North Pikounda REDD+"
            registry="Gold Standard"
            year={2017}
            location="Addis Ababa, Tanzania"
            category="Reforestation"
            sdgGoals={[5, 13]}
            prices={[
                { id: '1', label: 'Standard', amount: 36.05 }
            ]}
        />

      </div>
    </div>
  );
};

