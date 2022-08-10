import { ReactNode, SyntheticEvent } from 'react';

export interface ILayout extends ISeoTags {
  children: ReactNode;
}
export interface IListItem {
  label: string;
  onClick?: () => void;
  route?: string;
  className?: string;
  icon?: string;
}
export interface APIResponse<T> {
  payload?: {
    results: T;
    count: number;
  };
  error?: string;
  message?: string;
}

export interface ISeoTags {
  title?: string;
  defaultTitle?: string;
  desc?: string;
  url?: string;
  image?: string;
}
export declare namespace Button {
  interface Base {
    route?: string;
    onClick?: (e: SyntheticEvent) => void;
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
  }
}

export declare namespace Form {
  interface Body {
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
    error: string;
  }
  interface Textarea extends Body {}
}

export declare namespace User {
  interface User {
    verified: boolean;
    username: string;
    profile_image_url: string;
    name: string;
    id: string;
    role: Role;
  }

  type Role = 'ADMIN' | 'USER';
}

export declare namespace Idea {
  type SortBy = 'votes' | 'date' | 'verifiedAuthor';

  interface NewIdea {
    message: string;
  }
  interface Idea extends NewIdea {
    id: string;
    userId: string;
    dateAdded: Date;
    upvotes?: { user: User.User }[];
    user?: User.User;
  }
}