import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  useEffect(() => {
    validateConfirmPassword();
  }, [confirmPassword]); // Validate whenever confirmPassword changes

  function validateName() {
    const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    setNameValid(namePattern.test(name));
  }

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(email));
  }

  function validatePassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(passwordPattern.test(password));
  }

  function validateConfirmPassword() {
    if(confirmPassword === "") {
      setConfirmPasswordValid(true)
      return
    }
    setConfirmPasswordValid(password === confirmPassword && password.length > 0);
    // console.log(password);
    // console.log(confirmPassword);
  }

  function handleConfirmPasswordChange(ev) {
    const newConfirmPassword = ev.target.value;
    setConfirmPassword(newConfirmPassword);
  }

  async function registerUser(ev) {
    ev.preventDefault();

    if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
      try {
        await axios.post("/register", {
          name,
          email,
          password,
        });
        alert("Registration successful. Now you can log in");
      } catch (e) {
        console.log(e.message);
        alert("Registration failed. Please try again later");
      }
    } else {
      alert("Registration failed. Please enter valid information.");
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
                validateName();
              }}
            />
            {!nameValid && (
              <span className="ml-2 text-red-300">Please enter a valid name</span>
            )}
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
                validateEmail();
              }}
            />
            {!emailValid && (
              <span className="ml-2 text-red-300">Please enter a valid email</span>
            )}
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
                validatePassword();
              }}
            />
            {!passwordValid && (
              <span className="ml-2 text-red-300">
                Password Weak
              </span>
            )}

            <input
              type="password"
              placeholder="Confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!confirmPasswordValid && (
              <span className="ml-2 text-red-300">Passwords do not match</span>
            )}
            
          <button className="mt-2 primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}