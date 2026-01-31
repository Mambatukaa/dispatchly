'use client';

import { Driver } from '@/types/driver';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, FileText, Trash2 } from 'lucide-react';

interface DriverCardProps {
  driver: Driver;
  onEdit: (driver: Driver) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function DriverCard({
  driver,
  onEdit,
  onDelete,
  isDeleting,
}: DriverCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate mb-2">{driver.name}</h3>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{driver.phone}</span>
            </div>
            {driver.note && (
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{driver.note}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(driver)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(driver.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}
