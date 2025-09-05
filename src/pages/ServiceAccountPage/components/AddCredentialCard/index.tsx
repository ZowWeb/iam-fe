import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'

import { ButtonRow, Card } from './styles'
import Typography from '~/components/Typography'
import { FONT_WEIGHTS } from '~/styles/constants'

export default function AddCredentialCard() {
  return (
    <Card direction="column" justifyContent="center">
      <ButtonRow direction="row" justifyContent="center" gap="0.5rem">
        <ButtonIcon
          surfaceType="colorFill"
          kind="lowContrast"
          size="large"
          renderIcon={(props: IconProps) => <Icon name="plus" {...props} />}
          onClick={() => {}}
        />
        <Typography.Span weight={FONT_WEIGHTS.bold}>Add a credential</Typography.Span>
      </ButtonRow>
      <Typography.Span weight={FONT_WEIGHTS.medium} size="0.75rem">
        You can have up to two credentials at a time.
      </Typography.Span>
    </Card>
  )
}
