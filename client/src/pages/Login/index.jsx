import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Form } from 'react-bootstrap';
import * as Validator from 'validatorjs';
import { userLogin } from '../../features/Auth/actions';
import { useDispatch } from 'react-redux';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
// import StoreLogo from '../../components/StoreLogo';
import Input from './input';
import ShowErrors from './showErrors';

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            email, password
        };

        let rules = {
            email: 'required|email',
            password: 'required|min:5'
        };
        
        let validation = new Validator(data, rules);
        validation.setAttributeNames({email: 'Email', password: 'Password'});
        validation.passes();
        setErrors([
            ...validation.errors.get('email'),
            ...validation.errors.get('password')
        ]);

        if(validation.passes()){
        let userSign = login(email, password);
        userSign.then(response => {
            let signData = response.data;
            console.log(userSign);
            console.log(signData);
            let {user, token} = signData;
            dispatch(userLogin(user, token));
            console.log(user, token);
            navigate('/');
        })
        .catch(error => {
            setErrors(['Email atau Password salah']);
        })
    }
    }

        return(
            <div>
                <div>
                <TopBar />
                </div>
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <div className="card px-5 py-5">
                            <ShowErrors errors={errors}/>
                            <form onSubmit={handleSubmit}>
                            <div className="form-outline">
                            <Input type="text" name="email" label="email" placeholder="Email" className='form-control input-line mx-auto mb-4' onChange={handleEmailChange}/>
                            </div>
                            <div className="form-outline">
                            <Input type="password" name="password" label="Password" placeholder="Password" className='form-control input-line mx-auto mb-4' onChange={handlePasswordChange}/>
                            </div>
                            <br />
                            <div>
                                <button type="submit" className='btn btn-primary'>Login</button></div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}


// export default class Login extends React.Component {
//     state = {
//         email: '',
//         password: '',
//         errors: []
//     };

//     handleSubmit = event => {
//         event.preventDefault();
//         const {email, password} = this.state;
//         const navigate = useNavigate();

//         let data = {
//             email, password
//         };

//         let rules = {
//             email: 'required|email',
//             password: 'required|min:8'
//         };

//         let validation = new Validator(data, rules);
//         validation.setAttributeNames({email: 'Email', password: 'Password'});
//         validation.passes();
//         this.setState({
//             errors: [
//             ...validation.errors.get('email'),
//             ...validation.errors.get('password')
//             ]
//         })

//         if(validation.passes()){
//             login(this.state)
//             .then(response => {
//                 if(response.status === 200){
//                     alert('Berhasil mendaftar, silakan login');
//                     navigate('/login');
//                 }else{
//                     console.log(response.data.message);
//                     alert('Gagal mendaftar, silakan coba lagi');
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 alert('Gagal mendaftar, silakan coba lagi');
//             })
//         }
//     }

//     render() {
//         return(
//             <div className="container">
//                 <ShowErrors errors={this.state.errors}/>
//                 <form onSubmit={this.handleSubmit}>
//                 <Input type="text" name="email" label="email" placeholder="Email" className='input-line full-width' onChange={value => this.setState({email: value})}/>
//                 <Input type="password" name="password" label="Password" placeholder="Password" className='input-line full-width' onChange={value => this.setState({password: value})}/>
//                 <br />
//                 <div><button type="submit" className='ghost-round full-width'>Login</button></div>
//                 </form>
//             </div>
//         )
//     }

// }