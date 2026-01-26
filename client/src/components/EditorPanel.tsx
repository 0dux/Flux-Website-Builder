import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedElemet: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      fontSize: string;
      color: string;
    };
  };
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedElemet,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElemet);

  if (!selectedElemet || !values) return null;

  const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
      newValues.styles = { ...values.styles, [field]: value };
    }
    setValues(newValues);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } });
  };

  useEffect(() => {
    setValues(selectedElemet);
  }, [selectedElemet]);

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-zinc-200 p-4 z-50 animate-fade-in fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-zinc-800">Edit Element</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-zinc-100 rounded-full"
        >
          <X className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
      <div className="space-y-4 text-black">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1">
            Text Content
          </label>
          <textarea
            value={values.text}
            className="w-full text-sm p-2 border border-zinc-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none min-h-20"
            onChange={(e) => handleChange("text", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1">
            Class Name
          </label>
          <input
            type="text"
            value={values.className || ""}
            className="w-full text-sm p-2 border border-zinc-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => handleChange("className", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Padding
            </label>
            <input
              type="text"
              value={values.styles.padding}
              className="w-full text-sm p-2 border border-zinc-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => handleStyleChange("padding", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Margin
            </label>
            <input
              type="text"
              value={values.styles.margin}
              className="w-full text-sm p-2 border border-zinc-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => handleStyleChange("margin ", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Font Size
            </label>
            <input
              type="text"
              value={values.styles.fontSize}
              className="w-full text-sm p-2 border border-zinc-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Background
            </label>
            <div className="flex items-center gap-2 border border-zinc-400 rounded-md p-1">
              <input
                type="color"
                value={
                  values.styles.backgroundColor === "rgba(0, 0, 0, 0)"
                    ? "#ffffff"
                    : values.styles.backgroundColor
                }
                className="w-6 h-6 cursor-pointer"
                onChange={(e) =>
                  handleStyleChange("backgroundColor", e.target.value)
                }
              />
              <span className="text-xs text-zinc-600 truncate">
                {values.styles.backgroundColor}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Text Color
            </label>
            <div className="flex items-center gap-2 border border-zinc-400 rounded-md p-1">
              <input
                type="color"
                value={values.styles.color}
                className="w-6 h-6 cursor-pointer"
                onChange={(e) => handleStyleChange("color", e.target.value)}
              />
              <span className="text-xs text-zinc-600 truncate">
                {values.styles.color}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
