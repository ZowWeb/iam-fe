import { type ErrorComponentProps } from '@tanstack/react-router'

import Error from '~/components/Error'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'

export default function ErrorPage(props: ErrorComponentProps) {
  const { error } = props

  return (
    <FlexBox
      direction="column"
      justifyContent="center"
      alignItems="center"
      customStyle={{ minHeight: '100vh' }}
      gap="2.5rem"
    >
      <Typography.H1>Oh No</Typography.H1>
      <Error error={error} />
    </FlexBox>
  )
}
