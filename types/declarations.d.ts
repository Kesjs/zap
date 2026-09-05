declare module '@heroicons/react/24/outline' {
  import * as React from 'react';
  export const CheckBadgeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const DocumentTextIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const ClockIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const CurrencyDollarIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const PencilSquareIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const ShareIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const Bars3Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const XMarkIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const ChevronDownIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export const CheckIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  const content: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };
  export default content;
}

declare module '@heroicons/react/24/solid' {
  import * as React from 'react';
  export const CheckIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  const content: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };
  export default content;
}

declare module 'next/link' {
  import * as React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/dynamic' {
  import * as React from 'react';
  export default function dynamic<T = any>(loader: () => Promise<any>, options?: any): React.ComponentType<T>;
}

declare module 'next' {
  export type Metadata = any;
}

declare module 'next/image' {
  import * as React from 'react';
  const Image: React.ComponentType<any>;
  export default Image;
}


