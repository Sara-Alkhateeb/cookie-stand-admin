import Head from 'next/head';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Form from '@/components/Form';
import Footer from '@/components/Footer';
import ReportTable from '@/components/Table';
import { hourlySalesData } from '@/data';


export default function Home() {

  const [cookieStands, setCookieStands] = useState([]);


  const FormHandler = (event) => {
    event.preventDefault(); 
    // Get the form data
    const formData = new FormData(event.target);
    const id= cookieStands.length + 1;
    const location = formData.get('location');
    // const MinCperH = formData.get('MinCperH');
    // const MaxCperH = formData.get('MaxCperH');
    // const AvgCperS = formData.get('AvgCperS');
    const hourly_sales= hourlySalesData;

    // Create the Cookie Stand object
    const cookieStand = {
      id,
      location,
      // MinCperH,
      // MaxCperH,
      // AvgCperS,
      hourly_sales,
    };

    // Update the lastCookieStand state variable
       setCookieStands([...cookieStands, cookieStand]);
  }

  const numLocations = cookieStands.length;

  return (
    <div >
      <Head >
        <title>Cookie Stand Admin</title>
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <Form onSubmit={FormHandler} />
        {/* <Placeholder lastCookieStand={lastCookieStand} /> */}
        <ReportTable reports={cookieStands} />
      </main>
      <Footer numLocations={cookieStands.length} />
    </div>
  );
}


// To convert data from the input into JSON to present it as JSON in browser
function Placeholder({ data }) {
  const jsonString = JSON.stringify(data, null, 5); 
  return (
    <div className="w-3/4 p-4 mx-auto my-8 bg-green-700 text-green-100">
      <h2 className="text-4xl text-center mb-6">Last Created Cookie Stand</h2>
      <pre>{jsonString}</pre>
    </div>
  );
}










