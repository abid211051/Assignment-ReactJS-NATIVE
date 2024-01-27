import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}