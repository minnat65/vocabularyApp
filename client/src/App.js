
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import WordDetailPage from './pages/wordDetailPage';


function App() {
  
  return (

    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/word/:id' exact>
            <WordDetailPage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
