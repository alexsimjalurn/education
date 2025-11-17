import React from 'react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AppError } from '@/lib/errors'

interface ErrorDisplayProps {
  error: AppError | Error | string
  onRetry?: () => void
  title?: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  title = 'An error occurred',
}) => {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error instanceof AppError
      ? error.message
      : error.message || 'Something went wrong'

  return (
    <Card className="border-red-200 bg-red-50">
      <div className="text-center py-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
        <p className="text-red-600 mb-4">{errorMessage}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry} size="sm">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  )
}

