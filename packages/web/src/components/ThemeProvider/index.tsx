import * as React from 'react';
import { connect } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { IStore } from '@reducers';

interface IStoreState {
  isDarkMode: boolean;
}

const ThemeProvider: React.FC<IStoreState> = ({ isDarkMode, children }) => {
  // #E81E25 - red in logo
  // #3A54A5 - blue in logo

  const theme = createMuiTheme({
    shape: {
      borderRadius: 10
    },
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        light: '#93A1CD',
        main: '#1B274B',
        dark: '#0B0F1D'
      },
      secondary: {
        light: '#F06F74',
        main: '#E81E25',
        dark: '#941418'
      }
    },
    typography: {
      fontFamily: [
        'Open Sans',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const mapStateToProps = (state: IStore): IStoreState => ({
  isDarkMode: state.user.isDarkMode
});

export default connect(mapStateToProps)(ThemeProvider);
