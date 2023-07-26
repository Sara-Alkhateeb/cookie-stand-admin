import Head from 'next/head';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Form from '@/components/Form';
import Footer from '@/components/Footer';
import ReportTable from '@/components/Table';
import { hourlySalesData } from '@/data';
import { useAuth } from '@/contexts/auth';
import LoginForm from '@/components/LoginForm';




export default function Home() {
  const { login, logout, user } = useAuth();
  const [cookieStands, setCookieStands] = useState([]);
  // const user = null;
  // const userr = {username:'admin', password: '0000'};


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
            <Form onSubmit={FormHandler} />
            {/* <Placeholder lastCookieStand={lastCookieStand} /> */}
            <ReportTable reports={cookieStands} />
            <Footer numLocations={cookieStands.length} />
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










