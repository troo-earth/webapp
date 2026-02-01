import type { FactCardType } from "../types/exploreTypes";

export const FACT_CARDS: FactCardType[] = [
    {
      id: 'fact-1',
      type: 'fact',
      title: 'Blue Carbon Power',
      fact: 'Mangrove forests capture up to 4x more carbon than terrestrial rainforests per hectare.',
      color: 'bg-[#FDB713]'
    },
    {
      id: 'fact-2',
      type: 'fact',
      title: 'Verified Impact',
      fact: 'Every credit listed here is verified by third-party registries like Verra or Gold Standard.',
      color: 'bg-black',
    },
    {
      id: 'fact-3',
      type: 'fact',
      title: 'Climate Action Scale',
      fact: 'The carbon credit market has offset over 1 billion tons of CO2 equivalent since 2005.',
      color: 'bg-[#4DA355]',
    },
    {
      id: 'fact-4',
      type: 'fact',
      title: 'Renewable Energy Growth',
      fact: 'Solar and wind projects now account for over 60% of new carbon credit issuances globally.',
      color: 'bg-[#005C5C]',  
    },
  ] as const;