import * as React from 'react'; 
import {LayoutOne, Table, Button, Text} from 'upkit';
import { Link } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import StatusLabel from '../../components/StatusLabel';
// import { formatRupiah } from '../../utils/format-rupiah';
// import { sumPrice } from '../../utils/sum-price';
import { FaFileInvoiceDollar } from '@meronex/icons/fa/FaFileInvoiceDollar';
import { getOrders } from '../../api/order';


export default function UserOrders(){
   let [pesanan, setPesanan] = React.useState([]);
   let [count, setCount] = React.useState(0);
   let [status, setStatus] = React.useState('idle');
   let [page, setPage] = React.useState(1);
   let [limit, ] = React.useState(10);

  let fetchPesanan = React.useCallback( async () => {
    setStatus('process');

    let { data } = await getOrders(page, limit);

    if(data.error){
      setStatus('error');
      return;
    }

    setStatus('success');
    setPesanan(data.data);
    setCount(data.count);

  }, [page, limit]);

  React.useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  console.log(pesanan);
  

   return (
     <LayoutOne>
       <TopBar/>
       <Text as="h3"> Pesanan Anda </Text>
       <br />
       <div>
       <table className="table">
       <thead>
          <tr>
            <th>Order Number</th>
            <th>Status</th>
            <th>invoice</th>
          </tr>
        </thead>
        <tbody>
          {/* {pesanan.map(order => {
            return <tr key={order._id}>
              <td>{order.order_number}</td>
              <td>
                <StatusLabel status={order.status}/>
              </td>
              <td>
                <Link to={`/invoice/${order._id}`}>
                  <Button color="gray" iconBefore={<FaFileInvoiceDollar/>}>
                    Invoice
                  </Button>
                </Link>
              </td>
            </tr>
          })} */}
        </tbody>
      </table>
      </div>

     </LayoutOne>
   )
}