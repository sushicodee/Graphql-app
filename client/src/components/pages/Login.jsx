import React , {useContext} from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../../utils/hooks/useForm";
import {AuthContext} from './../../context/auth';

function Login(props) {
  const {user,login,logout} = useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
  };
  const { values, onSubmit, onChange, errors, seterrors } = useForm(
    handleSubmit,
    initialState
  );
  const formdata = [
    {
      label: "Username",
      placeholder: "Username ...",
      name: "username",
    },
    {
      label: "Password",
      placeholder: "Password ...",
      name: "password",
      type: "password",
    },
  ];

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, {data:{login:userData}}) {
      login(userData)
      props.history.push("/");
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function handleSubmit() {
    loginUser();
  }
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        {formdata.map((field) => (
          <Form.Input
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            name={field.name}
            value={values[field.name]}
            error={errors[field.name] ? true : false}
            onChange={onChange}
          ></Form.Input>
        ))}
        {Object.keys(errors).length > 0 && (
          <div className="error-message-container">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li >{value}</li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
}
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      accessToken
      refreshToken
    }
  }
`;
export default Login;
