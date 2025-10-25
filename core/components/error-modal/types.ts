export type ErrorModalCmProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  text: string;
  onCloseRedirectUrl?: string;
  buttonTitle?: string;
};
