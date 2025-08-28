import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetPolicyTagsProps = {
  teamId: string
}

export const getPolicyTags = ({ teamId }: GetPolicyTagsProps) =>
  queryOptions<PolicyTag[] | undefined>({
    queryKey: ['GET_POLICY_TAGS', { teamId }],
    queryFn: async () => {
      try {
        const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/policy-tags`)
        if (!response.ok) {
          throw new Error(
            `[getPolicyTags] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getPolicyTags] Error fetching roles:`, handleErrorMessage(error))
      }
    },
  })
