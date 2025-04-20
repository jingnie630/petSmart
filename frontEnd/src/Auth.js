import { Auth } from "aws-amplify";


const checkAuth = async (callback) => {
  let email = null;
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    email = currentUser.attributes.email;
    console.log('user email', email);
    return email;
  } catch (err) {
    callback(err);
  }
};

export default checkAuth;