import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Signup from './components/Signup/Signup';
import Private from './components/Private/Private';
import Login from './components/Login/Login';
import Addproduct from './components/Addproducts/Addproduct';
import Allproducts from './components/Allproducts/Allproducts';
import Update from './components/update/Update';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>

        <Route element = {<Private />}>
        <Route path = "/" element = {<Allproducts />}/>
        <Route path = "/add" element = {<Addproduct />}/>
        <Route path = "/update/:id" element = {<Update />}/>
        <Route path = "/profile" element = {<h1>this is profile page</h1>}/>
        </Route>
        <Route path='/signup' element = {<Signup />}/>
        <Route path = "/login" element = {<Login />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
