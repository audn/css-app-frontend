import {
  HTMLInputTypeAttribute,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { INavItem } from './types';

// export interface IBase {
//   children?: ReactNode;
//   className?: string;
// }
export type IDropdown = {
  children: ReactNode;
  active?: string;
  className?: string;
  wrapperClassName?: string;
  isLoading?: boolean;
  open?: boolean;
  list?: {
    value?: string;
    label: string;
    _count?: Distribution;
  }[] &
    Partial<INavItem[]>;
  component?: ReactElement;
  onClick?: (val: string) => void;

  options?: {
    toggleOnClick?: boolean;
    caret?: boolean;
    position?: 'start' | 'center' | 'end';
    box?: boolean;
    animateCaret?: boolean;
  };
};

export type IPostSchemas = 'component' | 'layout';
export type Distribution = { components: number; layouts: number };
export declare namespace API {
  namespace Requests {
    interface SearchComponents {
      q?: string;
      filter?: {
        animated?: boolean;
        theme?: string;
        library?: string;
        categories?: string[];
      };
    }
  }
  interface Response<T = { T?: any }> {
    payload?: {
      results: T;
      distribution: Distribution;
      count?: number;
    };
    error?: string;
    message?: string;
  }
  type UserRoles = 'ADMIN' | 'USER' | 'MOD';

  namespace Models {
    interface Category {
      label: string;
      value: string;
      //   _count?: {
      //     components: number;
      //   };
    }
    interface Library {
      label: string;
      value: string;
      versions: string[];
      _count: Distribution;
    }

    interface User {
      id: string;
      githubId: string;
      username: string;
      displayName: string;
      bio: string;
      location: string;
      websiteUrl: string;
      tokens?: any;
      avatar: string;
      role: string;
      createdAt: Date;
      components?: API.Models.Component[];
      layouts?: API.Models.Layout[];
    }

    export interface Author {
      id: string;
      githubId: string;
      username: string;
      displayName: string;
      bio: string;
      location: string;
      websiteUrl: string;
      tokens?: any;
      avatar: string;
      role: string;
      createdAt: Date;
    }

    export interface User {
      id: string;
      githubId: string;
      username: string;
      displayName: string;
      bio: string;
      location: string;
      websiteUrl: string;
      tokens?: any;
      avatar: string;
      role: string;
      createdAt: Date;
    }

    interface Component {
      id: string;
      title: string;
      code: string;
      css?: any;
      description: string;
      generatedImage: string;
      animated: boolean;
      responsive: boolean;
      theme: string;
      authorId: string;
      category: string;
      library: string;
      libraryVersion: string;
      createdAt: Date;
      author: User;
      likes: ComponentLike[];
      saves: ComponentSave[];
    }
    interface ComponentLike {
      id: string;
      componentLike: string;
      userId: string;
      createdAt: Date;
      user: User;
    }

    interface ComponentSave {
      id: string;
      componentSave: string;
      userId: string;
      createdAt: Date;
      user: User;
    }

    interface Layout {
      id: string;
      title: string;
      code: any;
      description: string;
      generatedImage?: string;
      animated: boolean;
      theme: string;
      responsive: boolean;
      bio?: string;
      location?: string;
      websiteUrl?: string;
      tokens?: string;

      //   author: User;
      category: string;
      authorId: string;
      author: User;
      library: string;
      libraryVersion?: string;
      createdAt: string;
    }
  }
}

export declare namespace Hydration {
  type ReactQueryProps = {
    refetch: () => void;
    isRefetching: boolean;
    isLoading: boolean;
    error: unknown;
    //custom prop
    onClearFilters?: () => void;
  };

  interface Components extends ReactQueryProps {
    data?: API.Models.Component[];
  }
  interface Category extends ReactQueryProps {
    data?: API.Response<API.Models.Category[]>;
  }
}
export declare namespace Alert {
  interface Base {
    title?: string;
    label?: string;
    onClick?: (e: SyntheticEvent) => void;
    isLoading?: boolean;
  }
}

export declare namespace Form {
  interface InputBase {
    placeholder?: string;
    value?: string;
    inputClassName?: string;
    error?: string;
    onChange: (value: string) => void;
  }
  interface Base {
    id: string;
    disabled?: boolean;
    description?: string | ReactNode;
    label?: string;
    required?: boolean;
    regex?: (val: string) => void;
    autoFocus?: boolean;
  }

  interface Toggle extends Base {
    active?: boolean;
    onClick: (val: boolean) => void;
    isLoading?: boolean;
    className?: string;
  }
  interface Radio extends Base {
    active?: boolean;
    name: string;
    onClick: (val?: boolean) => void;
    isLoading?: boolean;
    className?: string;
  }
  interface Textarea extends Base, InputBase {
    minLength?: number;
    maxLength?: number;
  }
  interface Label extends Base {}
  interface Input extends Base, InputBase {
    type?: HTMLInputTypeAttribute;
    onFocus?: () => void;
    onBlur?: () => void;
  }
}
export declare namespace Button {
  interface Base {
    className?: string;
    icon?: string;
    trustRoute?: boolean;
    onClick?: (e: SyntheticEvent) => void;
    title?: string | ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
  }
}
