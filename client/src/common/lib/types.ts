export type IFormErrors = {
  [key: string]: false | string;
};
export type Navigation = {
  title: string;
  route: string;
  icon?: string[];
  dropdown?: boolean;
};
export type Sizes = 'sm' | 'md' | 'lg' | 'xl';
