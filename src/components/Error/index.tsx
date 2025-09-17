import { Alert } from '@mantine/core'
import { Icon } from '@vds/icons'

import { COLORS } from '~/styles/constants'

type Props = { error: Error }

const Error = ({ error }: Props) => {
  return (
    <Alert
      title="Error"
      color={COLORS.error}
      icon={<Icon name="error" color={COLORS.error} size="2rem" />}
      styles={{
        root: {
          width: '500px',
        },
        icon: {
          width: '2rem',
          height: '2rem',
        },
        title: {
          fontSize: '2rem',
          lineHeight: 1,
        },
        message: {
          fontSize: '1rem',
          marginTop: '1rem',
        },
      }}
    >
      {error.message}
    </Alert>
  )
}

export default Error
