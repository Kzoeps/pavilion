export const getUnapprovedNotes = (totalNotes: number, approvedNotes: number) => {
    return totalNotes - approvedNotes;
}