import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Validator from 'validatorjs';
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Input from "./input";
import ShowErrors from "./showErrors";
import StoreLogo from '../../components/StoreLogo';

export default class Register extends React.Component {
    state = {
        email: '',
        password: '',
        full_name: '',
        repassword: '',
        errors: []
    }
    
    handleSubmit = event => {
        event.preventDefault();
        const {email, password, full_name, repassword} = this.state;

        let data = {
            email, password, full_name, repassword
          };
          
          let rules = {
            email: 'required|email',
            password: 'required|min:8',
            full_name: 'required',
            repassword: 'required|same:password'
          };
          
          let validation = new Validator(data, rules);
          validation.setAttributeNames({full_name: 'Nama', email: 'Email', password: 'Password', repassword: 'Masukan ulang Password'});
          validation.passes();
          this.setState({
            errors: [
            ...validation.errors.get('full_name'),
            ...validation.errors.get('email'),
            ...validation.errors.get('password'),
            ...validation.errors.get('repassword')
            ]
          })

            if(validation.passes()){
                registerUser(this.state)
                .then(response => {
                    if(response.status === 200){
                        const navigate = useNavigate();
                        alert('Berhasil mendaftar, silakan login');
                        navigate('/login');
                    }else{
                        console.log(response.data.message);
                        alert('Gagal mendaftar, silakan coba lagi');
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('Gagal mendaftar, silakan coba lagi');
                })
            }

    }
    
    render() {
        return(
            <div className="body"><div className='bold-line'></div>
            <div className="text-center mb-5">
            <StoreLogo/>
            </div>  
                <div className="containerregis">   
                <div className='window'>
                <div className='overlay'></div>
                    <div className='content'>
                    <div className='welcome'>Registration</div>
                    <div className='subtitle'>Untuk mendapatkan akun, silakan mendaftar.</div>
                <div className='input-fields'></div>
                <ShowErrors errors={this.state.errors}/>
            <form onSubmit={this.handleSubmit}>
                <Input type="text" name="full_name" label="Nama" placeholder="Nama" className='input-line full-width' onChange={value => this.setState({full_name: value})}/>
                <Input type="text" name="email" label="email" placeholder="Email" className='input-line full-width' onChange={value => this.setState({email: value})}/>
                <Input type="password" name="password" label="Password" placeholder="Password" className='input-line full-width' onChange={value => this.setState({password: value})}/>
                <Input type="password" name="repassword" label="Masukan ulang Password" placeholder="Masukan ulang Password" className='input-line full-width' onChange={value => this.setState({repassword: value})}/>
            <br />
            <div><button type="submit" className='ghost-round full-width'>Sign Up</button></div>
            </form>
            </div>
            </div>
            </div>
            </div>
        )
    }
    
}