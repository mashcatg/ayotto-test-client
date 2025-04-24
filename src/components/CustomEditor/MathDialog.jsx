/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { BlockMath } from "react-katex";

const MathDialog = ({ props }) => {
  const { setShowMathDialog, handleInsertMath, mathFormula, setMathFormula } = props;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[550px] max-w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-gray-800">Insert Math Formula</h3>
          <button onClick={() => setShowMathDialog(false)} className="text-gray-500 hover:text-gray-700" aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <label htmlFor="math-formula-input" className="text-sm font-medium text-gray-700">
              LaTeX Formula
            </label>
            <span className="text-xs text-gray-500">(Use LaTeX syntax)</span>
          </div>
          <input
            id="math-formula-input"
            type="text"
            value={mathFormula}
            onChange={(e) => setMathFormula(e.target.value)}
            placeholder="Enter LaTeX formula"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all"
            autoFocus
          />
        </div>

        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-1">Preview</p>
          <div className="p-4 border rounded-lg bg-gray-50 overflow-auto min-h-[60px] flex items-center justify-center">
            <BlockMath math={mathFormula} />
          </div>
        </div>

        {/* Formula categories with tabs */}
        <div className="mb-5">
          <div className="border-b border-gray-200 mb-4">
            <p className="text-sm font-medium text-gray-800 pb-2">Common Formulas</p>
          </div>

          {/* Basic Formulas section */}
          <div className="mb-4">
            <p className="text-sm font-medium text-primary-600 mb-3 pl-1">Basic Formulas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: "Fraction", formula: "\\frac{a}{b}" },
                { title: "Square Root", formula: "\\sqrt{x}" },
                { title: "Nth Root", formula: "\\sqrt[n]{x}" },
                { title: "Power/Exponent", formula: "x^2" },
                { title: "Summation", formula: "\\sum_{i=1}^{n} x_i" },
                { title: "Integral", formula: "\\int_{a}^{b} f(x) dx" },
              ].map((item) => (
                <div key={item.formula} className="p-3 border border-gray-200 rounded-lg hover:border-primary/40 hover:shadow-sm transition-all bg-white group">
                  <div className="flex justify-end gap-2 lg:gap-0 mb-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.formula);
                        toast.success("Formula copied to clipboard");
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md  transition-opacity"
                      title="Copy formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => setMathFormula(item.formula)}
                      className="p-1 text-primary hover:text-primary/70 rounded-md  transition-opacity"
                      title="Use formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 flex items-center justify-center">
                      <BlockMath math={item.formula} />
                    </div>
                    <code className="mt-2 text-xs bg-gray-100 px-2 py-1 rounded w-full text-center overflow-x-auto">{item.formula}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matrices section */}
          <div className="mb-3">
            <p className="text-sm font-medium text-primary-600 mb-2">Matrices</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { title: "2x2 Matrix", formula: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
                { title: "3x3 Matrix", formula: "\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}" },
              ].map((item) => (
                <div key={item.formula} className="p-3 border border-gray-200 rounded-lg hover:border-primary/40 hover:shadow-sm transition-all bg-white group">
                  <div className="flex justify-end gap-2 lg:gap-0 mb-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.formula);
                        toast.success("Formula copied to clipboard");
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md  transition-opacity"
                      title="Copy formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => setMathFormula(item.formula)}
                      className="p-1 text-primary hover:text-primary/70 rounded-md  transition-opacity"
                      title="Use formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-16 flex items-center justify-center">
                      <BlockMath math={item.formula} />
                    </div>
                    <code className="mt-2 text-xs bg-gray-100 px-2 py-1 rounded w-full text-center overflow-x-auto">{item.formula.replace(/\\/g, "\\")}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Greek Letters section */}
          <div className="mb-3">
            <p className="text-sm font-medium text-primary-600 mb-2">Greek Letters</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { title: "Alpha", formula: "\\alpha" },
                { title: "Beta", formula: "\\beta" },
                { title: "Gamma", formula: "\\gamma" },
                { title: "Delta", formula: "\\delta" },
                { title: "Theta", formula: "\\theta" },
                { title: "Pi", formula: "\\pi" },
              ].map((item) => (
                <div key={item.formula} className="p-2 border border-gray-200 rounded-lg hover:border-primary/40 hover:shadow-sm transition-all bg-white group">
                  <div className="flex justify-end gap-2 lg:gap-0 mb-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.formula);
                        toast.success("Formula copied to clipboard");
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md  transition-opacity"
                      title="Copy formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => setMathFormula(item.formula)}
                      className="p-1 text-primary hover:text-primary/70 rounded-md  transition-opacity"
                      title="Use formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 flex items-center justify-center">
                      <BlockMath math={item.formula} />
                    </div>
                    <code className="mt-1 text-xs bg-gray-100 px-1 py-0.5 rounded w-full text-center overflow-x-auto">{item.formula}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inequalities section */}
          <div className="mb-3">
            <p className="text-sm font-medium text-primary-600 mb-2">Inequalities</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: "Less than or equal", formula: "a \\leq b" },
                { title: "Greater than or equal", formula: "a \\geq b" },
                { title: "Not equal", formula: "a \\neq b" },
                { title: "Approximately equal", formula: "a \\approx b" },
              ].map((item) => (
                <div key={item.formula} className="p-2 border border-gray-200 rounded-lg hover:border-primary/40 hover:shadow-sm transition-all bg-white group">
                  <div className="flex justify-end gap-2 lg:gap-0 mb-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.formula);
                        toast.success("Formula copied to clipboard");
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md  transition-opacity"
                      title="Copy formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => setMathFormula(item.formula)}
                      className="p-1 text-primary hover:text-primary/70 rounded-md  transition-opacity"
                      title="Use formula"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 flex items-center justify-center">
                      <BlockMath math={item.formula} />
                    </div>
                    <code className="mt-1 text-xs bg-gray-100 px-1 py-0.5 rounded w-full text-center overflow-x-auto">{item.formula}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://katex.org/docs/supported.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/70 text-sm inline-flex items-center"
            >
              <span>View full KaTeX documentation</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowMathDialog(false)} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button onClick={handleInsertMath} className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center">
            <span>Insert Formula</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathDialog;
