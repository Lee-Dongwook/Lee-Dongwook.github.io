import 'twin.macro';

import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import styledImport from '@emotion/styled';

declare module 'twin.macro' {
  // The styled and css imports
  export const styled: typeof styledImport;
  export const css: typeof cssImport;
}

declare module 'react' {
  // The css prop
  export interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation;
    tw?: string;
  }

  interface SVGProps extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation;
    tw?: string;
  }
}
