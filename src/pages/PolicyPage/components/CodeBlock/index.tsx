import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import format from 'json-format'

import myCustomStyle from './myCustomStyle'

// Define the configuration for the JSON formatter
const jsonFormatConfig = {
  type: 'space',
  size: 2,
}

type CodeBlockProps = {
  data: object | undefined
}

export default function CodeBlock({ data }: CodeBlockProps) {
  if (!data) {
    return null
  }

  // Use a try-catch block to handle potential JSON parsing errors
  let formattedJson
  try {
    // Format the JSON object into a pretty-printed string
    formattedJson = format(data, jsonFormatConfig)
  } catch (error) {
    console.error('Error formatting JSON:', error)
    // If formatting fails, display the original data as a fallback
    formattedJson = JSON.stringify(data, null, 2)
  }

  return (
    <SyntaxHighlighter language="json" style={myCustomStyle} showLineNumbers>
      {formattedJson}
    </SyntaxHighlighter>
  )
}
