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
// To handle the header in the website
function Header() {
  return (
    <header className="flex items-center justify-between p-10 bg-green-700 text-green-100">
      <h1 className="text-6xl">Cookie Stand Admin</h1>
    </header>
  );
}
// Form take data as input from the user 
function Form({ onFormSubmit }) {
  return (
    <form className="w-3/4 p-4 mx-auto my-8 bg-green-500 text-green-70" onSubmit={onFormSubmit}>
      <h2 className="text-4xl text-center mb-6 text-green-200">Create Cookie Stand</h2>
      <div className="flex mb-4">
        <label className="text-lg font-semibold">Location</label>
        <input
          name="location"
          className="flex-auto px-2 py-1 bg-white border border-gray-300 rounded-l"
        />
      </div>
      <div className="flex mb-4 flex items-center justify-between">
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold">Minimum Customer per Hour</label>
          <input
            name="MinCperH"
            className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold">Maximum Customer per Hour</label>
          <input
            name="MaxCperH"
            className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold">Average Customer per Sale</label>
          <input
            name="AvgCperS"
            className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
          />
        </div>
        <button className="px-12 py-5 bg-green-700 text-green-100 hover:bg-green-800 hover:text-white transition-colors">
          Create
        </button>
      </div>
    </form>
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










