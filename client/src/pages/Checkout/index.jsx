import * as React from 'react'; 
import { LayoutOne, Text, Steps, Table, Button, Responsive } from 'upkit';
import { useSelector, useDispatch } from 'react-redux';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import FaAddressCard from '@meronex/icons/fa/FaAddressCard';
import FaInfoCircle from '@meronex/icons/fa/FaInfoCircle';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';
import FaRegCheckCircle from '@meronex/icons/fa/FaRegCheckCircle';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import { config } from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';
import { sumPrice } from '../../utils/sum-price';
import { useAddressData } from '../../hooks/address';
import { clearItems } from '../../features/Cart/actions';
import { createOrder } from '../../api/order';

const IconWrapper = ({children}) => {
  return <div className="text-3xl flex justify-center">
   {children}
  </div>
}

const steps = [
  {
    label: 'Item', 
    icon: <IconWrapper><FaCartPlus/></IconWrapper> 
  },
  {
    label: 'Alamat', 
    icon: <IconWrapper><FaAddressCard/></IconWrapper> 
  }, 
  {
    label: 'Konfirmasi', 
    icon: <IconWrapper><FaInfoCircle/></IconWrapper> 
  }
];

const columns = [
  { 
    Header: 'Nama produk', 
    accessor: item => <div className="flex items-center">
      <img src={`${config.api_host}/images/products/${item.image_url}`} width={48} alt={item.name}/>
      {item.name}
    </div>
  },
  {
    Header: 'Jumlah', 
    accessor: 'qty'
  }, 
  {
    Header: 'Harga satuan', 
    id: 'price',
    accessor: item => <span> @ {formatRupiah(item.price)} </span>
  },
  { 
    Header: 'Harga total', 
    id: 'subtotal', 
    accessor: item => {
    return <div>
      { formatRupiah(item.price * item.qty)}
    </div>
    }
  }
];

const addressColumns = [
  {
    Header: 'Nama alamat',
    accessor: alamat => {
      return <div>
        {alamat.name} <br/>
        <small>
        {alamat.address}, {alamat.kota}, {alamat.provinsi}, {alamat.kodepos}
        </small>
      </div>
    } 
  }
];

export default function Checkout(){

   let [ activeStep, setActiveStep ] = React.useState(0);
   let cart = useSelector(state => state.cart);
   let [ selectedAddress, setSelectedAddress ] = React.useState(null);

   let {
     data, 
     status,
     limit, 
     page, 
     count, 
     setPage
   } = useAddressData(); 

    let navigate = useNavigate();
    let dispatch = useDispatch();

   async function handleCreateOrder(){
      let payload = {
         delivery_fee: config.global_ongkir, 
         delivery_address: selectedAddress._id,
      }

      let { data } = await createOrder(payload); 

      if(data?.error) return; 

      navigate(`/invoice/${data._id}`);
      dispatch(clearItems());

   }

   if(!cart.length) {
      return <Navigate to="/" />
   }

   return (
   <div>
     <TopBar/>
   <LayoutOne>
      <Text as="h3"> Checkout </Text> 

      <Steps
         steps={steps}
         active={activeStep} 
      />

      {activeStep === 0 ?
        <div>
          <br/> <br/>
          <Table 
            items={cart}
            columns={columns}
            color= "blue"
            perPage={cart.length}
            showPagination={false}
          />

          <br/>
          <div className="text-right">
           <Text as="h4">
             Subtotal: {formatRupiah(sumPrice(cart))}
           </Text> 

           <br/>
           <Button 
             onClick={_ => setActiveStep(activeStep + 1)}
             color= "blue"
             iconAfter={<FaArrowRight/>}
           > Selanjutnya </Button>
          </div>

        </div>
      : null }

      {activeStep === 1 ?
        <div>
         <br/><br/>
         <Table
          items={data}
          color= "blue"
          columns={addressColumns}ssssssss
          perPage={limit}
          page={page}
          onPageChange={page => setPage(page)}
          totalItems={count}
          isLoading={status === 'process'}
          selectable
          primaryKey={'_id'}
          selectedRow={selectedAddress}
          onSelectRow={ item => setSelectedAddress(item)}
         />

        {!data.length && status === 'success' ? 
          <div className="text-center my-10">
            <Link to="/alamat-pengiriman/tambah">
              Kamu belum memiliki alamat pengiriman <br/> <br />
              <Button
              color='blue'> Tambah alamat </Button>
            </Link>
          </div>
        : null}

        <br/> <br/>
        <Responsive desktop={2} tablet={2} mobile={2}>

          <div>
            <Button 
              onClick={_ =>  setActiveStep(activeStep - 1)} 
              color="gray" 
              iconBefore={<FaArrowLeft/>}>

              Sebelumnya
            </Button>
          </div>

          <div className="text-right">
           <Button 
             onClick={_ => setActiveStep(activeStep + 1)} 
             disabled={!selectedAddress}
             color= "blue"
             iconAfter={<FaArrowRight/>}>
              Selanjutnya
           </Button>
          </div>

        </Responsive>

        </div>
      : null }

      { activeStep === 2 ?
        <div>
         <Table
           columns={[
             {
               Header: '', 
               accessor: 'label',
             },
             {
               Header: '',
               accessor: 'value'
             }
           ]}
           color= "blue"
           items={[
             {label: 'Alamat', value: <div>
              {selectedAddress.name} <br/> 
              {selectedAddress.address}, {selectedAddress.kota}, {selectedAddress.provinsi}, {selectedAddress.kodepos}

             </div>},
             {label: 'Subtotal', value: formatRupiah(sumPrice(cart))}, 
             {label: 'Ongkir', value: formatRupiah(config.global_ongkir)}, 
             {label: 'Total', value: <b>{formatRupiah(sumPrice(cart) + parseInt(config.global_ongkir))}</b>}, 
           ]}
           showPagination={false}
         />
        <br />
        <Responsive desktop={2} tablet={2} mobile={2}>
         <div>
           <Button 
             onClick={_ =>  setActiveStep(activeStep - 1)} 
             color="gray" 
             iconBefore={<FaArrowLeft/>}>
             Sebelumnya
           </Button>
         </div>
         <div className="text-right">
           <Button 
             onClick={handleCreateOrder}
             color= "blue"
             size="large"
             iconBefore={<FaRegCheckCircle/>}
           >
              Bayar
           </Button>
         </div>
        </Responsive>
        </div>
      : null}  

   </LayoutOne>
   </div>
   )
}