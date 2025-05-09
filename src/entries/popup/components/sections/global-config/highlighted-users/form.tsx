import { Loader2, UserRoundPlus } from 'lucide-react'
import { type FormEvent, useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { useHighlightedUsersForm } from '@/entries/popup/components/sections/global-config/highlighted-users/form.hooks'
import { UserList } from '@/entries/popup/components/sections/global-config/user-list'
import { useGlobalConfig, useMutateGlobalConfig } from '@/entries/popup/hooks/use-global-config'
import { checkUserSchema, getUsernameSchema } from '@/entries/popup/services/validation'
import { checkSchemaOnFieldValidatorAsync } from '@/utils/zod'

export const Form = () => {
  const form = useHighlightedUsersForm()
  const { data } = useGlobalConfig()
  const { mutatePartial } = useMutateGlobalConfig()

  const handleSubmit = useCallback((e: FormEvent) => {
    e.stopPropagation()
    e.preventDefault()
    form.handleSubmit()
  }, [])

  const handleDelete = (user: string) => {
    const newHighlightedUsers = data.highlightedUsers.filter(highlightedUser => highlightedUser !== user)
    mutatePartial({ highlightedUsers: newHighlightedUsers })
  }

  return (
    <form onSubmit={handleSubmit}>
      <form.AppField
        name='highlightedUser'
        validators={{
          onChange: getUsernameSchema(data, 'highlightedUsers'),
          onSubmitAsync: checkSchemaOnFieldValidatorAsync(checkUserSchema)
        }}
        children={field => (
          <field.FormItem className='flex w-full gap-2.5 space-y-0'>
            <field.FormLabel className='min-w-28 pt-2.5'>Destacar usuario</field.FormLabel>
            <div className='w-full space-y-2'>
              <div className='flex w-full gap-2.5'>
                <div className='w-full space-y-1'>
                  <field.FormControl className='w-full'>
                    <field.FormInput
                      placeholder='Nick usuario'
                      autoComplete='off'
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </div>
                <form.Subscribe
                  selector={state => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      className='min-w-9'
                      size='icon'
                      variant='outline'
                      type='submit'
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? <Loader2 className='animate-spin' /> : <UserRoundPlus />}
                    </Button>
                  )}
                />
              </div>
              <UserList
                users={data.highlightedUsers}
                getKey={username => username}
                onDelete={handleDelete}
                renderItem={username => username}
              />
            </div>
          </field.FormItem>
        )}
      />
    </form>
  )
}
