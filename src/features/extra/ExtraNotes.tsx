import {Card, CardContent, Typography} from "@mui/material";
import React from "react";

export default function ExtraNotes() {
    return <Card>
        <CardContent>
            <Typography variant="h6">Notes</Typography>
            <Typography variant="body2">Track notes.</Typography>
        </CardContent>
    </Card>;
}