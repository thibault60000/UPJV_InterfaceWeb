import React from 'react';
import {Button} from 'react-materialize'
import { auth } from '../../firebase';

const SignOutButton = () =>
  <Button waves='light'
    onClick={auth.doSignOut}
  >
    Se déconnecter
  </Button>

export default SignOutButton;
