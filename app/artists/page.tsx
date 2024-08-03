
import Image from "next/image"
import Link from "next/link"
const abt = `a visual artist residing in Oakland, California. Influenced by abstract expressionism, photography and digital media, Arizmendi uses color and composition in various forms to explore human consciousness and subjectivity.  The purpose of art, for Arizmendi, is to freely explore and express the internal world of the mind in its various emotional, intellectual, and spiritual modalities.`

const artists = [
    {
        fullName: "Benjamin Arizmendi",
        firstname: "benjamin",
        lastname: "arizmendi",
        aboutPreview: abt,
        blob: "/benji.png"
    },
    {
        fullName: "Benjamin Arizmendi",
        aboutPreview: abt,
        blob: "/benji.png"
    },
    {
        fullName: "Benjamin Arizmendi",
        aboutPreview: abt,
        blob: "/benji.png"
    }
]

const artistStyles = {
    ctn: "flex flex-col w-[300px] h-fit m-3",
    image: "h-[250px] w-[540px] rounded-t",
    about: "text-sm dark:bg-slate-950 bg-gray-200 p-4",
    workPreview: "dark:bg-gray-950 w-full opacity-75",
    details: "flex",
    fullName: " rounded-md self-end text-md tracking-widest text-sm  p-2 font-medium",
}

export default function ArtistsPage() {
  return (
    <div className={"h-[520px] flex flex-wrap p-4 items-center overflow-auto"}>
        {
          artists.map(({ fullName, aboutPreview, blob, lastname }, i) => {
            return <Link href={`artists/${lastname}`}  key={i} className={ artistStyles.ctn }>
                <div className={artistStyles.details}>
                    <Image className={ artistStyles.image } width={500} height={500} src={blob} alt="artist" />
                    {/* <div className={artistStyles.workPreview}>
                      <Link href={`artists/${lastname}`}>profile</Link>
                    </div>
                 */}
                </div>
                <p className={ artistStyles.about }>{ aboutPreview }</p>
                <h3 className={ artistStyles.fullName }>{ fullName }</h3>
            </Link>
          })
        }
    </div>

  )

}