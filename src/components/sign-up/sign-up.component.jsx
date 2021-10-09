import React from 'react'
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import  {auth,createUserProfileDocument} from '../../firebase/firebase.util'

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            displayName : '',
            email : '' ,
            password : '',
            confirmpassword : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName,email,password,confirmpassword} = this.state;

        if(password !== confirmpassword) {
            alert("Passwords don't match");
            return;
        }

        try {

            const {user} = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user,{displayName});

            this.setState({
                displayName : '',
                email : '' ,
                password : '',
                confirmpassword : ''
        
            })

        }catch(error) {
            console.error(error);
        }

    }

    handleChange = event => {

        const {name,value} = event.target;

        this.setState({
            [name] : value
        })
        
    }



    render () {
        return(
            <div className='sign-up'>
                <h2>I Don't Have an Account</h2>
                <span>Create an Account Here</span>
                <form onSubmit={this.handleSubmit}>
                <FormInput name='displayName' type='text' value={this.state.displayName}
                    onChange={this.handleChange} label = 'Name' required
                ></FormInput>
                <FormInput name='email' type='email' value={this.state.email}
                    onChange={this.handleChange} label = 'Email' required
                ></FormInput>
                <FormInput name='password' type='password' value={this.state.password}
                    onChange={this.handleChange} label = 'Create Password' required
                ></FormInput>
                <FormInput name='confirmpassword' type='password' value={this.state.confirmpassword}
                    onChange={this.handleChange} label = 'Confirm Password' required
                ></FormInput>
    
                <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
    
            </div>
        )
    }

}

export default SignUp;