'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGetLoad } from './useLoads'
import { useLoadService } from './useLoadService'
import { useGetDrivers } from '@/modules/drivers/containers/useDrivers'
import LoadDetailView from '../components/detail'

export default function LoadDetailContainer() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: loadData, loading: loadLoading } = useGetLoad(id)
  const { data: driversData } = useGetDrivers()
  const { deleteLoad, loading: isDeleting } = useLoadService()

  const load = (loadData as any)?.load
  const drivers = (driversData as any)?.drivers || []

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this load?')) {
      const result = await deleteLoad(id)
      if (result.success) {
        router.push('/loads')
      }
    }
  }

  const handleEdit = () => {
    router.push('/loads')
  }

  return (
    <LoadDetailView
      load={load}
      drivers={drivers}
      isLoading={loadLoading}
      isDeleting={isDeleting}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  )
}
