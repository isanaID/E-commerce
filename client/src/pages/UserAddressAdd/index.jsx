import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {LayoutOne, InputText, FormControl, Textarea, Button} from 'upkit';
// import {useForm} from 'react-hook-form';
import * as Validator from 'validatorjs';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import Input from './input';
import ShowErrors from './showErrors';
import { createAddress } from '../../api/address';

export default function useAddressData() {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [kota, setKota] = React.useState('');
    const [provinsi, setProvinsi] = React.useState('');
    const [kodepos, setKodepos] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

    const handleKotaChange = (event) => {
        setKota(event.target.value);
    }

    const handleProvinsiChange = (event) => {
        setProvinsi(event.target.value);
    }

    const handleKodeposChange = (event) => {
        setKodepos(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        let data = {
            name, address, kota, provinsi, kodepos
        };

        let rules = {
            name: 'required',
            address: 'required',
            kota: 'required',
            provinsi: 'required',
            kodepos: 'required|numeric'
        };

        let validation = new Validator(data, rules);
        validation.setAttributeNames({name: 'Nama Alamat', address: 'Alamat Lengkap', kota: 'Nama Kota', provinsi: 'Nama Provinsi', kodepos: 'Kode Pos'});
        validation.passes();
        setErrors([
            ...validation.errors.get('name'),
            ...validation.errors.get('address'),
            ...validation.errors.get('kota'),
            ...validation.errors.get('provinsi'),
            ...validation.errors.get('kodepos')
        ]);

        if(validation.passes()){
            createAddress(data)
            .then(response => {
                if(response.status === 200){
                    alert('Berhasil menambahkan Alamat');
                    navigate('/alamat-pengiriman');
                }else{
                    console.log(response.data.message);
                    alert('Gagal menambahkan alamat, silakan coba lagi');
                }
            })
            .catch(error => {
                console.log(error);
                alert('Gagal menambahkan alamat, silakan coba lagi');
            })
        }
    }

    return (
        <div>
        <div>
        <TopBar />
        </div>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5">
                        <h3>Isi alamat pengiriman anda</h3>
                    <ShowErrors errors={errors}/>
                    <form onSubmit={handleSubmit}>
                    <div className="form-outline">
                    <Input type="text" name="name" label="Name" placeholder="Nama Alamat" className='form-control input-line mx-auto mb-4' onChange={handleNameChange}/>
                    </div>
                    <div className="form-outline">
                    <textarea type="text" name="address" label="Alamat Lengkap" placeholder="Alamat Lengkap" className='form-control input-line mx-auto mb-4' onChange={handleAddressChange}/>
                    </div>
                    <div className="form-outline">
                    <Input type="text" name="kota" label="Nama Kota" placeholder="Nama Kota" className='form-control input-line mx-auto mb-4' onChange={handleKotaChange}/>
                    </div>
                    <div className="form-outline">
                    <Input type="text" name="provinsi" label="Nama Provinsi" placeholder="Nama Provinsi" className='form-control input-line mx-auto mb-4' onChange={handleProvinsiChange}/>
                    </div>
                    <div className="form-outline">
                    <Input type="text" name="kodepos" label="Kode POS" placeholder="Kode POS" className='form-control input-line mx-auto mb-4' onChange={handleKodeposChange}/>
                    </div>
                    <br />
                    <div>
                        <button type="submit" className='btn btn-primary'>Tambah</button></div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}