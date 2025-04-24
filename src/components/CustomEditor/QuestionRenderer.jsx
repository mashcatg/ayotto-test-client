/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const QuestionRenderer = ({ content, className = "" }) => {
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (!contentRef.current || !content) return;
    
    // Find and render all math formulas after component mounts
    const renderMathFormulas = () => {
      const mathElements = contentRef.current.querySelectorAll('.math-formula');
      
      mathElements.forEach((element) => {
        try {
          const latex = element.getAttribute('data-latex');
          if (latex) {
            // Render the formula using KaTeX
            const rendered = katex.renderToString(latex, {
              displayMode: false,
              throwOnError: false,
              output: 'html'
            });
            
            // Replace the content with rendered formula
            element.innerHTML = rendered;
            element.classList.add('rendered-math');
          }
        } catch (error) {
          console.error('Error rendering math formula:', error);
        }
      });
    };
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(renderMathFormulas, 0);
    return () => clearTimeout(timeoutId);
  }, [content]);

  return (
    <div 
      ref={contentRef} 
      className={`question-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content || '' }} 
    />
  );
};

export default QuestionRenderer;