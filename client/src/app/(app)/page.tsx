'use client'

import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { useUser } from '@/contexts/user-context'

interface Order {
  id: string
  date: string
  customer: { name: string }
  event: { name: string; thumbUrl: string }
  amount: { usd: string }
  url: string
}

export default function Home() {
  const { user } = useUser()
  const userName = user ? `${user.firstName} ${user.lastName}` : 'User'

  return (
    <>
      <Heading>Good afternoon, {userName}</Heading>
      {user && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Logged in as:</p>
            <p className="text-base font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-zinc-500">{user.email}</p>
            <p className="text-sm text-zinc-500">{user.phoneNumber}</p>
          </div>
        </div>
      )}
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center text-zinc-500">
              No orders yet
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
