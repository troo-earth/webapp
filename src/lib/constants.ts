export const devPassword = import.meta.env.VITE_DEV_PASSWORD

import type { SelectOption } from '@/types/global/types';
import countries from 'world-countries';

export const COUNTRY_OPTIONS: SelectOption[] = countries.map((c) => ({
  value: c.cca2,
  label: `${c.flag}  ${c.name.common}`, 
})).sort((a, b) => a.label.localeCompare(b.label)); 