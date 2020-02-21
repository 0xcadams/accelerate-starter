declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.md' {
  const content: any;
  export default content;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
