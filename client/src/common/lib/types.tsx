export type IFormErrors = {
  [key: string]: false | string;
};

export interface INavItem {
  label: string;
  onClick?: () => void;
  route?: string;
  className?: string;
  icon?: string;
}
export type Sizes = 'sm' | 'md' | 'lg' | 'xl';
