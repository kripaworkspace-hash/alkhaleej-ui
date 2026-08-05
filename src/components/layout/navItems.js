export const NAV_ITEMS = [
  {
    label: 'Main Bagging Area',
    children: [
      { label: 'Loading Bay 1', to: '/bays/bay-1' },
      { label: 'Loading Bay 2', to: '/bays/bay-2' },
      { label: 'Loading Bay 3', to: '/bays/bay-3' },
      { label: 'Packing Section', to: '/packing-bay' },
      { label: 'Movement Section', to: '/movement-section' },
      { label: 'Loading Section', to: '/loading-section' },
    ],
  },
  { label: 'Raw Sugar Packing', to: '/bays?location=raw-sugar-packing' },
  { label: 'Seaside Bagging', to: '/bays?location=seaside-bagging' },
  { label: 'Analytics', to: '/analytics' },
]
