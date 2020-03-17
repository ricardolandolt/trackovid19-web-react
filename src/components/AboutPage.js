import React, { Component } from "react";
import { connect } from "react-redux";
import { change, formValueSelector, reduxForm, Field } from "redux-form";
import { CustomInput } from "reactstrap";

export const renderRadio = ({ id, valueToSet, label, input }) => {
  const _onChange = e => {
    input.onChange(e);
  };

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
  constructor(props) {
    super(props);

    this.state = {
      depthStep: 0,
      currentStep: 0,
      steps: [
        {
          title: "Passo 1 - Estado de saúde",
          description: "Esteve em risco de contágio? Apresenta algums dos sintomas abaixo?"
        },
        {
          title: "Passo 2 - Infeção",
          description: "Esteve em risco de contágio? Apresenta algums dos sintomas abaixo?"
        },
        {
          title: "Passo 3 - Confinamento",
          description: "Esteve em risco de contágio? Apresenta algums dos sintomas abaixo?"
        }
      ]
    };

    this.nextStep = this.nextStep.bind(this);
    this.goToStep = this.goToStep.bind(this);
    this.findValue = this.findValue.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { st_status, doChange } = this.props;

    //verify if previous answer changed to clear next answers
    if (prevProps.st_status && prevProps.st_status.length > 0 && prevProps.st_status[0] !== st_status[0]) {
      doChange("st_status", [st_status[0]]);
    }
    if (prevProps.st_status && st_status.length > 1 && prevProps.st_status[1] !== st_status[1]) {
      doChange("st_status", [st_status[0], st_status[1]]);
    }
  }

  nextStep() {
    const { currentStep, depthStep } = this.state;
    const nextStep = currentStep + 1;

    this.setState({ currentStep: nextStep, depthStep: depthStep < nextStep ? nextStep : depthStep });
  }

  goToStep(step) {
    const { depthStep } = this.state;

    if (step <= depthStep) {
      this.setState({ currentStep: step });
    }
  }

  showResults(obj, dispatch, props) {
    const { currentStep, steps } = this.state;

    if (currentStep < steps.length - 1) {
      this.nextStep();
    } else {
      console.log(obj.st_status);
    }
  }

  findValue(value, arr) {
    return arr.reduce((a, item) => {
      if (a) return a;
      if (item.value === value) return item;
      if (item.options) return this.findValue(value, item.options);
    }, null);
  }

  render() {
    const { handleSubmit, pristine, submitting, quest, st_status } = this.props;
    const { steps, currentStep } = this.state;

    const findAnswers = currentStep > 0 ? this.findValue(st_status[currentStep - 1], quest.options) : quest;
    const answers = findAnswers ? findAnswers.options : undefined;
    const stepAnswered = st_status ? currentStep <= st_status.length - 1 : true;

    return (
      <div>
        <div className="steps-header">
          <ul className="quest-steps-nav list-unstyled d-flex justify-content-between mt-3 mb-3">
            {steps.map((s, i) => (
              <li
                key={"step-" + i}
                className={"p-3 text-white " + (currentStep === i ? "bg-primary" : "bg-secondary")}
                onClick={() => this.goToStep(i)}
              >
                {i + 1}
              </li>
            ))}
          </ul>
          <h4>{steps[currentStep].title}</h4>
          <p>{steps[currentStep].description}</p>
        </div>
        <form onSubmit={handleSubmit(this.showResults)}>
          {answers &&
            answers.map((o, i) => (
              <div key={"opt-cont-" + o.value + "-" + i} className={"card card-body p-3"}>
                <Field
                  id={"opt-" + o.value}
                  key={"opt-" + o.value + "-" + i}
                  name={"st_status[" + currentStep + "]"}
                  component={renderRadio}
                  label={
                    <>
                      <h5 className="font-weigth-bold">{o.label}</h5>
                      <span className="small text-muted">{o.description}</span>
                    </>
                  }
                  valueToSet={o.value}
                  value={o.value}
                />
              </div>
            ))}
          <button type="submit" className="btn btn-primary w-100" disabled={pristine || submitting || !stepAnswered}>
            Confirmar o meu estado
          </button>
        </form>
      </div>
    );
  }
}

AboutPage.propTypes = {};

const FORM_NAME = "formPatient";
const selector = formValueSelector(FORM_NAME);

AboutPage = reduxForm({
  form: FORM_NAME
  //destroyOnUnmount: false
  //forceUnregisterOnUnmount: true
})(AboutPage);

const mapStateToProps = state => {
  const st_status = selector(state, "st_status");

  return {
    st_status,
    quest: {
      options: [
        {
          label: "Infetado",
          description: "Sou um doente confirmado",
          value: "infected",
          options: [
            {
              label: "Infeção confirmada",
              description: "",
              value: "value0",
              options: [
                { label: "Infeção confirmada 1", description: "", value: "value01" },
                { label: "Infeção confirmada 2", description: "", value: "value02" },
                { label: "Infeção confirmada 3", description: "", value: "value03" }
              ]
            },
            { label: "Caso Suspeito", description: "", value: "value1" },
            { label: "Recuperado", description: "", value: "value2" }
          ]
        },
        {
          label: "Em quarentena",
          description: "Sou um doente confirmado",
          value: "quarentine",
          options: [
            { label: "Infeção confirmada 2", description: "", value: "value3" },
            { label: "Caso Suspeito 2", description: "", value: "value4" },
            { label: "Recuperado 2", description: "", value: "value5" }
          ]
        },
        { label: "Em quarentena voluntária", description: "Sou um doente confirmado", value: "quarentine_vol" },
        { label: "Em situação regular", description: "Sou um doente confirmado", value: "regular" },
        { label: "Recuperado", description: "Sou um doente confirmado", value: "recovey" }
      ]
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doChange: (y, z) => dispatch(change(FORM_NAME, y, z))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
