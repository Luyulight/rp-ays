import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import './assets/font/myFont.css'
import './common/DateExtension.js'
import ReportList from './views/ReportList';
import CreateForm from './views/CreateForm';


function App() {
  console.log(logo)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>ReactReport</div>
        <div className="right-container">rightBar</div>
      </header>
      <main className="Main show-report-form">
        <ReportList />
        <CreateForm />
      </main>
    </div>
  );
}

export default App;
