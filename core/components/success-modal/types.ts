export type SuccessModalCmProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  text: string;
  onCloseRedirectUrl?: string;
  buttonTitle?: string;
};
