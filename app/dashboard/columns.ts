'use client'

export type ProgressProfile = {
    name: string;
    classYear: string;
    email: string;
    progress: number;
    id: string;
}

export const columns: {accessorKey: string, header: string}[] = [
    {
        accessorKey: 'name',
        header: 'Name'
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
        header: 'Progress'
    }

]