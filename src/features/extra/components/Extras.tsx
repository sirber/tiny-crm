"use client";

import { usePathname } from "next/navigation";
import useSWR from "swr";
import ExtraFollowUps from "@/features/extra/components/ExtraFollowUps";
import ExtraLinks from "@/features/extra/components/ExtraLnks";
import ExtraNotes from "@/features/extra/components/ExtraNotes";
import Grid from "@mui/material/Grid";
import { useCallback } from "react";
import { FollowUp, Link, Note } from "@/features/extra";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Extras() {
  const pathname = usePathname();
  const routeParam = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const shouldFetch = !routeParam.endsWith("/new");
  const apiUrl = shouldFetch
    ? `/api/extra?route=${encodeURIComponent(routeParam)}`
    : null;

  const { data, mutate, isLoading, error } = useSWR(apiUrl, fetcher);

  const updateData = useCallback(
    async (
      updated: Partial<{ followups: FollowUp[]; notes: Note[]; links: Link[] }>,
    ) => {
      if (!data || !shouldFetch) return;
      const newData = { ...data, ...updated };

      // Optimistic update
      mutate(newData, false);

      await fetch(apiUrl!, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      mutate();
    },
    [data, mutate, apiUrl, shouldFetch],
  );

  if (!shouldFetch) return null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading extras.</div>;

  const setFollowups = (newFollowups: FollowUp[]) =>
    updateData({ followups: newFollowups });
  const setNotes = (newNotes: Note[]) => updateData({ notes: newNotes });
  const setLinks = (newLinks: Link[]) => updateData({ links: newLinks });

  return (
    <Grid
      container
      spacing={1}
      direction="column"
    >
      <ExtraFollowUps
        data={data.followups}
        setData={setFollowups}
      />
      <ExtraNotes
        data={data.notes}
        setData={setNotes}
      />
      <ExtraLinks
        data={data.links}
        setData={setLinks}
      />
    </Grid>
  );
}
