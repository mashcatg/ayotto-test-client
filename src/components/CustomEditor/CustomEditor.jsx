/* eslint-disable react/prop-types */
import { Node } from "@tiptap/core";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import katex from "katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import {
  Bold,
  Braces,
  CheckCircle,
  ChevronDown,
  Code,
  Columns,
  Eye,
  EyeOff,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Rows,
  SquarePlus,
  Table as TableIcon,
  Trash,
  Underline as UnderlineIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { BlockMath } from "react-katex";
import uploadImage from "../../utils/uploadImage";
import MathDialog from "./MathDialog";
import ToolbarButton from "./ToolbarButton";

let editorInstanceCounter = 0; // Counter to ensure each editor gets a unique ID

export default function CustomEditor({ value, onChange, placeholder }) {
  // Generate a truly unique ID for this editor instance
  const uniqueId = useRef(`editor-${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${editorInstanceCounter++}`).current;

  const fileInputRef = useRef(null);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showLinkMenu, setShowLinkMenu] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkInputRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ link: null, table: null });
  const [showMathDialog, setShowMathDialog] = useState(false);
  const [mathFormula, setMathFormula] = useState("\\frac{a}{b}");
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  // Custom link extension with additional options
  const CustomLink = Link.extend({
    inclusive: false,
    exitable: true,

    addCommands() {
      return {
        ...this.parent?.(),
        unsetLink:
          () =>
          ({ editor, tr }) => {
            // Only unset link for the current selection, not for all links
            const { from, to } = editor.state.selection;
            tr.removeMark(from, to, this.type);
            return true;
          },
      };
    },
  });

  const MathFormula = Node.create({
    name: "mathFormula",
    group: "inline",
    inline: true,
    selectable: true,
    atom: true,

    addAttributes() {
      return {
        formula: {
          default: "",
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "span.math-formula",
          getAttrs: (element) => ({
            formula: element.getAttribute("data-latex"),
          }),
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        "span",
        {
          class: "math-formula",
          "data-latex": HTMLAttributes.formula,
        },
        HTMLAttributes.formula,
      ];
    },

    addCommands() {
      return {
        insertMathFormula:
          (attrs) =>
          ({ chain }) => {
            return chain()
              .insertContent({
                type: this.name,
                attrs,
              })
              .run();
          },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      Highlight,
      CustomLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
        linkOnPaste: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-md",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
        emptyEditorClass: "is-editor-empty",
      }),
      MathFormula,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        // Only update if content actually changed
        onChange(html);
        setPreviewContent(html);
      }
    },
  });

  // Focus the link input when the menu opens
  useEffect(() => {
    if (showLinkMenu && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkMenu]);

  const handleButtonClick = (action) => {
    if (!editor) return;

    switch (action) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "highlight":
        editor.chain().focus().toggleHighlight().run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "superscript":
        editor.chain().focus().toggleSuperscript().run();
        break;
      case "subscript":
        editor.chain().focus().toggleSubscript().run();
        break;
      case "codeBlock":
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case "table":
        if (!editor.isActive("table")) {
          editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
          setShowTableMenu(true); // Always show menu when creating a table
        } else {
          setShowTableMenu(!showTableMenu); // Toggle menu when already in table
        }
        break;
      case "addRowBefore":
        editor.chain().focus().addRowBefore().run();
        break;
      case "addRowAfter":
        editor.chain().focus().addRowAfter().run();
        break;
      case "deleteRow":
        editor.chain().focus().deleteRow().run();
        break;
      case "addColumnBefore":
        editor.chain().focus().addColumnBefore().run();
        break;
      case "addColumnAfter":
        editor.chain().focus().addColumnAfter().run();
        break;
      case "deleteColumn":
        editor.chain().focus().deleteColumn().run();
        break;
      case "deleteTable":
        editor.chain().focus().deleteTable().run();
        setShowTableMenu(false);
        break;
      case "link":
        if (editor.isActive("link")) {
          // Keep selection after removing the link
          const { from, to } = editor.state.selection;
          editor.chain().focus().unsetLink().run();
          // Reselect the text that was unlinked for better user feedback
          editor.chain().setTextSelection({ from, to }).run();
        } else {
          // When creating a new link
          setShowLinkMenu(true);
          const selection = editor.state.selection;
          const text = selection.empty ? "" : editor.state.doc.textBetween(selection.from, selection.to);

          if (text && (text.startsWith("http") || text.startsWith("www"))) {
            setLinkUrl(text);
          } else {
            setLinkUrl("");
          }
        }
        break;
      case "image":
        fileInputRef.current?.click();
        break;
      case "math":
        setShowMathDialog(true);
        break;
    }
  };

  // function to handle math insertion
  const handleInsertMath = () => {
    if (mathFormula && editor) {
      editor.chain().focus().insertMathFormula({ formula: mathFormula }).run();
    }
    setShowMathDialog(false);
  };

  const handleSetLink = () => {
    if (linkUrl) {
      // Make sure URL has protocol
      let url = linkUrl;
      if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      editor.chain().focus().setLink({ href: url }).run();
    }
    setShowLinkMenu(false);
    setLinkUrl("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Show loading state
      // You could add a placeholder image or loading indicator here
      toast.promise(
        uploadImage(file),
        {
          loading: "Uploading image...",
          success: "Image uploaded successfully",
          error: "Failed to upload image",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );

      // Upload image to external storage
      const imageUrl = await uploadImage(file);

      // Insert the image with the URL (not base64)
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      console.error("Error handling image upload:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  // Update positions when scrolling or when menus are shown
  useEffect(() => {
    if (!editor) return;

    const updateMenuPositions = () => {
      // Use the unique IDs for querying elements
      const linkButton = document.getElementById(`link-button-${uniqueId}`);
      const tableButton = document.getElementById(`table-button-${uniqueId}`);

      if (linkButton && showLinkMenu) {
        const rect = linkButton.getBoundingClientRect();
        setMenuPosition((prev) => ({
          ...prev,
          link: { top: rect.bottom + 5, left: rect.left },
        }));
      }

      if (tableButton && showTableMenu && editor.isActive("table")) {
        const rect = tableButton.getBoundingClientRect();
        setMenuPosition((prev) => ({
          ...prev,
          table: { top: rect.bottom + 5, left: rect.left },
        }));
      }
    };

    // Update positions initially
    updateMenuPositions();

    // Add scroll event listener to update positions when scrolling
    window.addEventListener("scroll", updateMenuPositions, true);
    return () => {
      window.removeEventListener("scroll", updateMenuPositions, true);
    };
  }, [showLinkMenu, showTableMenu, editor, uniqueId]);

  // Add this effect to render math formulas after content updates
  useEffect(() => {
    if (!editor) return;

    // Function to render all math formulas in the editor
    const renderMathFormulas = () => {
      // Find all math formula elements
      const mathElements = document.querySelectorAll(".math-formula");

      mathElements.forEach((element) => {
        try {
          const latex = element.getAttribute("data-latex");
          if (latex) {
            // Create a wrapper for the rendered formula
            const wrapper = document.createElement("span");
            wrapper.style.display = "inline-block";

            // Use ReactDOM to render the BlockMath component into the wrapper
            ReactDOM.render(<BlockMath math={latex} />, wrapper);

            // Replace the content of the original element
            while (element.firstChild) {
              element.removeChild(element.firstChild);
            }
            element.appendChild(wrapper);
          }
        } catch (error) {
          console.error("Error rendering math formula:", error);
        }
      });
    };

    // Use a timeout to ensure the DOM has been updated
    const timeoutId = setTimeout(renderMathFormulas, 100);

    return () => clearTimeout(timeoutId);
  }, [editor, previewContent]);

  // Initialize preview content when editor is ready
  useEffect(() => {
    if (editor && value) {
      setPreviewContent(editor.getHTML());
    }
  }, [editor, value]);

  // Render math formulas in the preview content
  useEffect(() => {
    if (!showPreview) return;

    // console.log(previewContent);

    const renderMathInPreview = () => {
      const previewContainer = document.getElementById(`preview-container-${uniqueId}`);
      if (!previewContainer) return;

      const mathElements = previewContainer.querySelectorAll(".math-formula");

      // console.log(mathElements);

      mathElements.forEach((element) => {
        try {
          const latex = element.getAttribute("data-latex");
          if (latex) {
            const renderedHTML = katex.renderToString(latex, {
              displayMode: false, // or true if you want block mode
              throwOnError: false,
            });
            element.innerHTML = renderedHTML;
            element.classList.add("rendered-math");
          }
        } catch (error) {
          console.error("Error rendering math formula in preview:", error);
        }
      });
    };

    const timeoutId = setTimeout(renderMathInPreview, 100);
    return () => clearTimeout(timeoutId);
  }, [previewContent, showPreview, uniqueId]);

  useEffect(() => {
    if (editor && value !== undefined && value !== null && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
      setPreviewContent(value || "");
    }
  }, [value, editor]);
  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 overflow-visible rounded-t-xl">
        {/* Text formatting */}
        <ToolbarButton onClick={() => handleButtonClick("bold")} active={editor?.isActive("bold")} title="Bold">
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleButtonClick("italic")} active={editor?.isActive("italic")} title="Italic">
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleButtonClick("underline")} active={editor?.isActive("underline")} title="Underline">
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleButtonClick("highlight")} active={editor?.isActive("highlight")} title="Highlight">
          <Highlighter size={16} />
        </ToolbarButton>

        <div className="border-r border-gray-300 mx-1"></div>

        {/* Lists */}
        <ToolbarButton onClick={() => handleButtonClick("bulletList")} active={editor?.isActive("bulletList")} title="Bullet List">
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleButtonClick("orderedList")} active={editor?.isActive("orderedList")} title="Numbered List">
          <ListOrdered size={16} />
        </ToolbarButton>

        <div className="border-r border-gray-300 mx-1"></div>

        {/* Subscript/Superscript */}
        <ToolbarButton onClick={() => handleButtonClick("superscript")} active={editor?.isActive("superscript")} title="Superscript">
          <span className="text-xs">x²</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => handleButtonClick("subscript")} active={editor?.isActive("subscript")} title="Subscript">
          <span className="text-xs">x₂</span>
        </ToolbarButton>

        <div className="border-r border-gray-300 mx-1"></div>

        {/* Advanced formatting */}
        <div className="relative">
          <ToolbarButton
            onClick={() => handleButtonClick("link")}
            active={editor?.isActive("link") || showLinkMenu}
            title="Link"
            id={`link-button-${uniqueId}`}
          >
            <Link2 size={16} />
          </ToolbarButton>

          {/* Link menu uses createPortal */}
          {showLinkMenu &&
            menuPosition.link &&
            createPortal(
              <div
                className="absolute z-[100] bg-white rounded-lg shadow-lg p-2 border border-gray-200 w-64"
                style={{
                  top: menuPosition.link.top,
                  left: menuPosition.link.left,
                }}
                id={`link-menu-${uniqueId}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    ref={linkInputRef}
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="flex-1 p-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSetLink();
                      }
                    }}
                  />
                  <button onClick={handleSetLink} className="p-1 bg-primary text-white rounded hover:bg-primary/90">
                    <CheckCircle size={16} />
                  </button>
                  <button onClick={() => setShowLinkMenu(false)} className="p-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    <X size={16} />
                  </button>
                </div>
              </div>,
              document.body
            )}
        </div>

        <ToolbarButton onClick={() => handleButtonClick("image")} title="Insert Image">
          <ImageIcon size={16} />
        </ToolbarButton>

        <div className="relative">
          <ToolbarButton onClick={() => handleButtonClick("table")} active={editor?.isActive("table")} title="Table" id={`table-button-${uniqueId}`}>
            <div className="flex items-center">
              <TableIcon size={16} />
              {editor?.isActive("table") && showTableMenu && <ChevronDown size={12} className="ml-1" />}
            </div>
          </ToolbarButton>

          {/* Table menu uses createPortal */}
          {showTableMenu &&
            editor?.isActive("table") &&
            menuPosition.table &&
            document.body &&
            createPortal(
              <div
                className="absolute z-[100] bg-white rounded-lg shadow-lg p-2 border border-gray-200 w-48"
                style={{
                  top: menuPosition.table.top,
                  left: menuPosition.table.left,
                }}
                id={`table-menu-${uniqueId}`}
              >
                <p className="text-sm font-medium text-gray-500 px-2 pb-1 mb-1 border-b">Table options</p>
                <button
                  onClick={() => handleButtonClick("addRowBefore")}
                  className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded"
                >
                  <SquarePlus size={14} /> Add row before
                </button>
                <button onClick={() => handleButtonClick("addRowAfter")} className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded">
                  <Rows size={14} /> Add row after
                </button>
                <button onClick={() => handleButtonClick("deleteRow")} className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded">
                  <Trash size={14} /> Delete row
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => handleButtonClick("addColumnBefore")}
                  className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded"
                >
                  <SquarePlus size={14} /> Add column before
                </button>
                <button
                  onClick={() => handleButtonClick("addColumnAfter")}
                  className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded"
                >
                  <Columns size={14} /> Add column after
                </button>
                <button
                  onClick={() => handleButtonClick("deleteColumn")}
                  className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 rounded"
                >
                  <Trash size={14} /> Delete column
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => handleButtonClick("deleteTable")}
                  className="flex w-full items-center gap-2 px-2 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash size={14} /> Delete table
                </button>
              </div>,
              document.body
            )}
        </div>

        <ToolbarButton onClick={() => handleButtonClick("codeBlock")} active={editor?.isActive("codeBlock")} title="Code Block">
          <Code size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleButtonClick("math")} title="Math Formula">
          <Braces size={16} />
        </ToolbarButton>

        {/* Add preview toggle button to the end */}
        <div className="ml-auto">
          <ToolbarButton
            onClick={() => {
              setShowPreview(!showPreview);

              // console.log(previewContent);
            }}
            active={showPreview}
            title={showPreview ? "Edit Mode" : "Preview Mode"}
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          </ToolbarButton>
        </div>
      </div>

      {/* Editor / Preview toggle */}
      <div className="overflow-auto rounded-b-xl">
        {showPreview ? (
          <div
            id={`preview-container-${uniqueId}`}
            className="p-3 min-h-[100px] bg-white prose-sm sm:prose lg:prose-lg prose-headings:font-bold prose-a:text-blue-600 prose-a:underline prose-img:rounded-md prose-img:max-w-full"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        ) : (
          <EditorContent editor={editor} className="p-3 min-h-[100px] focus:outline-none bg-white" />
        )}
      </div>

      {/* Hidden file input for image uploads */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {showMathDialog && createPortal(<MathDialog props={{ setShowMathDialog, handleInsertMath, mathFormula, setMathFormula }}></MathDialog>, document.body)}
    </div>
  );
}
