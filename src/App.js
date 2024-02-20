import AppLayout from './components/AppLayout';
import AuthProvider from './containers/AuthProvider';
import AuthContainer from './containers/AuthContainer';
import CallController from './containers/CallController';
import CallDemoContainer from './containers/CallDemoContainer';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
