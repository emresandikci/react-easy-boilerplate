import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Box } from 'esducad-ui';
import { defaultTheme, GlobalStyle } from 'esducad-ui/dist/utils';
import { Home } from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Seo } from 'utils';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Seo />
      <Box>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
