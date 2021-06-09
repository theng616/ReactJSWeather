import MainPage from '../Scenes/MainPage';
import DetailPage from '../Scenes/DetailPage';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../Redux/store/store.js';

function Navigation() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={MainPage} exact />
        <Route path="/detailpage" component={DetailPage} />
      </BrowserRouter>
    </Provider>
  )
}

export default Navigation;