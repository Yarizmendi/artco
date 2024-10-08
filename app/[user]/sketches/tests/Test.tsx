
"use client"
import Image from "next/image"
import classnames from "classnames"
import { P5Provider } from "hooks/contexts/useP5"
import { setup } from "./functs/setup"
import { draw } from "./functs/draw"

export default function PathSKetch({
  displayName, images, inputs, 
}) {

  function sketch(p) {
    p.setup = setup(p)
    p.draw = draw(p)
  }

  return (
    <P5Provider sketch={sketch}>

      {(displayName) && <p className={classnames("text-lg uppercase border")}>{displayName || "Preview"} sketch</p>}

      <div className={classnames(
        "flex gap-4 overflow-auto p-4 w-full border"
        )}> {images && images.map((img, key) => <Image key={key} src={img.blob} width={100} alt={"img"} height={100} placeholder={"blur"} blurDataURL={"blur64"} />)}
      </div>

  </P5Provider>
  )
}