import { INavItem } from '../../lib/types';

const pages: Array<INavItem> = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'GitHub',
    route: 'https://github.com/audn/react-boilerplate',
  },
];
const resources: Array<INavItem> = [
  {
    label: 'CodePen',
    route: 'https://codepen.io/',
  },
  {
    label: 'JSFiddle',
    route: 'https://jsfiddle.net/',
  },
];
const community: Array<INavItem> = [
  {
    label: 'Discord',
    route: 'https://discord.gg/YA39qjzwNy',
  },
  //   {
  //     label: 'Twitter',
  //     route: '#',
  //   },
];
const lists = [
  {
    label: 'Pages',
    list: pages,
  },
  {
    label: 'Resources',
    list: resources,
  },
  {
    label: 'Community',
    list: community,
  },
];

export { lists };
