import React, { Component } from "react";

export default class OnboardingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStepNum: 0,
      steps: [
        { title: "Protecção de dados", description: "Os seus dados são anónimos e confidenciais. Os seus contactos não terão acesso a seu estado.", img: "" },
        { title: "Altere o seus estado", description: "Atualize o seu estado atual. Preencha o formulário de sintomas para mais informações.", img: "" },
        { title: "Confira a sua área", description: "Tenha acesso a informações relativas à sua área.", img: "" },
        { title: "Verifique os seus contactos", description: "Verifique a situação dos seus contactos.", img: "" }
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
            <div className="d-block text-center">
              <h1 className="h4 font-weight-bold">{currentStep.title}</h1>
              <p className="">{currentStep.description}</p>
              <button className="button-big" onClick={this.nextStep}>
                Seguinte
              </button>
            </div>
        </div>
      </div>
    );
  }
}
