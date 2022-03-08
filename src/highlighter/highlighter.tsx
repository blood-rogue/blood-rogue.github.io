import * as Prism from "prismjs"
import { Gist } from "../api"
import { languages} from "./languages"

const tokenToTag = (token : Prism.Token, i: number) => {
  switch (token.type) {
    case 'keyword':
      return <span key={i} className="text-purple-500">{token.content}</span>
    case 'builtin':
      return <span key={i} className="">{token.content}</span>
    case 'class-name':
      return <span key={i} className="text-blue-600">{token.content}</span>
    case 'function':
      return <span key={i} className="text-amber-200">{token.content}</span>
    case 'decorator':
      return <span key={i} className="text-sky-500">{token.content}</span>
    case 'triple-quoted-string':
      return <span key={i} className="text-emerald-500">{token.content}</span>
    case 'boolean':
      return <span key={i} className="text-red-500">{token.content}</span>
    case 'number':
      return <span key={i} className="text-green-300">{token.content}</span>
    case 'string':
      return <span key={i} className="text-emerald-500">{token.content}</span>
    case 'char':
      return <span key={i} className="text-emerald-500">{token.content}</span>
    case 'symbol':
      return <span key={i} className="text-white">{token.content}</span>
    case 'regex':
      return <span key={i} className="text-amber-900">{token.content}</span>
    case 'url':
      return <span key={i} className="text-orange-400 underline underline-offset-1">{token.content}</span>
    case 'operator':
      return <span key={i} className="text-white">{token.content}</span>
    case 'variable':
      return <span key={i} className="text-sky-500">{token.content}</span>
    case 'constant':
      return <span key={i} className="text-sky-600">{token.content}</span>
    case 'property':
      return <span key={i} className="text-sky-500">{token.content}</span>
    case 'punctuation':
      return <span key={i} className="">{token.content}</span>
    case 'important':
      return <span key={i} className="">{token.content}</span>
    case 'comment':
      return <span key={i} className="font-normal italic">{token.content}</span>
    case 'tag':
      return <span key={i} className="">{token.content}</span>
    case 'attr-name':
      return <span key={i} className="">{token.content}</span>
    case 'attr-value':
      return <span key={i} className="">{token.content}</span>
    case 'namespace':
      return <span key={i} className="">{token.content}</span>
    case 'prolog':
      return <span key={i} className="">{token.content}</span>
    case 'doctype':
      return <span key={i} className="">{token.content}</span>
    case 'cdata':
      return <span key={i} className="">{token.content}</span>
    case 'entity':
      return <span key={i} className="">{token.content}</span>
    case 'bold':
      return <span key={i} className="">{token.content}</span>
    case 'italic':
      return <span key={i} className="">{token.content}</span>
    case 'atrule':
      return <span key={i} className="">{token.content}</span>
    case 'selector':
      return <span key={i} className="">{token.content}</span>
    case 'inserted':
      return <span key={i} className="">{token.content}</span>
    case 'deleted':
      return <span key={i} className="">{token.content}</span>
    default:
      return <span key={i} className="">{token.content}</span>
      
  }
}

const getCodes: (token: Prism.Token, i: number) => JSX.Element = (token: Prism.Token, i: number) => {
  if (typeof token.content === "string") return tokenToTag(token, i)
  else if (Array.isArray(token.content)) {
    return <>{token.content.map((t, i) => {
      if (typeof t === "string") return <span>{t}</span>
      else return getCodes(t, i)})}</>
  }
  else if (token.content instanceof Prism.Token) return getCodes(token.content, i)
  else return <span></span>
}

export const getHtml = async (gist: Gist) => {
  const htmlCodes: { [key: string]: JSX.Element[] } = {}
  for (const [file, details] of Object.entries(gist.files)) {
    const lang = languages[details.type]
    await import(`prismjs/components/prism-${lang}.js`)
    const language = Prism.languages[lang]
    const tokens = Prism.tokenize(details.content, language)
    const htmlCode = tokens.map((token, i) => {
      if (token instanceof Prism.Token) return getCodes(token, i)
      return <span key={i}>{token}</span>
    })
    htmlCodes[file] = htmlCode
  }  
  return htmlCodes
}