import * as React from 'react'; 
import {LayoutOne, Button, Text, Table} from 'upkit';
import { Link } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import TopBar from '../../components/TopBar';
import StatusLabel from '../../components/StatusLabel';
import { formatRupiah } from '../../utils/format-rupiah';
import { sumPrice } from '../../utils/sum-price';
import { FaFileInvoiceDollar } from '@meronex/icons/fa/FaFileInvoiceDollar';
import { getOrders } from '../../api/order';

const columns = [
  { 
    Header: 'Order', 
    id: 'Status',
    accessor: order => {
      return <div>
        #{order.order_number} <br/>
        <StatusLabel status={order.status}/>
      </div>
    }
  },
  {
    Header: 'Items', 
    accessor: order => {
      return <div>
        {order.order_items.map(item => {
          return <div key={item._id}>
            {item.name} {item.qty}
          </div>
        })}
      </div>
    }
  }, 
  {
    Header: 'Total',
    accessor: order => {
      return <div>
        {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}
      </div>
    }
  },
  {
    Header: 'Invoice',
    accessor: order => {
      return <div>
        <a href={`/invoice/${order._id}`}> Lihat Invoice </a>
      </div>
    }
  }
];

export default function UserOrders(){

  let [pesanan, setPesanan] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [status, setStatus] = React.useState('idle');
  let [page, setPage] = React.useState(1);
  let [limit, ] = React.useState(10);

  const fetchPesanan = React.useCallback( async () => {
    setStatus('process');

    let { data } = await getOrders({limit, page});

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

    return (
      <div>
        <TopBar/>
      <LayoutOne>
        
        <Text as="h3"> Pesanan Anda </Text>
        <br />

        <Table
            color='blue'
          items={pesanan}
          totalItems={count}
          columns={columns}
          onPageChange={ page => setPage(page)}
          page={page}
          isLoading={status === 'process'}
        />

      </LayoutOne>
      
      </div>
    )
}

// function UserOrders() {
//    let [pesanan, setPesanan] = React.useState([]);
//    let [count, setCount] = React.useState(0);
//    let [status, setStatus] = React.useState('idle');
//    let [page, setPage] = React.useState(1);
//    let [limit, ] = React.useState(10);

//   let fetchPesanan = React.useCallback( async () => {
//     setStatus('process');

//     let { data } = await getOrders({limit, page});

//     if(data.error){
//       setStatus('error');
//       return;
//     }

//     setStatus('success');
//     let dataPesanan = Object.values(data.data);
//     setPesanan(dataPesanan);
//     setCount(data.count);

//   }, [page, limit]);

//   React.useEffect(() => {
//     fetchPesanan();
//   }, [fetchPesanan]);

//   console.log(pesanan);
  
//    return (
//      <LayoutOne>
//        <TopBar/>
//        <Text as="h3"> Pesanan Anda </Text>
//        <br />
//         <div>
//        <table>
//           <thead>
//             <tr>
//             <th>Order Number</th>
//             <th>Status</th>
//             <th>Total</th>
//             <th>Invoice</th>
//             </tr>
//           </thead>
//           <tbody>
//             { pesanan.map( (pesanan, index) => (
//               <tr key={index}>
//                 <td>{pesanan.order_number}</td>
//                 <td> <StatusLabel status={pesanan.status} /> </td>
//                 <td>{formatRupiah(sumPrice(pesanan.order_items) + pesanan.delivery_fee)}</td>
//                 <td> inv </td>
//               </tr>
//             ))}
//           </tbody>
                  
//        </table>
//        </div>

//      </LayoutOne>
//    )
// }

// export default UserOrders;