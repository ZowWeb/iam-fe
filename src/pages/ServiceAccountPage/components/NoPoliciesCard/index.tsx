import { TitleLockup } from '@vds/type-lockups'
import { Button } from '@vds/buttons'

import { Card, Width } from './styles'

export default function NoPoliciesCard() {
  return (
    <Card direction="column" justifyContent="center">
      <Width>
        <TitleLockup
          textAlignment="center"
          data={{
            title: {
              size: 'titleLarge',
              bold: true,
              children: 'No Policies Assigned',
            },
            subtitle: {
              size: 'bodyLarge',
              children:
                'Policies control what actions this service account can perform and what resources it can access. Add policies to grant the necessary permissions.',
            },
          }}
        />
      </Width>
      <Button size="large" use="primary" onClick={() => {}}>
        Add policies
      </Button>
    </Card>
  )
}
