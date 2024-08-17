import { getRandomElement } from "@/mongo/actions/utils";

interface ITagProps {
  color?: string;
  title?: string;
  size?: "small" | "medium" | "large";
}

const tagColors = {
  green: { dot: "bg-green-400 dark:bg-green-600", bg: "bg-green-100", border: "border-green-400" },
  blue: { dot: "bg-blue-300", bg: "bg-blue-50", border: "border-blue-300" },
  red: { dot: "bg-red-300", bg: "bg-red-50", border: "border-red-300" },
  purple: { dot: "bg-purple-300", bg: "bg-purple-50", border: "border-purple-300" },
  yellow: { dot: "bg-yellow-300", bg: "bg-yellow-50", border: "border-yellow-300" },
  orange: { dot: "bg-orange-300", bg: "bg-orange-50", border: "border-orange-300" },
  stone: { dot: "bg-stone-300", bg: "bg-stone-50", border: "border-stone-300" },
};

const tagSizes = {
  small: "",
  medium: "p-1 px-2 pr-4 border-b",
  large: "py-2 pl-[8px] pr-[16px] border-b-2",
};

const colors: string[] = [
  "green", "blue", "red", "purple", "yellow", "orange", "stone"
]

export const Tag = ({ color, title, size = "small" }: ITagProps ) => {
  color = color || getRandomElement( colors )
  
  const colorStyle = tagColors[color];
  const sizeStyle = tagSizes[size];

  return (
    <div className={`flex items-center rounded-full w-fit max-w-[100px] m-1 shadow-sm ${colorStyle.bg} ${colorStyle.border} font-semibold ${sizeStyle}`}>
      <span className={`h-[10px] w-[10px] rounded-full shadow-inner ${colorStyle.dot}`} />
      <p className="text-xs ml-1 text-black font-medium">{title}</p>
    </div>
  );
};
