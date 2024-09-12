import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null); // State to hold received data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const sendRequest = () => {
    if (!username) return; // Prevent sending request if input is empty
    setLoading(true);
    setError(null);
    console.log("Sending request with username:", username);

    axios
      .post("http://localhost:5000/", { username })
      .then((response) => {
        console.log("Response:", response.data);
        setUserData(response.data); // Store the received data
        setUsername(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error fetching user data as username is either wrong or 404");
        setUsername("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white text-center py-6">
        <h1 className="font-bold text-5xl">CodeChef Scraper</h1>
      </header>

      {/* Content Area */}
      <div className="flex-grow container mx-auto px-4 flex flex-col items-center">
        <div className="font-bold text-2xl w-full max-w-2xl px-4 py-4 text-white flex justify-center">
          <h1>Enter The Username Of User:</h1>
        </div>

        <div className="w-full md:w-1/2 px-4 mt-4">
          <input
            className="border-2 border-white p-4 text-xl rounded-lg focus:outline-none w-full text-center"
            type="text"
            placeholder="Enter CodeChef Username"
            value={username} // Bind input value to state
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 px-4 mt-4">
          <button
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700"
            onClick={sendRequest}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {/* Error handling */}
        {error && <div className="text-red-500 mt-4">{error}</div>}

        {/* Display received data */}
        {userData && (
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mt-8 p-4 rounded-lg text-white text-left flex flex-col md:flex-row">
            {userData.profileImgUrl && (
              <div
                className="md:ml-4 p-4 flex items-center justify-center"
                style={{ flexBasis: "35%" }}
              >
                <img
                  src={userData.profileImgUrl}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
            )}
            {/* Left side: User Data */}
            <div
              className="flex-grow p-4 mb-4 md:mb-0 rounded-lg"
              style={{ flexBasis: "65%" }}
            >
              <h2 className="font-bold text-2xl mb-4">CodeChef User</h2>
              <p>
                <strong>User ID:</strong> {userData.userId || "N/A"}
              </p>
              <p>
                <strong>User Rating:</strong> {userData.userRating || "N/A"}
              </p>
              <p>
                <strong>User Stars:</strong> {userData.userStar || "N/A"}
              </p>
              <p>
                <strong>Total Contest Given:</strong>{" "}
                {userData.contestCount || 0}
              </p>
              <p>
                <strong>Country:</strong>{" "}
                {userData.additionalInfo.find(
                  (info) => info.labelText === "Country:"
                )?.spanText || "N/A"}
              </p>
              <p>
                <strong>Student/Professional:</strong>{" "}
                {userData.additionalInfo.find(
                  (info) => info.labelText === "Student/Professional:"
                )?.spanText || "N/A"}
              </p>
              <p>
                <strong>Institution:</strong>{" "}
                {userData.additionalInfo.find(
                  (info) => info.labelText === "Institution:"
                )?.spanText || "N/A"}
              </p>
            </div>

            {/* Right side: Profile Image */}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4">
        &copy; 2024 CodeChef Scraper. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
