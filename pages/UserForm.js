import React from 'react';
import { useState} from 'react';

const Field = ({ children }) => (
  <>
    {children}
    <br />
  </>
);

const Input = ({ value, onChange, ...props }) => (
  <input
    {...props}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

const SubmitButton = (props) => (
  <button {...props}>submit</button>
);

const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <Field>
        email: <Input value={email} onChange={setEmail} />
      </Field>
      <Field>
        password:{' '}
        <Input
          value={password}
          onChange={setPassword}
          type="password"
        />
      </Field>
      <SubmitButton onClick={() => onSubmit(email, password)} />
    </React.Fragment>
  );
};

export default UserForm;

// <FormWrapper>
//         <h1>create user</h1>
//         <UserForm onSubmit={createUserWithEmailAndPassword} />
//       </FormWrapper>

//       <FormWrapper>
//         <h1>sign in</h1>
//         <UserForm onSubmit={signInWithEmailAndPassword} />
//       </FormWrapper>

//       <FormWrapper>
//         <h1>sign out</h1>
//         <button onClick={signOut}>sign out</button>
//       </FormWrapper>

//       <FormWrapper>
//         <h1>clear error</h1>
//         <button onClick={() => setError(null)}>clear error</button>
//       </FormWrapper>

//       <FormWrapper>
//         <h1>user data</h1>
//         <textarea
//           style={{ width: 350, height: 200 }}
//           value={JSON.stringify(user, null, 2)}
//         />
//       </FormWrapper>

//       <FormWrapper>
//         <h1>error data</h1>
//         <textarea style={{ width: 350, height: 200 }} value={error} />
//       </FormWrapper>