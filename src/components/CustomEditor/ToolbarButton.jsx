/* eslint-disable react/prop-types */
function ToolbarButton({ onClick, active, children, title, id }) {
  // console.log(id);
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      id={id}
      className={`p-1.5 rounded text-sm font-medium ${active ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"}`}
    >
      {children}
    </button>
  );
}

export default ToolbarButton;
