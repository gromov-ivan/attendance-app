import { FC } from 'react';

import type { SvgIconProps } from '@mui/material/SvgIcon';

interface CourseFormProps {
  setLessonData: React.Dispatch<React.SetStateAction<{ name: string; date: string }>>;
}

interface QrCodeGeneratorProps {
  lessonData: { name: string; date: string };
}
interface StudentFormPageProps {
  lessonData: { name: string; date: string };
}
interface HomePageProps {
  lessonData: { name: string; date: string };
}
interface Page1Props {
  lessonData: { name: string; date: string };
}
interface Page3Props {
  lessonData: { name: string; date: string };
}
interface StudentFormProps {
  lessonData: { name: string; date: string };
}

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
