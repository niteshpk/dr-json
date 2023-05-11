import React, { useState, useRef, useEffect } from "react";
import Swal from "react-bootstrap-sweetalert";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [json, setJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const jsonRef = useRef(null);
  const formattedJsonRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const appElement = document.documentElement;
    if (isDarkMode) {
      appElement.classList.add("dark-mode");
    } else {
      appElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showAlertMessage = (title, text, type) => {
    setAlertConfig({ title, text, type });
    setShowAlert(true);
  };

  const handleJsonChange = (event) => {
    setJson(event.target.value);
  };

  const formatJson = () => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(json), null, 2);
      setFormattedJson(formattedJson);
      showAlertMessage("Success", "JSON formatting successful!", "success");
    } catch (error) {
      showAlertMessage("Error", "Invalid JSON", "warning");
    }
  };

  const minifyJson = () => {
    try {
      const minifiedJson = JSON.stringify(JSON.parse(json));
      setFormattedJson(minifiedJson);
      showAlertMessage("Success", "JSON minifying successful!", "success");
    } catch (error) {
      showAlertMessage("Error", "Invalid JSON", "warning");
    }
  };

  const copyToClipboard = (ref) => {
    ref.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    showAlertMessage(
      "Success",
      "JSON Coping to clipboard successful!",
      "success"
    );
  };

  return (
    <div className={`${isDarkMode ? "dark-mode" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className={`container mt-5`}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h1 className="text-center mb-4">Input JSON</h1>
            <textarea
              className="form-control"
              rows={10}
              placeholder="Paste your JSON here"
              value={json}
              onChange={handleJsonChange}
              ref={jsonRef}
            />
            <div className="row justify-content-center my-5">
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="btn btn-primary  me-2"
                  onClick={formatJson}
                  disabled={!Boolean(json?.length)}
                >
                  Format / Beautify
                </button>
                <button
                  className="btn btn-secondary me-2"
                  onClick={minifyJson}
                  disabled={!Boolean(json?.length)}
                >
                  Minify / Compress
                </button>
                <button
                  className="btn btn-info me-2"
                  onClick={() => copyToClipboard(jsonRef)}
                  disabled={!Boolean(json?.length)}
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <h1 className="text-center mb-4">Output JSON</h1>
            <textarea
              className="form-control"
              rows={10}
              placeholder="Formatted JSON will appear here"
              value={formattedJson}
              readOnly
              ref={formattedJsonRef}
            />
            <div className="row justify-content-center my-5">
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="btn btn-info me-2"
                  onClick={() => copyToClipboard(formattedJsonRef)}
                  disabled={!Boolean(formattedJson?.length)}
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <Swal
          {...alertConfig.type}
          title={alertConfig.title}
          onConfirm={() => setShowAlert(false)}
          timeout={800}
          btnSize="sm"
        >
          {alertConfig.text}
        </Swal>
      )}
      <Footer />
    </div>
  );
}

export default App;
