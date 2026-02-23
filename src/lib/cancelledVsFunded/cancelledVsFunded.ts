type Technology = {
  name: string;
  grants: number;
  loans: number;
  planned: number;
};

export const data: Technology[] = [
  {
    name: 'Grid & Storage',
    grants: -3_486_533_774,
    loans: 4_900_000_000.0,
    planned: 68_000_000,
  },
  { name: 'Hydrogen', grants: -3_271_921_794, loans: 0, planned: 0 },
  { name: 'Advanced Manufacturing', grants: -1_846_645_401, loans: 0, planned: 0 },
  { name: 'Carbon Management', grants: -1_590_748_641, loans: 0, planned: 0 },
  { name: 'Other', grants: -499_767_179, loans: 0, planned: 25_000_000 },
  { name: 'Wind & Solar', grants: -385_074_491, loans: 0, planned: 0 },
  { name: 'Geothermal', grants: 8_600_000, loans: 0, planned: 30_000_000 },
  { name: 'Critical Minerals', grants: 0, loans: 0, planned: 1_099_000_000 },
  { name: 'Grid & Storage', grants: 19_847_566, loans: 1_600_000_000, planned: 0 },
  { name: 'Nuclear', grants: 3_539_000_000, loans: 1_000_000_000, planned: 259_200_000 },
  { name: 'Coal', grants: 0, loans: 1_500_000_000, planned: 625_000_000 },
  { name: 'Basic Sciences', grants: 0, loans: 0, planned: 899_000_000 },
];

// name is the funding type label; remaining keys are tech slugs mapped to amounts
type FundingRow = { name: string; [tech: string]: number | string };
export const positiveData: FundingRow[] = [
  {
    name: 'Grants',
    // 'grid-storage': -3_466_686_208,
    'grid-storage_2': 19_847_566,
    // hydrogen: -3_271_921_794,
    // 'advanced-manufacturing': -1_846_645_401,
    // 'carbon-management': -1_590_748_641,
    // other: -499_767_179,
    // 'wind-solar': -385_074_491,
    geothermal: 8_600_000,
    // 'critical-minerals': 0,
    nuclear: 3_539_000_000,
    coal: 1_500_000_000,
    'basic-sciences': 899_000_000,
  },
  {
    name: 'Loans',
    // 'grid-storage': 4_900_000_000,
    'grid-storage_2': 1_600_000_000,
    // hydrogen: 0,
    // 'advanced-manufacturing': 0,
    // 'carbon-management': 0,
    other: 25_000_000,
    // 'wind-solar': 0,
    geothermal: 30_000_000,
    'critical-minerals': 1_099_00_000,
    nuclear: 1_000_000_000,
    coal: 625_000_000,
    // 'basic-sciences': 0,
  },
  {
    name: 'Planned',
    'grid-storage': 68_000_000,
    // hydrogen: 0,
    // 'advanced-manufacturing': 0,
    // 'carbon-management': 0,
    // other: 25_000_000,
    // 'wind-solar': 0,
    // geothermal: 30_000_000,
    'critical-minerals': 1_099_000_000,
    nuclear: 259_200_000,
    // coal: 625_000_000,
    // 'basic-sciences': 899_000_000,
  },
];

/*
  
  
  | Tech                   | Grants           | Loans              | Planned     |
  | ---------------------- | ---------------- | ------------------ | ----------- |
  | Grid & Storage         | (3,486,533,774)  | (4,900,000,000.00) | 68,000,000  |
  | Hyodrgen               | (3,271,921,794)  | -                  | -           |
  | Advanced Manufacturing | (1,846,645,401)  | -                  | -           |
  | Carbon Management      | (1,590,748,641)  | -                  | -           |
  | Other                  | (499,767,179)    | 25,000,000         | -           |
  | Wind & Solar           | (385,074,491)    | -                  | -           |
  | Geothermal             | 8,600,000        | 30,000,000         | -           |
  | Critical Minerals      | 11,500,000       | 1,099,000,000      | -           |
  | Grid & Storage_2       | 19,847,566       | 1,600,000,000.00   | -           |
  | Nuclear                | 3,539,000,000    | 1,000,000,000.00   | 259,200,000 |
  | Coal                   | 1,500,000,000.00 | 625,000,000        | -           |
  | Basic Sciences         | 899,000,000      | -                  | -           |
  
  
  */

export const negativeData: FundingRow[] = [
  {
    name: 'Grants',
    'grid-storage': -3_486_533_774,
    hydrogen: -3_271_921_794,
    'advanced-manufacturing': -1_846_645_401,
    'carbon-management': -1_590_748_641,
    other: -499_767_179,
    'wind-solar': -385_074_491,
    // geothermal: 8_600_000,
    // 'critical-minerals': 0,
    // nuclear: 3_539_000_000,
    // coal: 0,
    // 'basic-sciences': 0,
  },
  {
    name: 'Loans',
    'grid-storage': -4_900_000_000,
    // hydrogen: 0,
    // 'advanced-manufacturing': 0,
    // 'carbon-management': 0,
    // other: 0,
    // 'wind-solar': 0,
    // geothermal: 0,
    // 'critical-minerals': 0,
    // nuclear: 1_000_000_000,
    // coal: 1_500_000_000,
    // 'basic-sciences': 0,
  },
  {
    name: 'Planned',
    // 'grid-storage': 68_000_000,
    // hydrogen: 0,
    // 'advanced-manufacturing': 0,
    // 'carbon-management': 0,
    // other: 25_000_000,
    // 'wind-solar': 0,
    // geothermal: 30_000_000,
    // 'critical-minerals': 1_099_000_000,
    // nuclear: 259_200_000,
    // coal: 625_000_000,
    // 'basic-sciences': 899_000_000,
  },
];
