import ExtraFollowUps from "@/features/extra/components/ExtraFollowUps";
import ExtraLinks from "@/features/extra/components/ExtraLnks";
import ExtraNotes from "@/features/extra/components/ExtraNotes";
import Grid from "@mui/material/Grid2";
import {useCallback} from "react";
import {ExtrasState, FollowUp, Link, Note} from "@/features/extra";

export default function Extras({data, setData}: ExtrasState) {
    const {followups, links, notes} = data;

    const setFollowups = useCallback((newFollowups: Array<FollowUp>) => {
        setData({...data, followups: newFollowups});
    }, [setData, data]);

    const setLinks = useCallback((newLinks: Array<Link>) => {
        setData({...data, links: newLinks});
    }, [setData, data]);

    const setNotes = useCallback((newNotes: Array<Note>) => {
        setData({...data, notes: newNotes});
    }, [setData, data]);

    return (
        <Grid container spacing={1} direction="column">
            <ExtraFollowUps data={followups} setData={setFollowups}/>
            <ExtraNotes data={notes} setData={setNotes}/>
            <ExtraLinks data={links} setData={setLinks}/>
        </Grid>
    );
}
