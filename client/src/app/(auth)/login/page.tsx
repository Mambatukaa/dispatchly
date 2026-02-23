'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { Logo } from '@/app/logo'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Strong, Text, TextLink } from '@/components/text'
import Alert from '@/utils/alert'
import { saveToken } from '@/utils/auth'
import { useUser } from '@/contexts/user-context'
import { SIGNIN_MUTATION } from '../graphql/mutations'

export default function Login() {
  const router = useRouter()
  const { setUser } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted: (data: any) => {
      const { token, user } = data.signin
      saveToken(token)
      setUser(user)
      Alert.success('Logged in successfully')
      // Small delay to ensure token is saved before navigating
      setTimeout(() => {
        router.push('/')
      }, 100)
    },
    onError: (error) => {
      setIsLoading(false)
      Alert.error(error.message || 'Failed to sign in')
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      Alert.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      await signin({
        variables: {
          email,
          password
        }
      })
    } catch (error) {
      // Error is handled by onError
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
      <Heading>Sign in to your account</Heading>
      <Field>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </Field>
      <div className="flex items-center justify-between">
        <CheckboxField>
          <Checkbox name="remember" disabled={isLoading} />
          <Label>Remember me</Label>
        </CheckboxField>
        <Text>
          <TextLink href="/forgot-password">
            <Strong>Forgot password?</Strong>
          </TextLink>
        </Text>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Login'}
      </Button>
      <Text>
        Don’t have an account?{' '}
        <TextLink href="/register">
          <Strong>Sign up</Strong>
        </TextLink>
      </Text>
    </form>
  )
}
