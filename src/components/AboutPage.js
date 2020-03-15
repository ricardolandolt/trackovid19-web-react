import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { CustomInput } from "reactstrap";

export const renderRadio = ({ id, valueToSet, label, input }) => {
  const _onChange = e => {
    input.onChange(e);
  };
  console.log(id, label, valueToSet);
  return (
    <CustomInput
      type="radio"
      id={id}
      label={label}
      value={valueToSet}
      checked={valueToSet === input.value}
      onChange={_onChange}
    />
  );
};

export class AboutPage extends Component {
  showResults(obj, dispatch, props) {}

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    const options = [
      { label: "Infetado", description: "Sou um doente confirmado", value: "infected" },
      { label: "Em quarentena", description: "Sou um doente confirmado", value: "quarentine" },
      { label: "Em quarentena voluntária", description: "Sou um doente confirmado", value: "quarentine_vol" },
      { label: "Em situação regular", description: "Sou um doente confirmado", value: "regular" },
      { label: "Recuperado", description: "Sou um doente confirmado", value: "recovey" }
    ];

    return (
      <div>
        <h1>About</h1>
        <form onSubmit={handleSubmit(this.showResults)}>
          
          {options.map((o, i) => (
            <div key={"opt-cont-" + o.value + "-" + i} className={"p-3"}>
              <Field
                id={"opt-" + o.value}
                key={"opt-" + o.value + "-" + i}
                name={"st_status"}
                component={renderRadio}
                label={o.label}
                valueToSet={o.value}
                value={o.value}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">Confirmar o meu estado</button>
        </form>
      </div>
    );
  }
}

AboutPage.propTypes = {};

const FORM_NAME = "formPatient";

AboutPage = reduxForm({
  form: FORM_NAME,
  //destroyOnUnmount: false
  //forceUnregisterOnUnmount: true
})(AboutPage);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
