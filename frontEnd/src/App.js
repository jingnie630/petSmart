import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/userProfile/UserProfile"
import Layout from "./layout/Layout";
import { Amplify } from 'aws-amplify';
import Product from "./pages/product/product";
import Cart from "./pages/cart/Cart";


// Key                 CognitoUserPoolClientId
// Description         Cognito User Pool Client ID
// Value               6ukpmp29fm4h6hpa9fq17vuje4

// Key                 CognitoUserPoolId
// Description         Cognito User Pool ID
// Value               us-west-2_fXtfhYTec

Amplify.configure({
  Auth: {
    region: 'us-west-2',
    userPoolId: 'us-west-2_64B5fbzI1',
    userPoolWebClientId: '54dp5bot4bp6iqooh4m2k03k5f',
  }
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element = {<Register />}/>
      <Route path="/layout" element = {<Layout />}/>
      
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element = {<Dashboard />}/>
        <Route path="/Profile" element = {<Profile />}/>
        <Route path="/product" element = {<Product />}/>
        <Route path="/cart" element = {<Cart />}/>
      </Route>

      {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
  );
}

export default App;
