
declare namespace JSX {
    interface IntrinsicElements {
      [elemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      
    }
  }