import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firbase';
import { useNavigate } from 'react-router-dom';

interface AccountInterface {
  name: string;
  email: string;
  password: string;
}

const Wrapper = styled.div`
  height: 100%;
  flex: 1;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;
const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-size: 1rem;
  color: tomato;
`;

export default function Join() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [account, setAccount] = useState<AccountInterface>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, password } = account;

    e.preventDefault();

    try {
      if (isLoading || !name || !email || !password) return;

      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: name,
      });
      navigate('/');
    } catch (e) {
      setError('Error Occured');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Wrapper>
      <Title>Join</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          value={account?.name}
          required
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={account?.email}
          required
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={account?.password}
          required
          onChange={handleChange}
        />
        {isLoading ? (
          <Input type="button" value="Loading..." />
        ) : (
          <Input type="submit" value="Create" />
        )}

        {error && <Error>{error}</Error>}
      </Form>
    </Wrapper>
  );
}
