import App from '@/containers/app/AppContainer';

import history from '@/utils/history';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

const mountNode = document.getElementById('root');

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: '#efefef',
      form: '#ffffff',
      greenBackground: '#0e6415',
    },
    text: {
      /*  #344056 azulito propuesto por Cath  */ primary: '#000000',
      secondary: '#0e6415',
      disabled: '#344056',
    },
    button: {
      primary: '#344056',
      secondary: '#0e6415',
    },
    color: {
      saffron: '#f2c000',
      charcoal: '#344056',
      darkGreenX11: '#0e6415',
      white: '#ffffff',
      black: '#000000',
      cultured: '#efefef',
    },
  },
});

ReactDOM.render(
  <Suspense fallback={<div>Error! Please refresh the page</div>}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Suspense>,
  mountNode
);
