import React, { Component } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import Evaluaciones from "../../api/evaluaciones";
import objetos from '../../api/objetos';

class ListarEvaluaciones extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        evaluaciones: this.props.evaluaciones
    }

    render() {
        return (
            <div>
                {this.state.evaluaciones.map((e, i) => {
                    return (
                        <div key={i} className="card">
                            <h5 className="card-header">{}</h5>
                            <div className="card-body">
                                <h6 className="card-title">Planetas Consumidos: {e.planetas}</h6>
                            </div>
                        </div>
                    );
                })
                }

            </div>
        );
    }
}

export default withTracker(() => {
    return {
        evaluaciones: Evaluaciones.find().fetch()
    };
})(ListarEvaluaciones);