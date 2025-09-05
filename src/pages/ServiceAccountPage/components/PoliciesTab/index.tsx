import { TitleLockup } from '@vds/type-lockups'

import NoPoliciesCard from '../NoPoliciesCard'

export default function PoliciesTab() {
  return (
    <>
      <TitleLockup
        data={{
          title: {
            primitive: 'h4',
            size: 'titleMedium',
            children: 'Applied policies',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children:
              'Policies define the specific permissions this member has to perform actions and access resources.',
          },
        }}
      />
      <NoPoliciesCard />
    </>
  )
}
