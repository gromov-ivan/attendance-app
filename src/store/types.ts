import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import RootStore from '@/store/reducers';

type SomeState = {
  prop1: string;
  prop2: number;
};

type Action<T = any> = ReduxAction<string> & {
  payload?: T;
};

type AtomEffectParams = {
  [key: string]: any;
};

export type { AtomEffectParams, Action, SomeState };
