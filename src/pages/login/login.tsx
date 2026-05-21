import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { clearUserErrors, loginUser } from '../../services/slices/userSlice';
import { selectUserError } from '../../services/selectors/userSelectors';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorText = useSelector(selectUserError);

  useEffect(() => {
    dispatch(clearUserErrors());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorText || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
