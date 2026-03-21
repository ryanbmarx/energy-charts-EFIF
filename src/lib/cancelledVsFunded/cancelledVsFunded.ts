type Segment = { id: string; name: string; value: number };

export const grants: Segment[] = [
  { id: 'grid-storage-cuts', name: 'Grid & Storage', value: -3_486_533_774 },
  { id: 'hydrogen', name: 'Hydrogen', value: -3_271_921_794 },
  { id: 'advanced-manufacturing', name: 'Advanced Manufacturing', value: -1_846_645_401 },
  { id: 'carbon-management', name: 'Carbon Management', value: -1_590_748_641 },
  { id: 'other', name: 'Other', value: -499_767_179 },
  { id: 'wind-solar', name: 'Wind & Solar', value: -385_074_491 },
  { id: 'geothermal', name: 'Geothermal', value: 8_600_000 },
  { id: 'critical-minerals', name: 'Critical Minerals', value: 0 },
  { id: 'grid-storage-funded', name: 'Grid & Storage', value: 19_847_566 },
  { id: 'nuclear', name: 'Nuclear', value: 3_539_000_000 },
  { id: 'coal', name: 'Coal', value: 0 },
  { id: 'basic-sciences', name: 'Basic Sciences', value: 0 },
];

export const loans: Segment[] = [
  { id: 'grid-storage-cuts', name: 'Grid & Storage', value: -4_900_000_000 },
  { id: 'hydrogen', name: 'Hydrogen', value: 0 },
  { id: 'advanced-manufacturing', name: 'Advanced Manufacturing', value: 0 },
  { id: 'carbon-management', name: 'Carbon Management', value: 0 },
  { id: 'other', name: 'Other', value: 0 },
  { id: 'wind-solar', name: 'Wind & Solar', value: 0 },
  { id: 'geothermal', name: 'Geothermal', value: 0 },
  { id: 'critical-minerals', name: 'Critical Minerals', value: 0 },
  { id: 'grid-storage-funded', name: 'Grid & Storage', value: 1_600_000_000 },
  { id: 'nuclear', name: 'Nuclear', value: 1_000_000_000 },
  { id: 'coal', name: 'Coal', value: 1_500_000_000 },
  { id: 'basic-sciences', name: 'Basic Sciences', value: 0 },
];

export const planned: Segment[] = [
  { id: 'grid-storage-cuts', name: 'Grid & Storage', value: 0 },
  { id: 'hydrogen', name: 'Hydrogen', value: 0 },
  { id: 'advanced-manufacturing', name: 'Advanced Manufacturing', value: 0 },
  { id: 'carbon-management', name: 'Carbon Management', value: 0 },
  { id: 'other', name: 'Other', value: 25_000_000 },
  { id: 'wind-solar', name: 'Wind & Solar', value: 0 },
  { id: 'geothermal', name: 'Geothermal', value: 30_000_000 },
  { id: 'critical-minerals', name: 'Critical Minerals', value: 1_099_000_000 },
  { id: 'grid-storage-funded', name: 'Grid & Storage', value: 68_000_000 },
  { id: 'nuclear', name: 'Nuclear', value: 259_200_000 },
  { id: 'coal', name: 'Coal', value: 625_000_000 },
  { id: 'basic-sciences', name: 'Basic Sciences', value: 899_000_000 },
];
