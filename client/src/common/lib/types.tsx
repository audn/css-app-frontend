export type IFormErrors = {
  [key: string]: false | string;
};

// export type Navigation = {
//   title: string;
//   route: string;
//   icon?: string[];
// };
export interface INavItem {
  label: string;
  onClick?: () => void;
  route?: string;
  className?: string;
  icon?: string;
  list?: INavItem[]; //activates dropdown
}
export type Sizes = 'sm' | 'md' | 'lg' | 'xl';
