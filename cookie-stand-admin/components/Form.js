
export default function Form(props) {

    // Define the function to handle form submission
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Get the form data from the event target (the form element)
      const formData = new FormData(event.target);
  
      // Convert the form data to a JSON object
      const formDataJSON = {};
      formData.forEach((value, key) => {
        formDataJSON[key] = value;
      });
  
      // Make the POST request to the backend
      axios.post('/create/', formDataJSON)
        .then(response => {
          // Handle the response from the backend if needed
          console.log('Successfully created:', response.data);
        })
        .catch(error => {
          // Handle errors if the request fails
          console.error('Error creating:', error);
        });
    };

    return (
      <form className="w-3/4 p-4 mx-auto my-8 bg-green-500 text-green-70" onSubmit={props.onSubmit}>
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
          <button className="px-12 py-5 bg-green-700 text-green-100 hover:bg-green-800 hover:text-white transition-colors" onSubmit={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    );
  }