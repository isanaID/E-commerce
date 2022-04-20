import * as React from 'react';
import { LayoutOne, Text, Table, Button } from 'upkit';
import { Link } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import { useAddressData } from '../../hooks/address';

const columns = [
    {Header: 'Nama', accessor: 'name'},   
    {Header: 'Detail', accessor: alamat => {
      return <div>
        {alamat.address}, {alamat.kota}, {alamat.provinsi}, {alamat.kodepos}
      </div>
    }}
  ]

export default function UserAddress() {

    let { 
        data, 
        limit, 
        page, 
        status, 
        count, 
        setPage
      } = useAddressData();
    return (
        <div>
            <TopBar />
        <LayoutOne size="large">
            <div>
                <Text as="h3"> Alamat pengiriman </Text>
                <br />

                <div>
             <Link to="/alamat-pengiriman/tambah">
               <Button
               color='blue'
               >
                 Tambah baru
               </Button>
             </Link>
             <br />
             <br />
             <Table 
               items={data}
               columns={columns}
               color="blue"
               totalItems={count}
               page={page}
               perPage={limit}
               isLoading={status === 'process'}
               onPageChange={page => setPage(page)}
             />
           </div>

         {status === 'success' && !data.length ? <div className="text-center p-10">
           Kamu belum menambahkan alamat pengiriman. <br/>
           <Link to="/alamat-pengiriman/tambah">
             <Button color='blue'> Tambah Baru </Button>
           </Link>
         </div> : null}

            </div>
        </LayoutOne>
        </div>
    )
};
