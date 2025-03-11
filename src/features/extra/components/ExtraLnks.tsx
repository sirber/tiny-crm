import {Card, CardContent, Typography} from "@mui/material";
import {Link} from "@/features/extra";

interface ExtraLinksProps {
    data: Array<Link>;
    setData: (newNotes: Array<Link>) => void;
}

// eslint-disable-next-line
export default function ExtraLinks({data, setData}: ExtraLinksProps) {
    return <Card>
        <CardContent>
            <Typography variant="h6">Follow Ups</Typography>
            <Typography variant="body2">Track follow ups.</Typography>
        </CardContent>
    </Card>;
}