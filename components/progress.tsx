import { ClassYear, calculateOptimum } from "@/lib/class-years";
export interface ProgressProps {
    amountDone: number;
    classYear: string;
}

export default function Progress({ amountDone, classYear }: ProgressProps) {
    return (
        <div className="w-full flex gap-2 relative items-center">
            <meter id="progress" className="w-full h-8 text-xs" value={amountDone} {...calculateOptimum(classYear)} min={0} max={10} />
            <p className="text-sm text-gray-900">
                {amountDone}/10
            </p>
        </div>

    );
}