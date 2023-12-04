'use client'

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
    { accessorKey: 'talk',  header: 'Talk'},
    { accessorKey: 'date', header: 'Date'},
    { accessorKey: 'approved', header: 'Approved', cell: ({ row }) => {
        const approved = row.getValue('approved')
        return approved ? '✅' : '❌'
    }}
]