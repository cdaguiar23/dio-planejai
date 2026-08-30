import { FormSteps } from "./FormStep"
import { StepProgress } from "./Progress"
import { simulationFormSteps } from "../../data/simulation"

export const SimulationForm = () => {

    const currentStep = simulationFormSteps[5]

    return (
        <>
            <StepProgress currentStep={6} totalSteps={10} />
            <FormSteps key={currentStep.id} {...currentStep} />
        </>
    )
}