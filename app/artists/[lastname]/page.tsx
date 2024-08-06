import Link from "next/link"
import Image from "next/image"

const collections = [
  { title: "sketches", id: 0, path: "/collections/sketches", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png" },
  { title: "prints", id: 1, path: "/collections/prints", blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/red_ocean.png" },
  { title: "paintings", id: 2, path: "/collections/paintings", blob: "/alice_falls.webp" },
]

const abt = `a visual artist residing in Oakland, California. Influenced by abstract expressionism, photography and digital media, Arizmendi uses color and composition in various forms to explore human consciousness and subjectivity.  The purpose of art, for Arizmendi, is to freely explore and express the internal world of the mind in its various emotional, intellectual, and spiritual modalities.`

const fabt = `Benjamin Arizmendi is a visual artist residing in Oakland, California. Influenced by abstract expressionism, photography and digital media, Arizmendi uses color and composition in various forms to explore human consciousness and subjectivity.  The purpose of art, for Arizmendi, is to freely explore and express the internal world of the mind in its various emotional, intellectual, and spiritual modalities.  More boldly, Arizmendi believes these subjective explorations and expressions can help human beings understand external, objective reality.  Arizmendi believes that art can be a profound tool for understanding the world that science unveils, a tool that unifies internal, subjective truths with external objective truths.  While science quantifies the empirical world, abstract art can be used to "quantify" the world of mind and consciousness.  Arizmendi's thesis is that mind and consciousness are central to our understanding of reality, and that artistic abstraction can bring mind and consciousness to bear upon rational, scientific inquiry.
Arizmendi has created art inspired by and in collaboration with leading scientists and philosophers from the University of Vienna, UC Berkeley, UC San Diego, The Lawrence Berkeley National Laboratory, NYU, Oxford, and the University of Washington.  Notably, he was commissioned by the UC Berkeley Physics department to create art pieces for the new Center for Quantum Coherent Sciences, as well as the Quantum Nanoelectronics Laboratory at that institution.  He is currently creating pieces for a new, Quantum Computing facility at the Lawrence Berkeley National Laboratory.
Arizmendi's art has been shown throughout Northern and Southern California, as well as East Hampton, NY and Vienna, Austria.  He has been represented by Hugo Rivera Gallery in Laguna Beach, California and Joyce Gordon Gallery in Oakland, California.  Arizmendi received his BA in philosophy with honors from UCLA.  Before becoming a full time artist he was a lawyer and a financial advisor.  He holds a JD from the George Washington University Law School.
`

const artists = [
  {
      fullName: "Benjamin Arizmendi",
      firstname: "benjamin",
      lastname: "arizmendi",
      aboutPreview: fabt,
      blob: "/benji.png"
  },
  // {
  //     fullName: "Benjamin Arizmendi",
  //     aboutPreview: abt,
  //     blob: "/benji.png"
  // },
  // {
  //     fullName: "Benjamin Arizmendi",
  //     aboutPreview: abt,
  //     blob: "/benji.png"
  // }
]

const artistStyles = {
  ctn: "flex flex-col w-[300px] bg-slate-950" ,
  image: " h-[250px] w-[300px] rounded-t ",
  about: " text-sm dark:bg-slate-950 bg-gray-200 p-4 max-h-5/6 overflow-hidden ",
  fullName: " tracking-widest text-sm font-medium h-[35px] flex items-end justify-end p-2 ",
}


export function ArtistPage({ params }) {

  const { fullName, lastname, aboutPreview, blob } = artists[0]

  return (
    <div className="">

      {/* <div className={ artistStyles.ctn }>
        <Image className={ artistStyles.image } width={500} height={500} src={blob} alt="artist" />
        <p className={ artistStyles.about }>{ aboutPreview }</p>
        <h3 className={ artistStyles.fullName }>{ fullName }</h3> 
      </div> */}

      <div className="flex">
        { collections.map(({ title, path, blob },key)=>
        <Link href={ params.lastname + path } className={"h-fit m-4"} key={key}>
        <Image 
          priority 
          src={blob} 
          alt={title} 
          width={600} 
          height={500}
          className={"max-w-[350px] h-[350px]"}
          />
          <div className="w-full dark:bg-slate-950 bg-gray-300 p-2">
            <p className="text-3xl">{title.toUpperCase()}</p>
          </div>
        </Link> )}
      </div>


    </div>
  )
}

export default ArtistPage