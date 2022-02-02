export default function focusOnActiveButton(buttonWrapperRef: React.RefObject<HTMLDivElement>) {
  setTimeout(() => {
    const buttons = buttonWrapperRef.current?.querySelectorAll('button');
    const button = buttons ? Array.from(buttons).find((b) => !b.disabled) : null;

    button && button.focus();
  }, 0);
}
