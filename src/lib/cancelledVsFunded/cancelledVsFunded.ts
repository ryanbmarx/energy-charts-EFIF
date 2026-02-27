type Technology = {
  name: string;
  grants: number;
  loans: number;
  planned: number;
};

type NamedValue = { name: string; value: number };

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

export const grants: NamedValue[] = [
  { name: 'Grid & Storage', value: -3_486_533_774 },
  { name: 'Hydrogen', value: -3_271_921_794 },
  { name: 'Advanced Manufacturing', value: -1_846_645_401 },
  { name: 'Carbon Management', value: -1_590_748_641 },
  { name: 'Other', value: -499_767_179 },
  { name: 'Wind & Solar', value: -385_074_491 },
  { name: 'Geothermal', value: 8_600_000 },
  { name: 'Critical Minerals', value: 0 },
  { name: 'Grid & Storage', value: 19_847_566 },
  { name: 'Nuclear', value: 3_539_000_000 },
  { name: 'Coal', value: 0 },
  { name: 'Basic Sciences', value: 0 },
];

export const loans: NamedValue[] = [
  { name: 'Grid & Storage', value: -4_900_000_000 },
  { name: 'Hydrogen', value: 0 },
  { name: 'Advanced Manufacturing', value: 0 },
  { name: 'Carbon Management', value: 0 },
  { name: 'Other', value: 0 },
  { name: 'Wind & Solar', value: 0 },
  { name: 'Geothermal', value: 0 },
  { name: 'Critical Minerals', value: 0 },
  { name: 'Grid & Storage', value: 1_600_000_000 },
  { name: 'Nuclear', value: 1_000_000_000 },
  { name: 'Coal', value: 1_500_000_000 },
  { name: 'Basic Sciences', value: 0 },
];

export const planned: NamedValue[] = [
  { name: 'Grid & Storage', value: 68_000_000 },
  { name: 'Hydrogen', value: 0 },
  { name: 'Advanced Manufacturing', value: 0 },
  { name: 'Carbon Management', value: 0 },
  { name: 'Other', value: 25_000_000 },
  { name: 'Wind & Solar', value: 0 },
  { name: 'Geothermal', value: 30_000_000 },
  { name: 'Critical Minerals', value: 1_099_000_000 },
  { name: 'Grid & Storage', value: 0 },
  { name: 'Nuclear', value: 259_200_000 },
  { name: 'Coal', value: 625_000_000 },
  { name: 'Basic Sciences', value: 899_000_000 },
];
