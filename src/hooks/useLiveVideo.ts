import { setLiveStreamInfo } from "@app/_stores/video";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { useCallback } from "react";

export const useLiveVideo = () => {
  const dispatch = useAppDispatch();

  const liveStreamUrl = useAppSelector((state) => state.liveStream.liveStreamUrl);
  const matchName = useAppSelector((state) => state.liveStream.matchName);

  const openPlayer = useCallback(
    (url: string, matchName: string, type?: string) => {
      dispatch(
        setLiveStreamInfo({
          liveStreamUrl: url,
          matchName: matchName,
        }),
      );
    },
    [dispatch],
  );

  const closePlayer = useCallback(() => {
    dispatch(
      setLiveStreamInfo({
        liveStreamUrl: null,
        matchName: null,
      }),
    );
  }, [dispatch]);

  return {
    openPlayer,
    closePlayer,
    liveStreamUrl,
    matchName,
  };
};
