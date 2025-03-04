import {Card, CardContent, Typography} from "@mui/material";
import {Note} from "@/features/extra/index";

interface ExtraNotesProps {
    data: Array<Note>;
    setData: (newNotes: Array<Note>) => void;
}

export default function ExtraNotes({data, setData}: ExtraNotesProps) {
    return <Card>
        <CardContent>
            <Typography variant="h6">Notes</Typography>
            <Typography variant="body2">Track notes.</Typography>
        </CardContent>
    </Card>;
}