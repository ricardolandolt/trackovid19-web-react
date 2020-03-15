import React, { Component } from "react";
import illustration1 from "../images/onboarding/ilustracao01.png";
import illustration2 from "../images/onboarding/ilustracao02.png";
import illustration3 from "../images/onboarding/ilustracao03.png";
import illustration4 from "../images/onboarding/ilustracao04.png";

export default class OnboardingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStepNum: 0,
      steps: [
        { title: "Protecção de dados", description: "Os seus dados são anónimos e confidenciais. Os seus contactos não terão acesso a seu estado.", img: illustration1 },
        { title: "Altere o seus estado", description: "Atualize o seu estado atual. Preencha o formulário de sintomas para mais informações.", img: illustration2},
        { title: "Confira a sua área", description: "Tenha acesso a informações relativas à sua área.", img: illustration3 },
        { title: "Verifique os seus contactos", description: "Verifique a situação dos seus contactos.", img: illustration4 }
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
              <img src={currentStep.img} style={{maxWidth: "320px", margin: "auto"}} />
              <h1 className="h4 font-weight-bold">{currentStep.title}</h1>
              <p className="mt-2" style={{maxWidth: "320px", margin: "auto"}}>{currentStep.description}</p>
              <button className="button-big mt-4" onClick={this.nextStep}>
                Seguinte
              </button>
            </div>
        </div>
      </div>
    );
  }
}
