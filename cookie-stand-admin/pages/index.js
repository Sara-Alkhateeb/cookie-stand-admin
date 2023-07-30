import Head from 'next/head';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Form from '@/components/Form';
import Footer from '@/components/Footer';
import ReportTable from '@/components/Table';
import { hourlySalesData } from '@/data';
import { useAuth } from '@/contexts/auth';
import LoginForm from '@/components/LoginForm';
import useResource from '../hooks/useResource';



export default function Home() {
  const { login, logout, user } = useAuth();
  const [cookieStands, setCookieStands] = useState([]);
  // const user = null;
  // const userr = {username:'admin', password: '0000'};
  const {resource, loading, createResource, deleteResource} = useResource();


  const FormHandler = (event) => {
    event.preventDefault();
    // Get the form data
    const formData = new FormData(event.target);
    const id = cookieStands.length + 1;
    const location = formData.get('location');
    // const MinCperH = formData.get('MinCperH');
    // const MaxCperH = formData.get('MaxCperH');
    // const AvgCperS = formData.get('AvgCperS');
    const hourly_sales = hourlySalesData;

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
  const handleSubmitLoginForm = (formData) => {
    // Perform any actions with the form data here, like logging in or fetching user data
    console.log('Submitted login form data:', formData);

    // Call your login function here passing the formData.username and formData.password
    login(formData.username, formData.password);
  };

  return (
    <div >
      <Head >
        <title>Cookie Stand Admin</title>
      </Head>

      <main className="container mx-auto p-4">
        {console.log(user)}
        {user ? (
          <>
            <Header user={user} onLogout={() => logout()} />
            {/* <Header />
                    <button className="p-2 text-white bg-gray-500 rounded" onClick={()=>logout()}>Logout</button>
                    <h2>Welcome {user.username} </h2> */}
            <CreateForm onCreate={createResource}/>
            {/* <Form onSubmit={FormHandler} /> */}
            {/* <Placeholder lastCookieStand={lastCookieStand} /> */}
            {/* <ReportTable reports={cookieStands} /> */}
            <StandList data={resource} loading={loading} onDelete={deleteResource}/>
            {resource &&<Footer numLocations={resource.length} />}
          </>
        ) : (
          <>
            <LoginForm onSubmit={handleSubmitLoginForm} />
            {/* {console.log(userr.username,userr.password)} */}
            {/* <button className="p-2 text-white bg-gray-500 rounded" onClick={()=>login(userr.username,userr.password)}>Login</button> */}
          </>
        )}

      </main>

    </div>
  );
}


// To convert data from the input into JSON to present it as JSON in browser
// function Placeholder({ data }) {
//   const jsonString = JSON.stringify(data, null, 5);
//   return (
//     <div className="w-3/4 p-4 mx-auto my-8 bg-green-700 text-green-100">
//       <h2 className="text-4xl text-center mb-6">Last Created Cookie Stand</h2>
//       <pre>{jsonString}</pre>
//     </div>
//   );
// }



function StandList({ data = [], loading, onDelete }) {
    if (loading) return <p>Loading ...</p>;
  
    return (
      <div className="w-full">
        {data.length === 0 ? (
          <p>No cookie stands available.</p>
        ) : (
          <table className="w-full border-collapse border border-green-500 mt-4">
            <thead>
              <tr>
                <th className="bg-green-500 text-white text-center px-4 py-2 border border-green-500 font-bold">
                  Location
                </th>
                <th className="bg-green-500 text-white text-center border border-green-500 font-bold">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center border border-green-500 px-4 py-2">
                    {item.location}
                  </td>
                  <td className="text-center border border-green-500 px-4 py-2">
                    <button className="text-red-600" onClick={() => onDelete(item.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-6 h-6 inline-block mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  

function CreateForm({onCreate}){

  function handleSubmit(event) {
    event.preventDefault();
    const standInfo = {
      location: event.target.location.value,
      minimum_customers_per_hour: event.target.MinCperH.value, // Correct name attribute
      maximum_customers_per_hour: event.target.MaxCperH.value, // Correct name attribute
      average_cookies_per_sale: event.target.AvgCperS.value, // Correct name attribute
    };
    onCreate(standInfo);
    event.target.reset();
  }
    return (
      <form className="w-3/4 p-4 mx-auto my-8 bg-green-500 text-green-70" onSubmit={handleSubmit}>
        <h2 className="text-4xl text-center mb-6 text-green-200">Create Cookie Stand</h2>
        <div className="flex mb-4">
          <label className="text-lg font-semibold">Location</label>
          <input
            name="location"
            className="flex-auto px-2 py-1 bg-white border border-gray-300 rounded-l"
            placeholder="Location"
          />
        </div>
        <div className="flex mb-4 flex items-center justify-between">
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Minimum Customer per Hour</label>
            <input
              name="MinCperH"
              className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
              placeholder="min"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Maximum Customer per Hour</label>
            <input
              name="MaxCperH"
              className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
              placeholder="max"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Average Customer per Sale</label>
            <input
              name="AvgCperS"
              className="w-full px-2 py-1 bg-white border border-gray-300 rounded"
              placeholder="avg"
            />
          </div>
          <button
            type="submit"
            className="px-12 py-5 bg-green-700 text-green-100 hover:bg-green-800 hover:text-white transition-colors"
          >
            Create
          </button>
        </div>
      </form>
    );
}










