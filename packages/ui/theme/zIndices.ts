// Stacking order of UI elements, from top to bottom
export default ['Toast', 'Menu', 'Modal', 'Header', 'Tooltip'].reduce(
  (acc, name, i, layers) => ((acc[name] = layers.length - i), acc),
  {} as { [key: string]: number },
);
