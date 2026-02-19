export const mortgageOptions = {
  creditScoreOptions: [
    '760+', '740-759', '720-739', '700-719', '680-699',
    '660-679', '640-659', '620-639', '< 620',
  ],

  loanTermOptions: [
    '30 year fixed', '20 year fixed', '15 year fixed',
    '10 year fixed', '7/1 ARM', '5/1 ARM',
  ],

  militaryVeteranOptions: [
    'Non-Military', 'Military / Veteran', 'Surviving spouse',
  ],

  dtiOptions: {
    lessThan40: 'Less than 40%',
    fortyAndAbove: '40% and above',
  },

  mortgagePointsOptions: ['All', '0', '0.5', '1', '1.5', '2'],

  propertyTypeOptions: [
    'Single Family', 'Condo', 'Townhome', 'Multi-family', 'Manufactured', 'Co-op',
  ],

  propertyUseOptions: ['Primary', 'Secondary', 'Investment'],
} as const
