import { FC } from 'react';

import type { SvgIconProps } from '@mui/material/SvgIcon';

interface RouteDefinition {
  path: string;
  title: string;
  component: FC;
  icon: FC<SvgIconProps>;
}

export interface SidebarLink {
  path: string;
  component: FC;
  title: string;
  icon: FC;
}

export type Routes = Record<string, RouteDefinition>;
