import ExtraFollowUps from "@/features/extra/ExtraLnks";
import ExtraLinks from "@/features/extra/ExtraLnks";
import ExtraNotes from "@/features/extra/ExtraNotes";
import Grid from "@mui/material/Grid2";
import React from "react";

export default function Extras() {
    return <Grid container spacing={1} direction="column">
        <ExtraFollowUps/>
        <ExtraNotes/>
        <ExtraLinks/>
    </Grid>;
}
