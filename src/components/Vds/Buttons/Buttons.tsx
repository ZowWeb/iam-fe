import { ButtonIcon } from '@vds/button-icons'
import { Button } from '@vds/buttons'
import { Icon, type IconProps } from '@vds/icons'

export function Buttons() {
  return (
    <>
      <Button size="large" disabled={false} use="primary">
        Button 1
      </Button>
      <br />
      <Button size="large" disabled={false} use="secondary">
        Button 1
      </Button>
      <br />
      <ButtonIcon
        kind="highContrast"
        size="large"
        surfaceType="colorFill"
        renderIcon={(props: IconProps) => <Icon name="filter" {...props} />}
      />
      <br />
      <ButtonIcon
        kind="lowContrast"
        size="large"
        surfaceType="colorFill"
        renderIcon={(props: IconProps) => <Icon name="filter" {...props} />}
      />
    </>
  )
}
