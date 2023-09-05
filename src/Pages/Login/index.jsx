import { useState } from "react"
import { Layout } from "../../Components/Layout"
import { SignUp } from "../../Components/SignUp";
import { SignIn } from "../../Components/SignIn";

function Login() {

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const updateState = (value) => {
    setIsSignUpOpen(value)
  }

  return (
    <Layout>
      <div className={`${!isSignUpOpen ? '' : 'hidden'}`} >
        <SignIn updateState={updateState}/>
      </div>
      <div className={`${isSignUpOpen ? '' : 'hidden'}`}>
        <SignUp updateState={updateState}/>
      </div>
    </Layout>
  )
}

export { Login }