export interface OnBoardingProps {
  currentStep: number;
  stepAmount: number;
  setHost?: (host: string) => void;
}
