import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppLayout from './components/AppLayout';
import AuthProvider from './containers/AuthProvider';
import AuthContainer from './containers/AuthContainer';
import CallController from './containers/CallController';
import CallDemoContainer from './containers/CallDemoContainer';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {({ isLogin }) => {
            return (
              <AppLayout
                loginSection={<AuthContainer />}
                callDemoSection={isLogin && (
                  <CallController>
                    <CallDemoContainer />
                  </CallController>
                )}
              />
            )
          }}
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
