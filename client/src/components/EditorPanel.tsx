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
    <div className="fade-in animate-fade-in absolute top-4 right-4 z-50 w-80 border border-border bg-card p-4 text-card-foreground shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground">Edit Element</h3>
        <button
          onClick={onClose}
          className="border border-border bg-background p-1 text-muted-foreground shadow-sm active:shadow-none transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4 text-foreground">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Text Content
          </label>
          <textarea
            value={values.text}
            className="min-h-20 w-full border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            onChange={(e) => handleChange("text", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Class Name
          </label>
          <input
            type="text"
            value={values.className || ""}
            className="w-full border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            onChange={(e) => handleChange("className", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Padding
            </label>
            <input
              type="text"
              value={values.styles.padding}
              className="w-full border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              onChange={(e) => handleStyleChange("padding", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Margin
            </label>
            <input
              type="text"
              value={values.styles.margin}
              className="w-full border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              onChange={(e) => handleStyleChange("margin ", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Font Size
            </label>
            <input
              type="text"
              value={values.styles.fontSize}
              className="w-full border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Background
            </label>
            <div className="flex items-center gap-2 border border-border bg-background p-1">
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
              <span className="truncate text-xs text-muted-foreground">
                {values.styles.backgroundColor}
              </span>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Text Color
            </label>
            <div className="flex items-center gap-2 border border-border bg-background p-1">
              <input
                type="color"
                value={values.styles.color}
                className="w-6 h-6 cursor-pointer"
                onChange={(e) => handleStyleChange("color", e.target.value)}
              />
              <span className="truncate text-xs text-muted-foreground">
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
