import { PiggyBank } from "lucide-react"
import { FormSteps } from "./FormStep"
import { StepProgress } from "./Progress"

export const SimulationForm = () => {
    return (
        <>
            <StepProgress currentStep={6} totalSteps={10} />
            <FormSteps icon={PiggyBank} title="Renda mensal bruta" question="Quanto é depositado na sua conta todo mês (somando todos as fontes)?" inputProps={{type: 'text', placeholder: 'ex: 5.000,00', prefix: 'R$'}} />
        </>
    )
}