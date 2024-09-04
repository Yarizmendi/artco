import p5Types from "p5"
export const ICONS_FILL = "material-symbols-fill"
export const ICONS_OUTLINE = "material-symbols-outlined"
export const RECORD_ICON_TEXT = "radio_button_checked"
export const PLAY_ICON_TEXT = "play_arrow"

export function Icon( p5: p5Types, icon_class: string, icon_text:string, parent? ) {
    let ctn = p5.createSpan()
    ctn.html( icon_text )
    ctn.class( icon_class ) 
    ctn.addClass('text-sm p-1')
    parent && ctn.parent( parent )
    return ctn
  }
  
  export function Button( p5: p5Types, parent? ) {
    let className = "flex items-center cursor-pointer"
    let ctn = p5.createButton("")
    ctn.class( className )
    parent && ctn.parent( parent )
    return ctn
  }
  
  export function Paragraph( p5: p5Types, text?: string, parent? ) {
    let className = "text-xs p-1"
    let ctn = p5.createP( text )
    ctn.class( className )
    parent && ctn.parent( parent )
    return ctn
  }

export function Controls( p5 ) {
    let className = "bg-stone-500 bg-opacity-10 backdrop-blur-sm rounded drop-shadow-lg px-4 py-2 text-white"  
    let ctn = p5.createDiv()
    ctn.position( 10, 80 )
    ctn.class( className )
    ctn.parent( "Parent" )
    ctn.draggable()
  
    let recordBtn = Button( p5, ctn )
    Icon( p5, ICONS_OUTLINE, RECORD_ICON_TEXT, recordBtn )
    let recordBtnP = Paragraph( p5, "record", recordBtn )
  
    let playBtn = Button( p5, ctn ).id("playbtn")
    Icon( p5, ICONS_OUTLINE, PLAY_ICON_TEXT, playBtn )
    let playBtnP = Paragraph( p5, "play", playBtn )

    let resetBtn = Button( p5, ctn )
    Icon( p5, ICONS_OUTLINE, "reset_settings", resetBtn )
    let resetBtnP = Paragraph( p5, "reset", resetBtn )
  
    let sketchTime = Paragraph( p5, "0 seconds", ctn )

    
    let res = {
      recordBtn: recordBtn,
      recordBtnLabel: recordBtnP,
      playBtn: playBtn,
      playBtnLabel: playBtnP,
      playBtnP: playBtn,
      sketchTime: sketchTime,
      resetBtn: resetBtn,
      resetBtnLabel: resetBtnP
    }
  
    return res
  }