'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { Logo } from '@/app/logo'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Strong, Text, TextLink } from '@/components/text'
import Alert from '@/utils/alert'
import { saveToken } from '@/utils/auth'
import { useUser } from '@/contexts/user-context'
import { SIGNUP_MUTATION } from '../graphql/mutations'

export default function Register() {
  const router = useRouter()
  const { setUser } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data: any) => {
      const { token, user } = data.signup
      saveToken(token)
      setUser(user)
      Alert.success('Account created successfully')
      // Small delay to ensure token is saved before navigating
      setTimeout(() => {
        router.push('/')
      }, 100)
    },
    onError: (error) => {
      setIsLoading(false)
      Alert.error(error.message || 'Failed to sign up')
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      Alert.error('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      Alert.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      await signup({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            phoneNumber,
            password
          }
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
      <Heading>Create your account</Heading>
      <Field>
        <Label>First Name</Label>
        <Input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isLoading}
        />
      </Field>
      <Field>
        <Label>Last Name</Label>
        <Input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={isLoading}
        />
      </Field>
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
        <Label>Phone Number</Label>
        <Input
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign up'}
      </Button>
      <Text>
        Already have an account?{' '}
        <TextLink href="/login">
          <Strong>Sign in</Strong>
        </TextLink>
      </Text>
    </form>
  )
}
