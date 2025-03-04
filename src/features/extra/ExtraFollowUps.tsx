import {Card, CardContent, Typography} from "@mui/material";
import {FollowUp} from "@/features/extra/index";

interface ExtraFollowUpsProps {
    data: Array<FollowUp>;
    setData: (newNotes: Array<FollowUp>) => void;
}

export default function ExtraFollowUps({data, setData}: ExtraFollowUpsProps) {
    return <Card>
        <CardContent>
            <Typography variant="h6">Follow Ups</Typography>
            <Typography variant="body2">Track pending follow-ups.</Typography>
        </CardContent>
    </Card>;
}