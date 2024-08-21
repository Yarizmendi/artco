
import classNames from "classnames"

const proseStyles = classNames(
  "px-8 grow prose",
  "dark:prose-invert",
  "prose-headings:mt-4 prose:font-semibold",
  "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-md"
)

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className={proseStyles}>
        {children}
      </div>
    )
  }