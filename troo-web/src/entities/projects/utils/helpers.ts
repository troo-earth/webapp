import type { Project, ProjectResponse } from "../types/projectTypes";

export const fallBackUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop";


export const transformProject = (apiProject: ProjectResponse): Project => ({
  id: apiProject.id,
  projectid: apiProject.projectid,
  imageUrl: apiProject.imageUrl || fallBackUrl,
  country: apiProject.country,
  state: apiProject.state,
  type: apiProject.type,
  name: apiProject.name,
  year: apiProject.year,
  price: apiProject.price,
  sdgGoals: apiProject.sdgGoals,
  registry: apiProject.registry,
});

export const getSDGColor = (goal: number) => {
    const colors: Record<number, string> = {
      1:  'bg-[#F53D50]', 
      2:  'bg-[#DFA638]', 
      3:  'bg-[#58C04D]', 
      4:  'bg-[#C92A3D]', 
      5:  'bg-[#FF5A36]', 
      6:  'bg-[#2CBEE8]', 
      7:  'bg-[#FDB713]', 
      8:  'bg-[#B52B52]',
      9:  'bg-[#FD7A36]',
      10: 'bg-[#E32974]', 
      11: 'bg-[#FFAA3B]',
      12: 'bg-[#CC9433]', 
      13: 'bg-[#4DA355]', 
      14: 'bg-[#20AEE8]', 
      15: 'bg-[#6AD943]', 
      16: 'bg-[#187DB5]',
      17: 'bg-[#25567A]', 
    };
    
    return colors[goal] || 'bg-gray-800';
  };

export const getCountryName = (countryCode: string): string => {
    const countryMap: Record<string, string> = {
      // A
      'AD': 'Andorra',
      'AE': 'United Arab Emirates',
      'AF': 'Afghanistan',
      'AG': 'Antigua and Barbuda',
      'AI': 'Anguilla',
      'AL': 'Albania',
      'AM': 'Armenia',
      'AO': 'Angola',
      'AQ': 'Antarctica',
      'AR': 'Argentina',
      'AS': 'American Samoa',
      'AT': 'Austria',
      'AU': 'Australia',
      'AW': 'Aruba',
      'AX': 'Åland Islands',
      'AZ': 'Azerbaijan',
      
      // B
      'BA': 'Bosnia and Herzegovina',
      'BB': 'Barbados',
      'BD': 'Bangladesh',
      'BE': 'Belgium',
      'BF': 'Burkina Faso',
      'BG': 'Bulgaria',
      'BH': 'Bahrain',
      'BI': 'Burundi',
      'BJ': 'Benin',
      'BL': 'Saint Barthélemy',
      'BM': 'Bermuda',
      'BN': 'Brunei',
      'BO': 'Bolivia',
      'BQ': 'Caribbean Netherlands',
      'BR': 'Brazil',
      'BS': 'Bahamas',
      'BT': 'Bhutan',
      'BV': 'Bouvet Island',
      'BW': 'Botswana',
      'BY': 'Belarus',
      'BZ': 'Belize',
      
      // C
      'CA': 'Canada',
      'CC': 'Cocos Islands',
      'CD': 'Congo (DRC)',
      'CF': 'Central African Republic',
      'CG': 'Congo',
      'CH': 'Switzerland',
      'CI': 'Côte d\'Ivoire',
      'CK': 'Cook Islands',
      'CL': 'Chile',
      'CM': 'Cameroon',
      'CN': 'China',
      'CO': 'Colombia',
      'CR': 'Costa Rica',
      'CU': 'Cuba',
      'CV': 'Cape Verde',
      'CW': 'Curaçao',
      'CX': 'Christmas Island',
      'CY': 'Cyprus',
      'CZ': 'Czech Republic',
      
      // D
      'DE': 'Germany',
      'DJ': 'Djibouti',
      'DK': 'Denmark',
      'DM': 'Dominica',
      'DO': 'Dominican Republic',
      'DZ': 'Algeria',
      
      // E
      'EC': 'Ecuador',
      'EE': 'Estonia',
      'EG': 'Egypt',
      'EH': 'Western Sahara',
      'ER': 'Eritrea',
      'ES': 'Spain',
      'ET': 'Ethiopia',
      
      // F
      'FI': 'Finland',
      'FJ': 'Fiji',
      'FK': 'Falkland Islands',
      'FM': 'Micronesia',
      'FO': 'Faroe Islands',
      'FR': 'France',
      
      // G
      'GA': 'Gabon',
      'GB': 'United Kingdom',
      'GD': 'Grenada',
      'GE': 'Georgia',
      'GF': 'French Guiana',
      'GG': 'Guernsey',
      'GH': 'Ghana',
      'GI': 'Gibraltar',
      'GL': 'Greenland',
      'GM': 'Gambia',
      'GN': 'Guinea',
      'GP': 'Guadeloupe',
      'GQ': 'Equatorial Guinea',
      'GR': 'Greece',
      'GS': 'South Georgia',
      'GT': 'Guatemala',
      'GU': 'Guam',
      'GW': 'Guinea-Bissau',
      'GY': 'Guyana',
      
      // H
      'HK': 'Hong Kong',
      'HM': 'Heard Island',
      'HN': 'Honduras',
      'HR': 'Croatia',
      'HT': 'Haiti',
      'HU': 'Hungary',
      
      // I
      'ID': 'Indonesia',
      'IE': 'Ireland',
      'IL': 'Israel',
      'IM': 'Isle of Man',
      'IN': 'India',
      'IO': 'British Indian Ocean Territory',
      'IQ': 'Iraq',
      'IR': 'Iran',
      'IS': 'Iceland',
      'IT': 'Italy',
      
      // J
      'JE': 'Jersey',
      'JM': 'Jamaica',
      'JO': 'Jordan',
      'JP': 'Japan',
      
      // K
      'KE': 'Kenya',
      'KG': 'Kyrgyzstan',
      'KH': 'Cambodia',
      'KI': 'Kiribati',
      'KM': 'Comoros',
      'KN': 'Saint Kitts and Nevis',
      'KP': 'North Korea',
      'KR': 'South Korea',
      'KW': 'Kuwait',
      'KY': 'Cayman Islands',
      'KZ': 'Kazakhstan',
      
      // L
      'LA': 'Laos',
      'LB': 'Lebanon',
      'LC': 'Saint Lucia',
      'LI': 'Liechtenstein',
      'LK': 'Sri Lanka',
      'LR': 'Liberia',
      'LS': 'Lesotho',
      'LT': 'Lithuania',
      'LU': 'Luxembourg',
      'LV': 'Latvia',
      'LY': 'Libya',
      
      // M
      'MA': 'Morocco',
      'MC': 'Monaco',
      'MD': 'Moldova',
      'ME': 'Montenegro',
      'MF': 'Saint Martin',
      'MG': 'Madagascar',
      'MH': 'Marshall Islands',
      'MK': 'North Macedonia',
      'ML': 'Mali',
      'MM': 'Myanmar',
      'MN': 'Mongolia',
      'MO': 'Macao',
      'MP': 'Northern Mariana Islands',
      'MQ': 'Martinique',
      'MR': 'Mauritania',
      'MS': 'Montserrat',
      'MT': 'Malta',
      'MU': 'Mauritius',
      'MV': 'Maldives',
      'MW': 'Malawi',
      'MX': 'Mexico',
      'MY': 'Malaysia',
      'MZ': 'Mozambique',
      
      // N
      'NA': 'Namibia',
      'NC': 'New Caledonia',
      'NE': 'Niger',
      'NF': 'Norfolk Island',
      'NG': 'Nigeria',
      'NI': 'Nicaragua',
      'NL': 'Netherlands',
      'NO': 'Norway',
      'NP': 'Nepal',
      'NR': 'Nauru',
      'NU': 'Niue',
      'NZ': 'New Zealand',
      
      // O
      'OM': 'Oman',
      
      // P
      'PA': 'Panama',
      'PE': 'Peru',
      'PF': 'French Polynesia',
      'PG': 'Papua New Guinea',
      'PH': 'Philippines',
      'PK': 'Pakistan',
      'PL': 'Poland',
      'PM': 'Saint Pierre and Miquelon',
      'PN': 'Pitcairn',
      'PR': 'Puerto Rico',
      'PS': 'Palestine',
      'PT': 'Portugal',
      'PW': 'Palau',
      'PY': 'Paraguay',
      
      // Q
      'QA': 'Qatar',
      
      // R
      'RE': 'Réunion',
      'RO': 'Romania',
      'RS': 'Serbia',
      'RU': 'Russia',
      'RW': 'Rwanda',
      
      // S
      'SA': 'Saudi Arabia',
      'SB': 'Solomon Islands',
      'SC': 'Seychelles',
      'SD': 'Sudan',
      'SE': 'Sweden',
      'SG': 'Singapore',
      'SH': 'Saint Helena',
      'SI': 'Slovenia',
      'SJ': 'Svalbard and Jan Mayen',
      'SK': 'Slovakia',
      'SL': 'Sierra Leone',
      'SM': 'San Marino',
      'SN': 'Senegal',
      'SO': 'Somalia',
      'SR': 'Suriname',
      'SS': 'South Sudan',
      'ST': 'São Tomé and Príncipe',
      'SV': 'El Salvador',
      'SX': 'Sint Maarten',
      'SY': 'Syria',
      'SZ': 'Eswatini',
      
      // T
      'TC': 'Turks and Caicos Islands',
      'TD': 'Chad',
      'TF': 'French Southern Territories',
      'TG': 'Togo',
      'TH': 'Thailand',
      'TJ': 'Tajikistan',
      'TK': 'Tokelau',
      'TL': 'Timor-Leste',
      'TM': 'Turkmenistan',
      'TN': 'Tunisia',
      'TO': 'Tonga',
      'TR': 'Turkey',
      'TT': 'Trinidad and Tobago',
      'TV': 'Tuvalu',
      'TW': 'Taiwan',
      'TZ': 'Tanzania',
      
      // U
      'UA': 'Ukraine',
      'UG': 'Uganda',
      'UM': 'U.S. Outlying Islands',
      'US': 'United States',
      'UY': 'Uruguay',
      'UZ': 'Uzbekistan',
      
      // V
      'VA': 'Vatican City',
      'VC': 'Saint Vincent and the Grenadines',
      'VE': 'Venezuela',
      'VG': 'British Virgin Islands',
      'VI': 'U.S. Virgin Islands',
      'VN': 'Vietnam',
      'VU': 'Vanuatu',
      
      // W
      'WF': 'Wallis and Futuna',
      'WS': 'Samoa',
      
      // Y
      'YE': 'Yemen',
      'YT': 'Mayotte',
      
      // Z
      'ZA': 'South Africa',
      'ZM': 'Zambia',
      'ZW': 'Zimbabwe',
    };
  
    const normalizedCode = countryCode?.toUpperCase().trim();
    return countryMap[normalizedCode] || countryCode;
  };
  