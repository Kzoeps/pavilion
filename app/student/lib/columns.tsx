'use client'

import { CaretRightIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
    { accessorKey: 'title',  header: 'Talk'},
    { accessorKey: 'datetime', header: 'Date'},
    { accessorKey: 'approved', header: 'Approved', cell: ({ row }) => {
        const approved = row.getValue('approved')
        return approved ? '✅' : '❌'
    }},
    { id: 'go', cell: ({ row }) => {
        return (
            <CaretRightIcon/>
        )
    }}
]