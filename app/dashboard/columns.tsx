'use client'
import Progress from '@/components/progress';
import { type ColumnDef } from '@tanstack/react-table';

export type ProgressProfile = {
    name: string;
    classYear: string;
    email: string;
    progress: number;
    studentId?: string;
    id: string;
    advisor_id: number;
}

export const columns: ColumnDef<ProgressProfile>[] = [
    {accessorKey: 'id', header: 'ID'},
    {
        accessorKey: 'name',
        header: 'Name',

    },
    {
        accessorKey: 'class_year',
        header: 'Class Year'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'advisor',
        header: 'Advisor',
    }
    // {
    //     accessorKey: 'progress',
    //     header: 'Progress',
    //     cell: ({ row }) => {
    //         const amount = parseInt(row.getValue('progress'));
    //         return (
    //             <Progress amountDone={amount} classYear={row.getValue('classYear')} />
    //         )
    //     }
    // }

]