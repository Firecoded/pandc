import { useRef } from "react";

interface BulletListInputProps {
  label: string;
  items: string[];
  onChange: (updated: string[]) => void;
  color: "emerald" | "rose";
}

const colorClasses = {
  emerald: {
    text: "text-emerald-400",
    hoverText: "hover:text-emerald-300",
    ring: "focus:ring-emerald-500",
  },
  rose: {
    text: "text-rose-400",
    hoverText: "hover:text-rose-300",
    ring: "focus:ring-rose-500",
  },
};

export default function BulletListInput({
  label,
  items,
  onChange,
  color,
}: BulletListInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const addItem = () => {
    onChange([...items, ""]);
    // delay to ensure re-render before focus
    setTimeout(() => {
      const lastIndex = items.length;
      inputRefs.current[lastIndex]?.focus();
    }, 0);
  };

  const updateItem = (value: string, index: number) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    onChange(updated);
  };

  const alteredLabelOrder = label === "Cons";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        {!alteredLabelOrder && (
          <h2 className={`text-2xl font-semibold ${colorClasses[color].text}`}>
            {label}
          </h2>
        )}
        <button
          type="button"
          className={`${colorClasses[color].text} text-2xl leading-none ${colorClasses[color].hoverText} cursor-pointer`}
          onClick={addItem}
        >
          +
        </button>
        {alteredLabelOrder && (
          <h2 className={`text-2xl font-semibold ${colorClasses[color].text}`}>
            {label}
          </h2>
        )}
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="relative mb-2">
          <input
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            value={item}
            onChange={(e) => updateItem(e.target.value, idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            className={`w-full rounded-md p-2 text-sm text-white bg-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 ${colorClasses[color].ring} pr-8`}
            placeholder={`${label} #${idx + 1}`}
          />
          <button
            onClick={() => removeItem(idx)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
