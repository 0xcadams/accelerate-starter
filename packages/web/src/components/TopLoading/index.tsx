import * as React from 'react';

import { default as Router, withRouter } from 'next/router';

import { default as LoadingBar } from 'react-top-loading-bar';

const Loading: React.FC<{}> = ({}) => {
  const [progress, setProgress] = React.useState(0);

  const addIncrement = () => setProgress(progress + (100 - progress) / 10);

  React.useEffect(() => {
    const interval = setInterval(() => {
      addIncrement();
    }, 50);

    return () => clearInterval(interval);
  });

  return <LoadingBar progress={progress} height={3} color="red" />;
};

const TopLoading: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  });

  return isLoading ? <Loading /> : <></>;
};

export default withRouter(TopLoading);
