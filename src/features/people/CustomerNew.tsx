"use client";

import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useRouter} from "next/navigation";
import Extras from "@/features/extra/Extras";
import {ExtraProps} from "@/features/extra";

export default function CustomerNew() {
    const router = useRouter();
    const [data, setData] = useState<ExtraProps>({ // TODO: move to a useExtra hook
        followups: [],
        notes: [],
        links: [],
    });

    function cancel() {
        router.push('/people/customer');
    }

    return (
        <Grid container spacing={1}>
            <Grid size={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Add Customer</Typography>
                        <TextField fullWidth label="Name" margin="dense"/>
                        <TextField fullWidth label="Email" margin="dense"/>
                        <TextField fullWidth label="Phone" margin="dense"/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary">Add</Button>
                        <Button variant="contained" color="secondary" onClick={cancel}>Cancel</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid size={6}>
                <Extras data={data} setData={setData}/>
            </Grid>
        </Grid>
    );
}
