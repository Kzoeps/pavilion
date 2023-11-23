'use client'
import Progress from '@/components/progress';
import { type ColumnDef } from '@tanstack/react-table';

export type ProgressProfile = {
    name: string;
    classYear: string;
    email: string;
    progress: number;
    id: string;
}

export const columns: ColumnDef<ProgressProfile>[] = [
    {
        accessorKey: 'name',
        header: 'Name',

    },
    {
        accessorKey: 'classYear',
        header: 'Class Year'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'progress',
        header: 'Progress',
        cell: ({ row }) => {
            const amount = parseInt(row.getValue('progress'));
            return (
                <Progress amountDone={amount} classYear={row.getValue('classYear')} />
            )
        }
    }

]

export const dummyData: ProgressProfile[] = [
    {
        name: 'John Doe',
        classYear: '2025',
        email: 'jdoe@conncoll.edu',
        progress: 5,
        id: '123213'
    },
    // create 5 more records with different values
    {
        name: 'Jane Doe',
        classYear: '2024',
        email: 'jdoe2@conncoll.edu',
        progress: 10,
        id: '123214'
    },
    {
        name: 'Jane Doe',
        classYear: '2024',
        email: 'jdoe2@conncoll.edu',
        progress: 4,
        id: '123214'
    }

]
