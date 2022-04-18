import * as React from 'react'; 
import { useParams } from 'react-router-dom';
import {LayoutOne, Text, Table} from 'upkit';

import TopBar from '../../components/TopBar';
import StatusLabel from '../../components/StatusLabel';
import {config} from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';
import {getInvoiceByOrderId} from '../../api/invoice';

export default function Invoice(){
    let { order_id } = useParams();
    console.log(order_id);
    let [invoice, setInvoice] = React.useState(null);
    let [error, setError] = React.useState('');
    let [status, setStatus] = React.useState('process');

    React.useState(() => {

      getInvoiceByOrderId(order_id)
        .then(({data}) => {
          console.log(data);
          if(data?.error){
            setError(data.message || 'Terjadi kesalahan yang tidak diketahui');
          }

          setInvoice(data);
        })
        .finally(() => setStatus('idle'));

    }, []);

    if(error.length){
      return (
        <LayoutOne>
          <TopBar/>
          <Text as="h3">Terjadi Kesalahan</Text>
          {error}
        </LayoutOne>
      )
    }

    return (
      <LayoutOne>
        <TopBar/>
        <Text as="h3"> Invoice </Text>
        <br/>

        <Table
          showPagination={false}
          items={[
            { label: 'Status', value: <StatusLabel status={invoice?.payment_status}/>}, 
            { label: 'Order ID', value: '#' + invoice?.order_number}, 
            { label: 'Total amount', value: formatRupiah(invoice?.total)}, 
            { label: 'Billed to', value: <div>
              <b>{invoice?.user?.full_name} </b> <br/>
                {invoice?.user?.email} <br/> <br/>
                {invoice?.delivery_address?.address} <br/>
                {invoice?.delivery_address?.kota} <br/>
                {invoice?.delivery_address?.provinsi} <br/>
                {invoice?.delivery_address?.kodepos}
            </div>}, 
            { label: 'Payment to', value: <div>
              {config.owner} <br/>
              {config.contact} <br/> 
              {config.billing.account_no} <br/> 
              {config.billing.bank_name}
            </div>}
          ]}
          columns={[
            { Header: 'Invoice', accessor: 'label'},
            { Header: '', accessor: 'value'},
          ]}
        />
      </LayoutOne>
    )
}