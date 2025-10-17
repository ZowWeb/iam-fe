import { useEffect } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import * as z from 'zod'
import { Input } from '@vds/inputs'

import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { StyledButton } from './styles'
import useCreateServiceAccount from '~/hooks/useCreateServiceAccount'
import type { ServiceAccount } from '~/types/data'
import Modal from '~/components/Modal'

const requiredFieldMessage: string = 'Required field'
const formSchema = z.object({
  name: z.string().nonempty({ message: requiredFieldMessage }),
})
type FormSchema = z.infer<typeof formSchema>
type CreateServiceAccountModalProps = {
  teamId: string
  opened: boolean
  onClose: () => void
  onSuccess: () => void
  onError: (error: unknown) => void
}

export default function CreateServiceAccountModal({
  opened,
  onClose,
  teamId,
  onSuccess,
  onError,
}: CreateServiceAccountModalProps) {
  const { mutate, isPending } = useCreateServiceAccount({ teamId })
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    onClose()
  }

  const onSubmit: SubmitHandler<FormSchema> = data => {
    const newData = {
      displayName: data.name,
      kind: 'service_account',
      teamId,
    } as ServiceAccount
    mutate(newData, {
      onSuccess,
      onError,
      onSettled: handleCloseModal,
    })
  }

  /**
   * Reset form when open state changes to avoid previous values when modal is reopened
   */
  useEffect(() => {
    if (opened) {
      reset() // Reset the form state
    }
  }, [opened])

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox direction="column" alignItems="flex-start" gap="2rem">
          <Typography.H3>Create a service account</Typography.H3>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                helperText="This is simply a name or label that will help you easily identify this service account in the future. Choose a name that clearly describes its purpose or the application it will be used for."
                helperTextPlacement="bottom"
                error={!!errors.name?.message}
                errorText={errors.name?.message || requiredFieldMessage}
              />
            )}
          />
          <FlexBox gap="0.75rem">
            <StyledButton size="large" disabled={!isValid || isPending} type="submit">
              Create
            </StyledButton>
            <StyledButton
              size="large"
              use="secondary"
              type="button"
              disabled={isPending}
              onClick={handleCloseModal}
            >
              Cancel
            </StyledButton>
          </FlexBox>
        </FlexBox>
      </form>
    </Modal>
  )
}
