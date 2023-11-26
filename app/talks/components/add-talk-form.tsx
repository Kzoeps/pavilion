import SubmitButton from "@/components/submit-button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddTalkForm() {
    return (
        <>
            <form className="grid py-4 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Title
                    </Label>
                    <Input required id="title" name="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Location
                    </Label>
                    <Input required id="location" name="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Date & Time
                    </Label>
                    <Input type="datetime-local" required id="time" name="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Description
                    </Label>
                    <Textarea required id="description" name="description" className="col-span-3" rows={6} />
                </div>
                <DialogFooter>
                    <SubmitButton label="Create Talk" pendingLabel="Creating Talk" />
                </DialogFooter>
            </form>
        </>
    )
}