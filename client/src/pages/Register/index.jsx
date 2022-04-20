import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Validator from 'validatorjs';
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Input from "./input";
import ShowErrors from "./showErrors";
import TopBar from "../../components/TopBar";

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
            <div>
            <TopBar/>
            </div>  
            <div className="container mt-5">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-6">
                            <div class="card px-5 py-5" id="form1">
                    <div className='subtitle'>Untuk mendapatkan akun, silakan mendaftar.</div>
                <div className='input-fields'></div>
                <ShowErrors errors={this.state.errors}/>
            <form onSubmit={this.handleSubmit}>
                <Input type="text" name="full_name" label="Nama" placeholder="Nama" className='form-control input-line mx-auto mb-4' onChange={value => this.setState({full_name: value})}/>
                <Input type="text" name="email" label="email" placeholder="Email" className='form-control input-line mx-auto mb-4' onChange={value => this.setState({email: value})}/>
                <Input type="password" name="password" label="Password" placeholder="Password" className='form-control input-line mx-auto mb-4' onChange={value => this.setState({password: value})}/>
                <Input type="password" name="repassword" label="Masukan ulang Password" placeholder="Masukan ulang Password" className='form-control input-line mx-auto mb-4' onChange={value => this.setState({repassword: value})}/>
            <br />
            <div><button type="submit" className='btn btn-primary'>Sign Up</button></div>
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
    
}