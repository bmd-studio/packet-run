import { OnboardingScreen } from "@/components/OnBoardingScreen";
import { OnBoardingProps } from './types';

export function Explanation1(props: OnBoardingProps) {
    return (
        <OnboardingScreen indicator={props}>
            <p>
        Hoi! Leuk dat je er bent!
            </p>

            <p>
        Laten we kort uitleggen wat je gaat doen met Packet Run. Je kan de pijltjes op het toetsenbord gebruiken om door te klikken in de uitleg.
            </p>
        </OnboardingScreen>
    )

}
