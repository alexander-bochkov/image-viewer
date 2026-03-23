import { useHideScrollbar } from "./use-hide-scrollbar";
import { useLockKeyboard } from "./use-lock-keyboard";
import { useLockScrolling } from "./use-lock-scrolling";

export const useDisablePageInteraction = (enabled: boolean) => {
  useHideScrollbar(enabled);
  useLockKeyboard(enabled);
  useLockScrolling(enabled);
};
