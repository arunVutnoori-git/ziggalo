import React from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth, signInWithGoogle} from '../../firebase/firebase.util'

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            emailLoginGood : true
        }
    }

    handleSubmit = async event =>  {
        
        event.preventDefault();

        const {email,password} = this.state;

        try{

            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email : '', password : ''})


        }catch(error){
            this.setState({emailLoginGood : false});
            console.log("Bad request");
            console.error(error);
            console.log(error.message);
        }

        
    }
   
    handleChange = event => {
        
        const {value,name} = event.target;

        this.setState({[name] : value})

    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign using email and password</span>
                <form onSubmit={this.handleSubmit}>
                    
                    <FormInput 
                    name = 'email' 
                    type='email'
                    handleChange = {this.handleChange}
                    value={this.state.email}
                    label='Email'
                    required
                    
                    ></FormInput>

                    <FormInput 
                    name = 'password' 
                    type='password' 
                    handleChange = {this.handleChange}
                    value={this.state.password}
                    label = 'Password'
                    required>

                    </FormInput>
                    
                    <div className='buttons'>
                    <CustomButton type='submit'>SIGN IN</CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGooleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
                {
                    this.state.emailLoginGood ?
                    null : <h4 className='error-message'>Email or Password is wrong, Please Enter again</h4>
                }
            </div>
        )
    }
}

export default SignIn;