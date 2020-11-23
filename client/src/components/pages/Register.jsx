import React , {useContext} from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useForm} from '../../utils/hooks/useForm';
import {AuthContext} from './../../context/auth';

function Register(props) {
  const {login} = useContext(AuthContext);
  const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
  };
  const {values,onSubmit,onChange,errors,seterrors} = useForm(handleSubmit,initialState);  
  const formdata = [
    {
      label: "Username",
      placeholder: "Username ...",
      name: "username",
    },
    {
      label: "Email",
      placeholder: "Email ...",
      name: "email",
    },
    {
      label: "Password",
      placeholder: "Password ...",
      name: "password",
      type: "password",
    },
    {
      label: "Confirm Password",
      placeholder: "Confirm Password ...",
      name: "confirmPassword",
      type: "password",
    },
  ];
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, {data:{register:registerData}}) {
      props.history.push("/");
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function handleSubmit(){
    addUser();
  }
  return (
    <div>
      <h1>Register</h1>
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
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      accessToken
      refreshToken
    }
  }
`;
export default Register;
