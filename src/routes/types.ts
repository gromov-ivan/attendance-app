import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  HomePage,
  Page1,
  QrCode,
  Page3,
  StudentForm,
}

interface CourseFormProps {
  setLessonData: React.Dispatch<React.SetStateAction<{ name: string; date: string }>>;
}

type NestedRoute = {
  component: FC;
  path: string;
  title: string;
  icon?: FC<SvgIconProps>;
};

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

type PathRouteCustomProps = {
  title?: string;
  component: FC<CourseFormProps> | FC; 
  icon?: FC<SvgIconProps>;
  routes?: NestedRoute[];
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
