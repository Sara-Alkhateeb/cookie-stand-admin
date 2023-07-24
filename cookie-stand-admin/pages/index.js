import Head from 'next/head';
import { useState } from 'react';



export default function Home() {

  const [lastCookieStand, setLastCookieStand] = useState(null);


  const FormHandler = (event) => {
    event.preventDefault(); 

    // Get the form data
    const formData = new FormData(event.target);
    const location = formData.get('location');
    const MinCperH = formData.get('MinCperH');
    const MaxCperH = formData.get('MaxCperH');
    const AvgCperS = formData.get('AvgCperS');

    // Create the Cookie Stand object
    const cookieStand = {
      location,
      MinCperH,
      MaxCperH,
      AvgCperS,
    };

    // Update the lastCookieStand state variable
    setLastCookieStand(cookieStand);
  };

  return (
    <>
      <Head>
        <title>cookie-stand-admin</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Form onFormSubmit={FormHandler} />
          {lastCookieStand && <Placeholder data={lastCookieStand} />}
        </main>

        <footer className="p-4 mt-8 bg-green-700 text-green-100">
          <h1 className="text-2xl">&copy; 2023</h1>
        </footer>
      </div>
    </>
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










