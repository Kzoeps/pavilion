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

export const dummyData: ProgressProfile[] = [
    {
        name: 'John Doe',
        classYear: '2021',
        email: 'jdoe@conncoll.edu',
        progress: 5,
        id: '123213'
    },
    // create 5 more records with different values
    {
        name: 'Jane Doe',
        classYear: '2021',
        email: 'jdoe2@conncoll.edu',
        progress: 10,
        id: '123214'
    },
]