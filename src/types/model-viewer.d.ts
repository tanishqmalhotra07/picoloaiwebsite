declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      "auto-rotate"?: boolean;
      "camera-controls"?: boolean;
      "interaction-prompt"?: string;
      "camera-orbit"?: string;
      "animation-name"?: string;
      "min-camera-orbit"?: string;
      "max-camera-orbit"?: string;
      "field-of-view"?: string;
      autoplay?: boolean;
    };
  }
}