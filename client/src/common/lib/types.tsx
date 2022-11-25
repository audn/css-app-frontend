export type IFormErrors = {
  [key: string]: false | string;
};

export interface INavItem {
  label: string;
  //   value?: string;
  onClick?: (val: string) => void;
  active?: string;
  route?: string;
  className?: string;
  icon?: string;
}
export type Sizes = 'sm' | 'md' | 'lg' | 'xl';
