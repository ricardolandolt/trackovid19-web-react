import React, { Component } from "react";

export default class OnboardingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStepNum: 0,
      steps: [
        { title: "Protecção de dados", description: "Os seus dados são anónimos...", img: "" },
        { title: "Altere o seus estado", description: "Os seus dados são anónimos...", img: "" },
        { title: "Confira a sua área", description: "Os seus dados são anónimos...", img: "" },
        { title: "Verifique os seus contactos", description: "Os seus dados são anónimos...", img: "" }
      ]
    };

    this.nextStep = this.nextStep.bind(this);
  }

  nextStep() {
    const { steps, currentStepNum } = this.state;

    if (currentStepNum < steps.length - 1) {
      this.setState({ currentStepNum: currentStepNum + 1 });
    }
  }

  prevStep() {
    const { currentStepNum } = this.state;

    if (currentStepNum > 0) {
      this.setState({ currentStepNum: currentStepNum - 1 });
    }
  }

  render() {
    const { steps, currentStepNum } = this.state;
    const currentStep = steps[currentStepNum];
    
    return (
      <div className="row">
        <div className="col-12">
            <div className="">
              <h1>{currentStep.title}</h1>
              <p>{currentStep.description}</p>
              <button className="btn btn-primary" onClick={this.nextStep}>
                Seguinte
              </button>
            </div>
        </div>
      </div>
    );
  }
}
