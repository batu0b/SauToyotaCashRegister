import "./App.css";

function App() {
  const fetchDataTest = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/post`, {
        body: JSON.stringify({ data: "test" }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card">
        <button onClick={fetchDataTest}>Fetch Test</button>
      </div>
    </>
  );
}

export default App;
