import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Evaluaciones from "../api/evaluaciones";
import Categoria from "../ui/Categoria";
import Objetos from "../api/objetos";
import { Route, Switch } from 'react-router-dom';

class Evaluacion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="host">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Categoria _idReporte={this.props.id} />
          </div>
          <div className="col-6">
            <button type="button" onClick={() => { 
              this.calcPuntos(this.props.id)
            }}>Calcular</button>
          </div>
        </div>
      </div>
    </div>
    );
  }

  calcPuntos(id) {
    let sum = 0;
    let categorias = [];
    categorias.push(0);
    categorias.push(0);
    categorias.push(0);
    categorias.push(0);
    let objetos = Objetos.find({ _idReporte: id }).fetch();
    console.log(objetos);


    objetos.forEach((obj) => {
      if (obj._idCategoria === '1') {
        categorias[0] += obj.peso * obj.cantidad;
      }
      else if (obj._idCategoria === '2') {
        categorias[1] += obj.peso * obj.cantidad;
      }
      else if (obj._idCategoria === '3') {
        categorias[2] += obj.peso * obj.cantidad;
      }
      else if (obj._idCategoria === '4') {
        categorias[3] += obj.peso * obj.cantidad;
      }
      sum += obj.peso * obj.cantidad;
      console.log(sum);
    });
  }

}

export default withTracker(() => {
  return {
    id: Evaluaciones.insert({ fecha: new Date(), planetas: -1, _idUsuario: null })
  };
})(Evaluacion);