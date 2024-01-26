import React from "react";
import "../index.css";

const footerStyle = {
  backgroundColor: "#333", 
  color: "#fff", 
  padding: "10px", 
  textAlign: "center",
  marginTop: "auto" 
};

const contentStyle = {
  maxWidth: "1200px", 
  margin: "0 auto", 
};
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};
function Footer() {
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
      </div>
      <footer style={footerStyle}>
        <div style={contentStyle}>
          <p>&copy; 2024 WeChef. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
