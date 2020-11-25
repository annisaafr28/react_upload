import React from 'react';
import {Link} from 'react-router-dom';
import Pegawai from './Components/Barang';

class App extends React.Component {
  render(){
    return (
      <div> <hr />
      <Link to="/barang" className="nav-link">Daftar Barang</Link>
      <Pegawai />
    </div>
    );
  }
}

export default App;