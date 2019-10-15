import React, { Component } from "react";
import { toast } from "react-toastify";
import objetos from "../api/objetos";

import './Objeto.css';

class Objeto extends Component{
    
    state = {
        objetos : this.handleObjetos()
    }

    handleObjetos(){
        let objetoAntes = this.props.objetos;
        let objetoReturn = []
        objetoAntes.forEach(element => {
            if(element._idCategoria=== this.props.idCategoria){
                element.show = true;
                objetoReturn.push(element);
            }
        });
        return objetoReturn;
    }

    handleNumber(x,i){
        var newObjeto = this.state.objetos[i];
        newObjeto.cantidad = x.target.value;
        this.setState(this.state.objetos[i] = newObjeto);
        
    }
    handleSubmit(objetoNuevo){
        objetoNuevo.show = false;
        var obj = objetoNuevo;
        var x = this.props._idReporte;
        obj._idReporte = x;
        obj._idCategoria = 0;
        delete obj["_id"];
        delete obj["show"];
        objetos.insert(obj);
        toast.success('Agregaste un uso de '+ objetoNuevo.cantidad + " " + objetoNuevo.unidad + " de " + objetoNuevo.nombre);
    }
    render(){
        {this.handleObjetos()}
        return (
           <div className="row">
               {this.state.objetos.map((obj,i)=>{
                   return(
                        <div key={i} className={this.state.objetos[i].show ? 'card': 'esconder'} style={{ width: "21rem", marginTop:"1rem", marginLeft:"1rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{obj.nombre}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Peso: {obj.peso}</h6>
                                <p className="card-text">{obj.descripcion}</p>
                                <input id="quantity" type="number" name="quantity" className="form-controñ" min="1" value={this.state.objetos[i].cantidad} onChange={(e) => {this.handleNumber(e,i)}}/>
                                <label htmlFor="quantity">{obj.unidad}</label>
                                <button className="but-solid" onClick={()=> {this.handleSubmit(this.state.objetos[i])}} style={{ marginTop: "3%"}}>Agregar</button>
                            </div>
                        </div>                 
                   );
               })}
           </div>
        );
    }
}



export default Objeto;

