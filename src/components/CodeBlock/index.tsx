import { PrismLight as SyntaxHighlighter, type SyntaxHighlighterProps } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import { coyWithoutShadows as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('json', json)

type Props = Omit<SyntaxHighlighterProps, 'language' | 'style' | 'children'> & {
  data?: object | null
}

export default function CodeBlock({ data, ...props }: Props) {
  if (!data) {
    return null
  }

  const formattedJson = JSON.stringify(data, null, 2)

  return (
    <SyntaxHighlighter language="json" style={style} showLineNumbers {...props}>
      {formattedJson}
    </SyntaxHighlighter>
  )
}
