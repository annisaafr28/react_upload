import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';


class Barang extends Component {
    constructor(){
        super();
        this.state = {
            barang: [], //array barang untuk menampung data barang
            kode_barang: "",
            nama_barang: "",
            harga: "",
            stok: "",
            deskripsi: "",
            image: "",
            action: "",
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Add = () => {
        //mengosongkan isi variabel nip, nama dan alamat
        //set action mnjd insert
        this.setState({
            kode_barang: "",
            nama_barang: "",
            harga: "",
            stok: "",
            deskripsi: "",
            image: "",
            action: "insert",
        });

        document.getElementById('file').value = "";
    }

    Edit = (item) => {
        /*
    - mengisikan isi variabel sesuai dengan data yang
    akan diedit
    - set action menjadi "update" */
        this.setState({
            action: "update",
            kode_barang: item.kode_barang,
            nama_barang: item.nama_barang,
            harga: item.harga,
            stok: item.stok,
            deskripsi: item.deskripsi,
        });

        document.getElementById('file').value = "";
    }

    getBarang = () => {
        let url = "http://localhost:8000/barang";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({barang: response.data.data});
        })
        .catch(error => {
            console.log(error);
        });
    }


    SaveBarang = (event) => {
        event.preventDefault();
        /* menampung data barang dari Form ke dalam FormData() untuk dikirim  */
        let url = "";
        if (this.state.action === "insert") {
            url = "http://localhost:8000/barang/save"
        } else {
            url = "http://localhost:8000/barang/update"
        }

        let form = new FormData();
        form.append("action", this.state.action);
        form.append("kode_barang", this.state.kode_barang);
        form.append("nama_barang", this.state.nama_barang);
        form.append("harga", this.state.harga);
        form.append("stok", this.state.stok);
        form.append("deskripsi", this.state.deskripsi);
        form.append("image", document.getElementById('file').files[0]);

        //mengirim data ke api utk disimpan pd database
        axios.post(url, form)
        .then(response => {
            //jika proses berhasil, memanggil data yg terbaru
            this.getBarang();
        })
        .catch(error => {
            console.log(error);
        });
        //menutup form modal
        $("#modal").modal('hide');
    }

    Drop = (kode_barang) => {
        let url = "http://localhost:8000/barang/" + kode_barang;
        //memanggil url api utk menghapus data pd database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
            .then(response => {
                //jika proses hapus data berhasil, memanggil data yg terbaru
                this.getBarang();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount(){
        //method yg pertama kali dipanggil saat load page
        this.getBarang();
    }

    render(){
        return (
            <div className="m-3 card">
                <div className="card-header bg-info text-white">Data Barang</div>
                <div className="card-body">

                    {/* tampilan tabel barang */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Kode Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Harga</th>
                                    <th>Stok</th>
                                    <th>Deskripsi</th>
                                    <th>Image</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.barang.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.kode_barang}</td>
                                            <td>{item.nama_barang}</td>
                                            <td>{item.harga}</td>
                                            <td>{item.stok}</td>
                                            <td>{item.deskripsi}</td>
                                            <td>
                                            <img src={ "http://localhost:8000/image/" + item.image } 
                                                className="img" alt="gambar" align="left" width="150"/>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                data-target="#modal" onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.kode_barang)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button className="btn btn-success" onClick={this.Add} data-toggle="modal" data-target="#modal">
                            Tambah Data
                        </button>
                        {/* modal form barang */}
                        <div className="modal fade" id="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        Form Barang
                                    </div>
                                    <form onSubmit={this.SaveBarang}>
                                        <div className="modal-body">
                                            Kode Barang
                                            <input type="number" name="kode_barang" value={this.state.kode_barang} onChange={this.bind}
                                            className="form-control"  />
                                            Nama Barang
                                            <input type="text" name="nama_barang" value={this.state.nama_barang} onChange={this.bind}
                                            className="form-control" required />
                                            Harga
                                            <input type="text" name="harga" value={this.state.harga} onChange={this.bind}
                                            className="form-control" required />
                                            Stok
                                            <input type="number" name="stok" value={this.state.stok} onChange={this.bind}
                                            className="form-control" required />
                                            Deskripsi
                                            <input type="text" name="deskripsi" value={this.state.deskripsi} onChange={this.bind}
                                            className="form-control" required />
                                            Image
                                            <input type="file" id="file" name="image" value={this.state.image} onChange={this.bind}
                                            className="form-control" required />
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-sm btn-success" type="submit">
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Barang;