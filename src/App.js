import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import download from "downloadjs";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [displayInput, setDisplayInput] = useState("");

  /* useRef holds the data to qr --> png
   */
  const qrRef = useRef();

  const handleClick = () => {
    setDisplayInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDownload = () => {
    toPng(qrRef.current)
      .then((dataURL) => {
        download(dataURL, "qrcode.png");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <div className="Card">
        <form action="" onSubmit={handleSubmit}>
          <h1>QR Code Generator</h1>

          <input
            placeholder="example.com"
            className="URL"
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="button-click" type="button" onClick={handleClick}>
            Click
          </button>
          {/* npm react-qr-code package*/}
          <div ref={qrRef}>
            <QRCode
              className="QR"
              size={400}
              value={displayInput}
              style={{ height: "auto", maxWidth: "50%", width: "50%" }}
              viewBox={`0 0 256 256`}
            />
          </div>
        </form>
        <button className="button-download" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
