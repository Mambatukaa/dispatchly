'use client'

import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/button'
import { TableCell, TableRow } from '@/components/table'
import { Badge } from '@/components/badge'
import type { Broker } from '../types'

type Props = {
  broker: Broker
  onEdit: (broker: Broker) => void
  onDelete: (id: string) => void
}

export default function BrokerRow({ broker, onEdit, onDelete }: Props) {
  return (
    <TableRow>
      <TableCell>{broker.logisticName}</TableCell>
      <TableCell>{broker.mc}</TableCell>
      <TableCell>{broker.brokerName}</TableCell>
      <TableCell>{broker.phoneNumber}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => onEdit(broker)}
            className="text-sm cursor-pointer"
            plain
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDelete(broker.id)}
            className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
            plain
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
