import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css'



function InfoUser(){

    const USUARIO = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage
    //const ROLE = localStorage.getItem("rol"); //obtengo el (ID) del usuario autenticado  del local storage
    
    if(USUARIO){

        const [codigo, setCodigo] = useState('');
        const [DatosTabla, setDatosTabla] = useState([]); 
        const [DatosUser, setDatosUser] = useState([]);
        const [AuditLogin, setAuditLogin] = useState([]); 
        
        
        const handleLogout = () => {
            localStorage.clear();
            window.location = 'https://gana-loco-ander.vercel.app'
        };

        //---------------------------- Obtengo la información de la tabla y del usuario ------------------------- Terminao 
        useEffect(() => {

            const CargarTabla = async () => {
            try {
                const iduser = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage
                const response1 = await axios.post('https://gana-loco-anderb.vercel.app/apiv1/info_user_tabla', {iduser});
                setDatosTabla(response1.data);
            } catch (error) {
                console.error(error);
            }
            };
            
            const CargarInfoUser = async () => {
                try {
                    const user = localStorage.getItem("user"); //obtengo el (usuario) del usuario autenticado  del local storage
                    const response2 = await axios.post('https://gana-loco-anderb.vercel.app/apiv1/info_user', {user});
                    setDatosUser(response2.data);
                } catch (error) {
                console.error(error);
                }
            };

            const CargarAccessLogin = async () => {
                try {
                    const user = localStorage.getItem("user"); //obtengo el (usuario) del usuario autenticado  del local storage
                    const response3 = await axios.post('https://gana-loco-anderb.vercel.app/apiv1/info_audit_users', {user});
                    setAuditLogin(response3.data);
                } catch (error) {
                console.error(error);
                }
            };

            CargarTabla();
            CargarInfoUser();
            CargarAccessLogin();
        }, []);

        //---------------------------- Registor de codigos y recargo de tabla ------------------------- Terminado 
        const RegistraCodigo = async (e) => {
            e.preventDefault("datoss");

            const iduser = DatosUser.map((datauser) => (datauser._id)) //guardo el id del usuario en variable
            try {
                const response = await fetch('https://gana-loco-anderb.vercel.app/apiv1/update_codigo', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ codigo, iduser})
                });

                const result = await response.json();
                if(result){ 
                window.alert(result.status);  // información del estado del codigo registrado

                    try {
                        //Recargo la tabla
                        const iduser = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage
                        const response = await axios.post('https://gana-loco-anderb.vercel.app/apiv1/info_user_tabla', {iduser})
                        setDatosTabla(response.data);
                    } catch (error) {
                        console.error('Error consultando nuevamente los datos:', error);
                    }

                }else{
                    window.alert(error);
            }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        return (
            <>
            <header>
                <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top border">
                    <div class="container-fluid">

                        <a class="navbar-brand col-sm-1" href="#"> </a>
                        <img className='logouser' src="https://img.icons8.com/?size=100&id=bCZuh4u5quAj&format=png&color=000000" alt='star' />
                        {DatosUser.map((datauser) => ( <span className='m-2'> Bievenido: <h5 class="mb-0 text-center"> {datauser.user}  </h5> </span> )) } 
                        
                        <ul class="navbar-nav ms-auto d-flex flex-row">

                            <div className='pt-2 d-none d-md-flex input-group w-auto my-auto'>
                                {AuditLogin.map((auditlogin) => ( <span className='m-2'> <strong>Ultimo acceso: </strong> {auditlogin.fecha}</span> )) } 
                            </div>

                            <li class="nav-item">
                                <a class="nav-link me-3 me-lg-0" href="#">
                                    <i class="fas fa-fill-drip"></i>
                                </a>
                            </li>
                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                            <li class="nav-item ">
                                <button className='btn btn-primary' onClick={handleLogout}> 
                                    <img src="https://img.icons8.com/?size=100&id=rVJsmIuA2cov&format=png&color=000000" class="rounded-circle" height="22"
                                        alt="" loading="lazy" />  <span>Cerrar Sesión</span>
                                </button>
                            </li>

                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
            
                <main>
                    <div class="container pt-4">
                    <div className='card-body'>
                    <br />
                    </div>
                        <section class="mb-4">
                            <div class="card mt-6">

                            <div class="container-fluid px-1 py-2 mb-4 mx-auto">
                                <div class="row d-flex justify-content-center">
                                        
                                        <div class="form-card">
                                            <h5 class="text-center ">Registra nuevos códigos</h5>
                                            <form class="form-card" onSubmit={RegistraCodigo}>

                                                <div class="row justify-content-between text-left">
                                                    <dir class="col-sm-2"></dir>
                                                    <div class="form-group col-sm-8 flex-column d-flex"> 
                                                        <label class="form-control-label px-3" htmlFor='codigo'>Código<span class="text-danger"> *</span></label> 
                                                        <input type="number" id="codigo" name="codigo" placeholder="*****" onChange={(e) => setCodigo(e.target.value)} required autoFocus/> </div>
                                                    <dir class="col-sm-2"></dir>
                                                </div>

                                                <div class="row justify-content-between text-left mt-3">
                                                    <dir class="col-sm-2"></dir>
                                                    <div class="form-group col-sm-8"> <button type="submit" class="btn btn-primary">Registrar</button> </div>
                                                    <dir class="col-sm-2"></dir>
                                                </div>
                                            </form>
                                        </div>
                                </div>
                            </div>


                                <div class="card-header text-center py-3">
                                    <h5 class="mb-0 text-center">
                                        <strong>Mis códigos registrados</strong>
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover text-nowrap ">

                                            <thead>
                                                <tr>
                                                    <th scope="col"> <img  src="https://img.icons8.com/?size=100&id=kWNiv-7wtIol&format=png&color=000000"  height="30"/> FECHA REGISTRO</th>
                                                    <th scope="col"> <img  src="https://img.icons8.com/?size=100&id=WoUqPpzZjN8d&format=png&color=000000"  height="30"/> CÓDIGO </th>
                                                    <th scope="col"> <img  src="https://img.icons8.com/?size=100&id=Nh0FdkapxUe6&format=png&color=000000"  height="30"/> PREMIO </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                DatosTabla.map((datospremio) => (
                                                <tr key={datospremio._id}>
                                                    <td>  {datospremio.fecha}</td>
                                                    <td>  {datospremio.codigo}</td>
                                                    <td>  {datospremio.premio}</td>
                                                </tr>
                                                )) 
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
                
            </>
        )

    }else{
        //Se redirecciona al login si no existe una varia de usuario valida 
        window.location= 'https://gana-loco-ander.vercel.app'
    }
}

export default InfoUser