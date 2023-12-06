import { FC, Suspense, lazy, useEffect, useState } from 'react';

import sleep from '@/utils/sleep';

import { AnyProps, LoadComponent, LoaderDefaultOptions } from './types';

function getDelayedFallback(Fallback: FC, delay: number) {
  return function DelayedFallback(props: AnyProps) {
    const [isDelayPassed, setIsDelayPassed] = useState(false);

    useEffect(() => {
      const timerId = setTimeout(() => setIsDelayPassed(true), delay);

      return () => clearTimeout(timerId);
    }, []);

    return isDelayPassed ? <Fallback {...props} /> : null;
  };
}

const getLazyComponent = (loadComponent: LoadComponent, loaderOptions: LoaderDefaultOptions) =>
  lazy(() => {
    // fix the moment of starting loading
    const start = performance.now();
    // start loading
    return loadComponent().then((moduleExports) => {
      // loading is finished
      const end = performance.now();
      const diff = end - start;

      const { delay, minimumLoading } = loaderOptions;

      if (diff < delay || (diff > delay && diff > delay + minimumLoading)) {
        return moduleExports;
      }

      return sleep(delay + minimumLoading - diff).then(() => moduleExports);
    });
  });

function asyncComponentLoader(
  loadComponent: LoadComponent,
  additionalProps: AnyProps,
  loaderOptions: LoaderDefaultOptions,
  FallbackWaiting: FC,
) {
  const Fallback = loaderOptions.delay
    ? getDelayedFallback(FallbackWaiting, loaderOptions.delay)
    : FallbackWaiting;

  const LazyComponent = getLazyComponent(loadComponent, loaderOptions);

  return function AsyncComponent(props: AnyProps) {
    return (
      <Suspense fallback={<Fallback />}>
        <LazyComponent {...additionalProps} {...props} />
      </Suspense>
    );
  };
}

export { getDelayedFallback };

export default asyncComponentLoader;
