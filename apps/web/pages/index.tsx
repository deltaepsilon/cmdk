import { Button, KittyThemeProvider } from 'ui';

export default function Web() {
  return (
    <KittyThemeProvider>
      <div>
        <h1>Web</h1>
        <Button>Hey</Button>
      </div>
    </KittyThemeProvider>
  );
}
