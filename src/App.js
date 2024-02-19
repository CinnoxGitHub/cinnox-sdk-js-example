import AppLayout from './components/AppLayout';
import AuthContainer from './containers/AuthContainer';
import CallDemoContainer from './containers/CallDemoContainer';

function App() {
  return (
    <div className="App">
      <AppLayout
        loginSection={<AuthContainer />}
        callDemoSection={<CallDemoContainer />}
      />
    </div>
  );
}

export default App;
