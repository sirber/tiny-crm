import ExtraFollowUps from "@/features/extra/components/ExtraFollowUps";
import ExtraLinks from "@/features/extra/components/ExtraLnks";
import ExtraNotes from "@/features/extra/components/ExtraNotes";
import Grid from "@mui/material/Grid2";
import {useCallback} from "react";
import {ExtrasState, FollowUp, Link, Note} from "@/features/extra";

export default function Extras({data, setData}: ExtrasState) {
    const {followups, links, notes} = data;

    const setFollowups = useCallback((newFollowups: Array<FollowUp>) => {
        setData(prev => ({...prev, followups: newFollowups}));
    }, [setData]);

    const setLinks = useCallback((newLinks: Array<Link>) => {
        setData(prev => ({...prev, links: newLinks}));
    }, [setData]);

    const setNotes = useCallback((newNotes: Array<Note>) => {
        setData(prev => ({...prev, notes: newNotes}));
    }, [setData]);

    return (
        <Grid container spacing={1} direction="column">
            <ExtraFollowUps data={followups} setData={setFollowups}/>
            <ExtraNotes data={notes} setData={setNotes}/>
            <ExtraLinks data={links} setData={setLinks}/>
        </Grid>
    );
}
