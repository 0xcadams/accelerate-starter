import * as React from 'react';

import { NextSeo } from 'next-seo';
import { default as router, useRouter } from 'next/router';

import { initGA, logPageView } from '@api/analytics';

import AuthModal from '@components/AuthModal';
import Authorization from '@components/Authorization';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Snackbar from '@components/Snackbar';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        height: '100%',
        margin: 0,
        fontFamily: "'Open Sans', sans-serif"
      },
      html: {
        height: '100%',
        margin: 0
      },
      a: {
        color: theme.palette.type === 'dark' ? 'white' : 'inherit'
      },
      '#__next': {
        height: '100%',
        margin: 0
      }
    }
  });

type IProps = WithStyles<typeof styles> & {
  isMobile: boolean;
};

const getTitle = (pathname: string) => {
  switch (pathname) {
    case '/about':
      return 'About Us';
    case '/contact':
      return 'Contact Us';
    case '/feedback':
      return 'Provide Feedback';
    case '/privacy':
      return 'Privacy Policy';
    case '/profile':
      return 'Your Profile';
    case '/support':
      return 'Support';
    case '/terms':
      return 'Terms of Use';
    case '/verify':
      return 'Verify';
    default:
      return 'Home';
  }
};

const Layout: React.FC<IProps> = ({ children, isMobile }) => {
  const { pathname } = useRouter();

  React.useEffect(() => {
    initGA();
    logPageView();

    if (router.router) {
      router.router.events.on('routeChangeComplete', logPageView);
    }
    return () => {
      if (router.router) {
        router.router.events.off('routeChangeComplete', logPageView);
      }
    };
  }, []);

  const description =
    'Change the way you research with micromarket analytics and investor-grade data on every neighborhood in the US.';

  return (
    <>
      <NextSeo
        title={getTitle(pathname)}
        description={description}
        titleTemplate="Accelerate | %s"
        openGraph={{
          site_name: 'Accelerate Starter'
        }}
      />
      <AuthModal />
      <Snackbar />
      <Header isMobile={isMobile} />
      <Authorization>{children}</Authorization>
      <Footer />
    </>
  );
};

export default withStyles(styles)(Layout);
