// src/styles.d.ts

// Declaração de módulo para arquivos .scss (arquivos de estilo usando SASS).
// Isso permite que você importe arquivos .scss diretamente nos arquivos TypeScript ou JavaScript
// e use as classes CSS geradas como um objeto.

declare module "*.scss" {
  // Declara que o conteúdo de arquivos .scss será um objeto, onde as chaves são os nomes das classes 
  // e os valores são as strings que representam as classes CSS geradas.
  const content: { [className: string]: string };
  
  // Exporta esse conteúdo como o padrão, permitindo que você acesse as classes SCSS diretamente
  // nos componentes quando importar os arquivos .scss.
  export default content;
}
