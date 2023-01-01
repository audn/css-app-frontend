export type IFormErrors = {
  [key: string]: false | string;
};

export interface INavItem {
  label: string;
  value?: string;
  condition?: boolean;
  onClick?: (val: string) => void;
  active?: string;
  _count?: { [key: string]: number };
  route?: string;
  className?: string;
  icon?: string;
}
export type Sizes = 'sm' | 'md' | 'lg' | 'xl';
